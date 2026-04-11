import { AccesoCreationAttributes } from '../types/Acceso.js';
import type { Request, Response } from 'express';
import Acceso from '../models/Acceso.js';
import encodePassword from '../services/Encode.js';

async function CREATE(request: Request, response: Response) {
  try {
    const { usuario, password, tipo } = request.body;

    if (!usuario || !password || !tipo) {
      return response.status(400).json({
        error: 'Los campos usuario, password y tipo son requeridos',
      });
    }

    // Verificar que no exista usuario duplicado
    const existingUser = await Acceso.findOne({ where: { usuario, activo: true } });
    if (existingUser) {
      return response.status(409).json({
        error: 'El usuario ya existe',
      });
    }

    const acceso = await Acceso.create({
      usuario,
      password: encodePassword(password),
      tipo,
      activo: true,
    });

    response.status(201).json({ 
      message: "Acceso creado exitosamente", 
      acceso: acceso.id 
    });
  } catch (e: any) {
    console.error('Error al crear acceso:', e);
    response.status(500).json({
      error: 'Error al crear el acceso',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id || null;
    let res;

    if (id && id !== "all") {
      res = await Acceso.findByPk(String(id), {
        attributes: { exclude: ['password'] },
      });
      if (!res) {
        return response.status(404).json({ error: 'Acceso no encontrado' });
      }
    } else {
      res = await Acceso.findAll({
        where: { activo: true },
        attributes: { exclude: ['password'] },
      });
    }

    response.status(200).json(res);
  } catch (e: any) {
    response.status(500).json({ 
      error: 'Error al obtener los accesos', 
      details: e.message 
    });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (!id) {
      return response.status(400).json({ error: 'El id del acceso es requerido' });
    }

    const acceso = await Acceso.findByPk(String(id));
    if (!acceso) {
      return response.status(404).json({ error: 'Acceso no encontrado' });
    }

    const updateData: any = {};
    if (request.body.usuario) updateData.usuario = request.body.usuario;
    if (request.body.password) updateData.password = encodePassword(request.body.password);
    if (request.body.tipo) updateData.tipo = request.body.tipo;
    if (request.body.activo !== undefined) updateData.activo = request.body.activo;

    await acceso.update(updateData);
    response.status(200).json({ 
      message: "Acceso actualizado exitosamente", 
      acceso: acceso.id 
    });
  } catch (e: any) {
    response.status(500).json({
      error: 'Error al actualizar el acceso', 
      details: e.message 
    });
  }
}

async function DELETE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (!id) {
      return response.status(400).json({ error: 'El id del acceso es requerido' });
    }

    const acceso = await Acceso.findByPk(String(id));
    if (!acceso) {
      return response.status(404).json({ error: 'Acceso no encontrado' });
    }

    await acceso.update({ activo: false });
    response.status(200).json({ 
      message: "Acceso eliminado exitosamente", 
      acceso: acceso.id 
    });
  } catch (e: any) {
    response.status(500).json({
      error: 'Error al eliminar el acceso', 
      details: e.message 
    });
  }
}

export { CREATE, READ, UPDATE, DELETE };
