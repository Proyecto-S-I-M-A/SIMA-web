import { Request, Response } from 'express';
import Receta from '../models/Receta.js';
import Cliente from '../models/Cliente.js';

export default async function GetRecetaByCedula(request: Request, response: Response) {
    try {
        const cedula = request.params.cedula;
        if (!cedula) {
            return response.status(400).json({ error: 'Cédula es requerida' });
        }
        const cliente = await Cliente.findOne({ where: { cedula } });
        if (!cliente) {
            return response.status(404).json({ error: 'Cliente no encontrado' });
        }
        const res = await Receta.findAll({ where: { id_cliente: cliente.id } });
        if (!res) {
            return response.status(404).json({ error: 'Receta no encontrada' });
        }
        response.json(res);
    } catch (error) {
        response.status(500).json({ error: 'Error al buscar la receta' });
    }
}