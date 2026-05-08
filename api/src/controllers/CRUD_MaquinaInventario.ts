import type { Request, Response } from 'express';
import MaquinaInventarioService from '../services/MaquinaInventarioService.js';

async function CREATE(request: Request, response: Response) {
  try {
    const res = await MaquinaInventarioService.create(request.body);
    response.status(201).json(res);
  } catch (e: any) {
    console.error('Error al crear relación MaquinaInventario:', e);
    response.status(500).json({
      error: 'Error al crear la relación MaquinaInventario',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id && id !== "all") {
      const res = await MaquinaInventarioService.getById(parseInt(String(id)));
      response.status(200).json(res);
    } else {
      const res = await MaquinaInventarioService.getAll();
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener relaciones MaquinaInventario', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await MaquinaInventarioService.update(parseInt(String(id)), request.body);
    if (res[0] === 0) {
      return response.status(404).json({ error: 'Registro de relación MaquinaInventario no encontrado' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar relación MaquinaInventario:', e);
    response.status(500).json({
      error: 'Error al actualizar la relación MaquinaInventario',
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

    const res = await MaquinaInventarioService.delete(parseInt(String(id)));
    if (res === 0) {
      return response.status(404).json({ error: 'Registro de relación MaquinaInventario no encontrado' });
    }

    response.status(200).json({ message: 'Registro de relación MaquinaInventario eliminado', data: res });
  } catch (e: any) {
    console.error('Error al eliminar relación MaquinaInventario:', e);
    response.status(500).json({
      error: 'Error al eliminar la relación MaquinaInventario',
      details: e.message,
    });
  }
}

async function GET_BY_MAQUINA(request: Request, response: Response) {
  try {
    const id_maquina = request.params.id_maquina;

    if (!id_maquina) {
      return response.status(400).json({ error: 'ID de máquina es requerido' });
    }

    const res = await MaquinaInventarioService.getByMaquina(parseInt(String(id_maquina)));
    response.status(200).json(res);
  } catch (e: any) {
    console.error('Error al obtener medicamentos por máquina:', e);
    response.status(500).json({
      error: 'Error al obtener medicamentos por máquina',
      details: e.message,
    });
  }
}

async function GET_BY_INVENTARIO(request: Request, response: Response) {
  try {
    const id_inventario = request.params.id_inventario;

    if (!id_inventario) {
      return response.status(400).json({ error: 'ID de inventario es requerido' });
    }

    const res = await MaquinaInventarioService.getByInventario(parseInt(String(id_inventario)));
    response.status(200).json(res);
  } catch (e: any) {
    console.error('Error al obtener máquinas por inventario:', e);
    response.status(500).json({
      error: 'Error al obtener máquinas por inventario',
      details: e.message,
    });
  }
}

async function GET_INVENTARIO_MAQUINA(request: Request, response: Response) {
  try {
    const id_maquina = request.params.id_maquina;

    if (!id_maquina) {
      return response.status(400).json({ error: 'ID de máquina es requerido' });
    }

    const res = await MaquinaInventarioService.getInventarioMaquina(parseInt(String(id_maquina)));
    response.status(200).json(res);
  } catch (e: any) {
    console.error('Error al obtener inventario de máquina:', e);
    response.status(500).json({
      error: 'Error al obtener inventario de máquina',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE, GET_BY_MAQUINA, GET_BY_INVENTARIO, GET_INVENTARIO_MAQUINA };
