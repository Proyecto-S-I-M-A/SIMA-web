import { MaquinaInventario, Inventario, Maquina } from '../models/index.js';
import { MaquinaInventarioCreationAttributes, MaquinaInventarioUpdateAttributes } from '../types/Inventario.js';

export interface InventarioMaquinaDetail {
  id: number;
  id_maquina: number;
  id_inventario: number;
  cantidad: number | null;
  medicamento: {
    id: number;
    nombre: string | null;
    marca: string | null;
    precio: number | null;
    resetado: boolean | null;
  };
}

class MaquinaInventarioService {
  async create(body: MaquinaInventarioCreationAttributes) {
    return await MaquinaInventario.create(body as any, { returning: true });
  }

  async getById(id: number) {
    return await MaquinaInventario.findByPk(id);
  }

  async getAll() {
    return await MaquinaInventario.findAll();
  }

  async update(id: number, body: MaquinaInventarioUpdateAttributes) {
    return await MaquinaInventario.update(body, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number) {
    return await MaquinaInventario.destroy({ where: { id } });
  }

  async getByMaquina(id_maquina: number) {
    return await MaquinaInventario.findAll({
      where: { id_maquina },
    });
  }

  async getByInventario(id_inventario: number) {
    return await MaquinaInventario.findAll({
      where: { id_inventario },
    });
  }

  async getInventarioMaquina(id_maquina: number): Promise<InventarioMaquinaDetail[]> {
    const res = await MaquinaInventario.findAll({
      where: { id_maquina },
      include: [
        {
          model: Inventario,
          as: 'inventario',
          attributes: ['id', 'nombre_medicamento', 'marca', 'precio', 'resetado'],
        },
      ],
    });

    // Mapear resultado para una mejor estructura
    return res.map((item) => ({
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
  }
}

export default new MaquinaInventarioService();
