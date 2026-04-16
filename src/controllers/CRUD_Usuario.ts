import { UsuarioCreationAttributes, UsuarioUpdateAttributes } from '../types/Usuario.js';
import type { Request, Response } from 'express';
import Usuario from '../models/Usuario.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: UsuarioCreationAttributes = request.body;

    const res = await Usuario.create(body as any, {returning: true});
    response.status(201).json(res);
  } catch (e: any) {
    console.error('Error al crear usuario:', e);
    response.status(500).json({
      error: 'Error al crear el usuario',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id && id !== "all") {
      const res = await Usuario.findByPk(parseInt(String(id)));
      response.status(200).json(res);
    } else {
      const res = await Usuario.findAll();
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener los usuarios', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: UsuarioUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await Usuario.update(body, { where: { id: parseInt(String(id)) }, returning: true });
    if (res[0] === 0) {
      return response.status(404).json({ error: 'Usuario no encontrado' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar usuario:', e);
    response.status(500).json({
      error: 'Error al actualizar el usuario',
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

    const res = await Usuario.update({activo: false}, { where: { id: parseInt(String(id)) }, returning: true });
    if (res[0] === 0) {
      return response.status(404).json({ error: 'Usuario no encontrado' });
    }

    response.status(200).json({ message: 'Usuario eliminado', data: res[0] });
  } catch (e: any) {
    console.error('Error al eliminar usuario:', e);
    response.status(500).json({
      error: 'Error al eliminar el usuario',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE };

