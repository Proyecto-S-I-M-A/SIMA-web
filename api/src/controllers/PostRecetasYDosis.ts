import {Response, Request} from 'express';
import { RecetasDosisAttributes } from '../types/Receta.js';
import Receta from '../models/Receta.js';
import Dosis from '../models/Dosis.js';

export default async function PostRecetasYDosis(req: Request, res: Response) {
    const body: RecetasDosisAttributes = req.body;
    try {
        if(!body.Receta) {
            return res.status(400).json({ error: 'Faltan datos de receta o dosis' });
        }
        const receta = await Receta.create(body.Receta as any, {returning: true});
        body.Dosis.forEach(async (dosis) => {
            await Dosis.create({ ...dosis, id_receta: receta.id } as any);
        });
        res.status(201).json(receta);
    }
    catch (error) {
        console.error('Error al crear receta y dosis:', error);
        res.status(500).json({ error: 'Error al crear receta y dosis' });
    }
    
}