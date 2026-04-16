import { CREATE, READ, UPDATE, DELETE } from '../controllers/CRUD_Maquina.js';
import { validateMaquinaCreation, handleValidationErrors } from '../middleware/validateMaquina.js';
import { Router } from 'express';

const router = Router();

router.post('/maquinas', validateMaquinaCreation, handleValidationErrors, CREATE);
router.get('/maquinas/:id', READ);
router.put('/maquinas/:id', validateMaquinaCreation, handleValidationErrors, UPDATE);
router.delete('/maquinas/:id', DELETE);

export default router;
