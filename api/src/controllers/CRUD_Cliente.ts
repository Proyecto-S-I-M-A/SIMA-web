import { ClienteCreationAttributes } from '../types/Cliente.js';
import type { Request, Response } from 'express';
import Cliente from '../models/Cliente.js';
import Acceso from '../models/Acceso.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: ClienteCreationAttributes = request.body;
    // Validación adicional: verificar que no exista email duplicado
    if (body.correo) {
      const existingEmail = await Cliente.findAll({ where: { correo: body.correo } });
      if (existingEmail.length > 0) {
        return response.status(409).json({
          error: 'El correo ya está registrado',
        });
      }
    }

    await Cliente.create(body as any);
    response.status(201).json({messages: "Cliente creado exitosamente"});
  } catch (e: any) {
    console.error('Error al crear cliente:', e);
    response.status(500).json({
      error: 'Error al crear el cliente',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id || null;
    if (id && id!=="all") {
      const res = await Cliente.findByPk(parseInt(String(id)));
      if (!res) {
        return response.status(404).json({ error: 'Cliente no encontrado' });
      }
      response.status(200).json(res);
    } else {
      const res = await Cliente.findAll();
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener los clientes', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (!id) {
      return response.status(400).json({ error: 'El id del cliente es requerido' });
    }
    const body: ClienteCreationAttributes = request.body;
    await Cliente.update(body as any, { where: { id: parseInt(String(id)) } }).then(([affectedCount]) => {
      if (affectedCount === 0) {
        throw new Error('Cliente no encontrado o sin cambios');
      }
    });
    response.status(200).json({message: "Cliente actualizado exitosamente"});
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al actualizar el cliente', details: e.message });
  }
}

async function DELETE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (!id) {
      return response.status(400).json({ error: 'El id del cliente es requerido' });
    }
    await Cliente.update({ activo: false }, { where: { id: parseInt(String(id)) } });
    response.status(200).json({message: "Cliente eliminado exitosamente"});
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al actualizar el cliente', details: e.message });
  }
}

export { CREATE, READ, UPDATE, DELETE };
