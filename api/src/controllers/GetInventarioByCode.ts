import { Request, Response } from 'express';
import  Inventario  from '../models/Inventario.js';

export default async function GetInventarioByCode(request: Request, response: Response) {
  const { codigo } = request.params;
  if (!codigo) {
    return response.status(400).json({ error: 'Código es requerido' });
  }
  try {
    const inventario = await Inventario.findOne({ where: { codigo } });
    if (!inventario) {
      return response.status(404).json({ error: 'Inventario no encontrado' });
    }
    response.status(200).json(inventario);
  } catch (error) {
    response.status(500).json({ error: 'Error al buscar el inventario' });
  }
}