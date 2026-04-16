import { MaquinaCreationAttributes, MaquinaUpdateAttributes } from '../types/Maquina.js';
import type { Request, Response } from 'express';
import Maquina from '../models/Maquina.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: MaquinaCreationAttributes = request.body;

    const res = await Maquina.create(body as any, {returning: true});
    response.status(201).json(res);
  } catch (e: any) {
    console.error('Error al crear máquina:', e);
    response.status(500).json({
      error: 'Error al crear la máquina',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id && id !== "all") {
      const res = await Maquina.findByPk(parseInt(String(id)));
      response.status(200).json(res);
    } else {
      const res = await Maquina.findAll();
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener las máquinas', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: MaquinaUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await Maquina.update(body, { where: { id: parseInt(String(id)) }, returning: true });
    if (res[0] === 0) {
      return response.status(404).json({ error: 'Máquina no encontrada' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar máquina:', e);
    response.status(500).json({
      error: 'Error al actualizar la máquina',
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

    const res = await Maquina.update({ activo: false }, { where: { id: parseInt(String(id))}, returning: true });
    if (res[0] === 0) {
      return response.status(404).json({ error: 'Máquina no encontrada' });
    }

    response.status(200).json({ message: 'Máquina desactivada', data: res[0] });
  } catch (e: any) {
    console.error('Error al eliminar máquina:', e);
    response.status(500).json({
      error: 'Error al eliminar la máquina',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE };