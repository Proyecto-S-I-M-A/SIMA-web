import { DosisCreationAttributes, DosisUpdateAttributes } from '../types/Dosis.js';
import type { Request, Response } from 'express';
import Dosis from '../models/Dosis.js';


async function CREATE(request: Request, response: Response) {
  try {
    const body: DosisCreationAttributes = request.body;

    const res = await Dosis.create(body as any, { returning: true });
    response.status(201).json(res);
  } catch (e: any) {
    console.error('Error al crear dosis:', e);
    response.status(500).json({
      error: 'Error al crear la dosis',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const id_receta = request.params.id_receta;
    
    if (id_receta) {
      const res = await Dosis.findAll({ where: { id_receta: parseInt(String(id_receta)) } });
      return response.status(200).json(res);
    }
    
    if (id && id !== "all") {
      const res = await Dosis.findByPk(parseInt(String(id)));
      response.status(200).json(res);
    } else {
      const res = await Dosis.findAll();
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener las dosis', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: DosisUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await Dosis.update(body, { where: { id: parseInt(String(id)) }, returning: true });
    if (res[0] === 0) {
      return response.status(404).json({ error: 'Dosis no encontrada' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar dosis:', e);
    response.status(500).json({
      error: 'Error al actualizar la dosis',
      details: e.message,
    });
  }
}

async function DELETE(request: Request, response: Response) {
  try {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await Dosis.destroy({ where: { id: parseInt(String(id)) } });
    if (res === 0) {
      return response.status(404).json({ error: 'Dosis no encontrada' });
    }

    response.status(200).json({ message: 'Dosis eliminada', data: res });
  } catch (e: any) {
    console.error('Error al eliminar dosis:', e);
    response.status(500).json({
      error: 'Error al eliminar la dosis',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE };