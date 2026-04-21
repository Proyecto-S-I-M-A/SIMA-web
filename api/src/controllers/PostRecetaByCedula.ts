import { Request, Response } from 'express';
import Receta from '../models/Receta.js';
import Cliente from '../models/Cliente.js';
import { RecetaCreationAttributes } from '../types';


export default async function PostRecetaByCedula(req: Request, res: Response) {
    const cedula = req.params.cedula;
    try{
        const cliente = await Cliente.findOne({ where: { cedula } });
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        const body: RecetaCreationAttributes = {...req.body, id_cliente: cliente.id }; // Inicializamos id_cliente con un valor temporal
        await Receta.create({body});
        res.status(201).json({ message: 'Receta creada exitosamente' });
    } catch (error) {
        console.error('Error al crear la receta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
