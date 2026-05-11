import { Request, Response } from 'express';
import Cliente from '../models/Cliente.js';
import Receta from '../models/Receta.js';
import Dosis from '../models/Dosis.js';
import Inventario from '../models/Inventario.js';
import { RecetasYDosisResponse, DosisConInventario } from '../types/index.js';


export async function GetRecetasYDosis( req : Request, res : Response ){
  try {
    const cedula = req.params.cedula;
    if ( !cedula ) {
      return res.status( 400 ).json( { error : 'Cédula es requerida' } );
    }
    const cliente = await Cliente.findOne( { where : { cedula } } );
    if ( !cliente ) {
      return res.status( 404 ).json( { error : 'Cliente no encontrado' } );
    }
    const recetas = await Receta.findAll( { where : { id_cliente : cliente.id } } );
    const data: RecetasYDosisResponse = await Promise.all( recetas.map(async ( receta ) => {
      const dosis = await Dosis.findAll( { where : { id_receta : receta.id } } );
      const dosisConInventario: DosisConInventario[] = await Promise.all( dosis.map(async ( dosis ) => {
        const inventario = await Inventario.findOne( { where : { id : dosis.id_medicamento } } );
        return {
          ...dosis.toJSON(),
          inventario : inventario ? inventario.toJSON() : null,
        };
      } ) );
      return {
        ...receta.toJSON(),
        dosis : dosisConInventario,
      };
    }));
    res.status(200).json( data );
  }
  catch ( error ) {
    res.status( 500 ).json( { error : 'Error al obtener las recetas y dosis' } );
  }
} 