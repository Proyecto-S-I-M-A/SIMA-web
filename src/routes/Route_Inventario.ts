import { CREATE, READ, UPDATE, DELETE } from '../controllers/CRUD_Inventario.js';
import { validateInventarioCreation, handleValidationErrors } from '../middleware/validateInventario.js';
import { Router } from 'express';

const router = Router();

router.post('/inventario', validateInventarioCreation, handleValidationErrors, CREATE);
router.get('/inventario/:id', READ);
router.put('/inventario/:id', validateInventarioCreation, handleValidationErrors, UPDATE);
router.delete('/inventario/:id', DELETE);

export default router;
