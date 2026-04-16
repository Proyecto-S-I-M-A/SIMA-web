import { HistorialMedicoCreationAttributes, HistorialMedicoUpdateAttributes } from '../types/HistorialMedico.js';
import type { Request, Response } from 'express';
import HistorialMedico from '../models/HistorialMedico.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: HistorialMedicoCreationAttributes = request.body;

    const res = await HistorialMedico.create(body as any, { returning: true });
    response.status(201).json(res);
  } catch (e: any) {
    console.error('Error al crear historial médico:', e);
    response.status(500).json({
      error: 'Error al crear el historial médico',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id && id !== "all") {
      const res = await HistorialMedico.findByPk(parseInt(String(id)));
      response.status(200).json(res);
    } else {
      const res = await HistorialMedico.findAll();
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener los historiales médicos', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: HistorialMedicoUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await HistorialMedico.update(body, { where: { id: parseInt(String(id)) }, returning: true });
    if (res[0] === 0) {
      return response.status(404).json({ error: 'Historial médico no encontrado' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar historial médico:', e);
    response.status(500).json({
      error: 'Error al actualizar el historial médico',
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

    const res = await HistorialMedico.destroy({ where: { id: parseInt(String(id)) } });
    if (res === 0) {
      return response.status(404).json({ error: 'Historial médico no encontrado' });
    }

    response.status(200).json({ message: 'Historial médico eliminado', data: res });
  } catch (e: any) {
    console.error('Error al eliminar historial médico:', e);
    response.status(500).json({
      error: 'Error al eliminar el historial médico',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE };
