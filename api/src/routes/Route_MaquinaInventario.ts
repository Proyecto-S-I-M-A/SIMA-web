import { Router } from 'express';
import * as MaquinaInventarioController from '../controllers/CRUD_MaquinaInventario.js';
import { validateMaquinaInventarioCreation, handleValidationErrors } from '../middleware/validateMaquinaInventario.js';

const router = Router();

router.post(
  '/maquina-inventario',
  validateMaquinaInventarioCreation,
  handleValidationErrors,
  MaquinaInventarioController.CREATE
);

router.get('/maquina-inventario', MaquinaInventarioController.READ);

router.get('/maquina-inventario/inventario-maquina/:id_maquina', MaquinaInventarioController.GET_INVENTARIO_MAQUINA);
router.get('/maquina-inventario/maquina/:id_maquina', MaquinaInventarioController.GET_BY_MAQUINA);
router.get('/maquina-inventario/inventario/:id_inventario', MaquinaInventarioController.GET_BY_INVENTARIO);

router.get('/maquina-inventario/:id', MaquinaInventarioController.READ);

router.put(
  '/maquina-inventario/:id',
  validateMaquinaInventarioCreation,
  handleValidationErrors,
  MaquinaInventarioController.UPDATE
);

router.delete('/maquina-inventario/:id', MaquinaInventarioController.DELETE);

export default router;
