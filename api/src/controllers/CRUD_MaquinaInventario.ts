import { MaquinaInventarioCreationAttributes, MaquinaInventarioUpdateAttributes } from '../types/Inventario.js';
import type { Request, Response } from 'express';
import MaquinaInventario from '../models/MaquinaInventario.js';
import Inventario from '../models/Inventario.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: MaquinaInventarioCreationAttributes = request.body;

    const res = await MaquinaInventario.create(body as any, { returning: true });
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
      const res = await MaquinaInventario.findAll({where: {id_maquina: id}});
      response.status(200).json(res);
    } else {
      const res = await MaquinaInventario.findAll();
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
    const body: MaquinaInventarioUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await MaquinaInventario.update(body, { where: { id: parseInt(String(id)) }, returning: true });
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

    const res = await MaquinaInventario.destroy({ where: { id: parseInt(String(id)) } });
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

    const res = await MaquinaInventario.findAll({
      where: { id_maquina: String(id_maquina) },
    });
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

    const res = await MaquinaInventario.findAll({
      where: { id_inventario: parseInt(String(id_inventario)) },
    });
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

    const res = await MaquinaInventario.findAll({
      where: { id_maquina: String(id_maquina) },
      include: [
        {
          model: Inventario,
          as: 'inventario',
          attributes: ['id', 'nombre_medicamento', 'marca', 'precio', 'resetado'],
        },
      ],
    });

    // Mapear resultado para una mejor estructura
    const mappedRes = res.map((item) => ({
      id: item.id,
      id_maquina: item.id_maquina,
      id_inventario: item.id_inventario,
      cantidad: item.cantidad,
      medicamento: {
        id: (item as any).inventario?.id,
        nombre: (item as any).inventario?.nombre_medicamento,
        marca: (item as any).inventario?.marca,
        precio: (item as any).inventario?.precio,
        resetado: (item as any).inventario?.resetado,
      },
    }));

    response.status(200).json(mappedRes);
  } catch (e: any) {
    console.error('Error al obtener inventario de máquina:', e);
    response.status(500).json({
      error: 'Error al obtener inventario de máquina',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE, GET_BY_MAQUINA, GET_BY_INVENTARIO, GET_INVENTARIO_MAQUINA };
