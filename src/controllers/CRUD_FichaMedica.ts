import { FichaMedicaCreationAttributes, FichaMedicaUpdateAttributes } from '../types/FichaMedica.js';
import type { Request, Response } from 'express';
import FichaMedica from '../models/FichaMedica.js';
async function CREATE(request: Request, response: Response) {
  try {
    const body: FichaMedicaCreationAttributes = request.body;

    const res = await FichaMedica.create(body as any, { returning: true });
    response.status(201).json(res);
  } catch (e: any) {
    console.error('Error al crear ficha médica:', e);
    response.status(500).json({
      error: 'Error al crear la ficha médica',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id && id !== "all") {
      const res = await FichaMedica.findByPk(parseInt(String(id)));
      response.status(200).json(res);
    } else {
      const res = await FichaMedica.findAll();
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener las fichas médicas', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: FichaMedicaUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await FichaMedica.update(body, { where: { id: parseInt(String(id)) }, returning: true });
    if (res[0] === 0) {
      return response.status(404).json({ error: 'Ficha médica no encontrada' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar ficha médica:', e);
    response.status(500).json({
      error: 'Error al actualizar la ficha médica',
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

    const res = await FichaMedica.destroy({ where: { id: parseInt(String(id)) } });
    if (res === 0) {
      return response.status(404).json({ error: 'Ficha médica no encontrada' });
    }

    response.status(200).json({ message: 'Ficha médica eliminada', data: res });
  } catch (e: any) {
    console.error('Error al eliminar ficha médica:', e);
    response.status(500).json({
      error: 'Error al eliminar la ficha médica',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE };
