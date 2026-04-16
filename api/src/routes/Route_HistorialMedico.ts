import { CREATE, READ, UPDATE, DELETE } from '../controllers/CRUD_HistorialMedico.js';
import { validateHistorialMedicoCreation, handleValidationErrors } from '../middleware/validateHistorialMedico.js';
import { Router } from 'express';

const router = Router();

router.post('/historiales-medicos', validateHistorialMedicoCreation, handleValidationErrors, CREATE);
router.get('/historiales-medicos/:id', READ);
router.put('/historiales-medicos/:id', validateHistorialMedicoCreation, handleValidationErrors, UPDATE);
router.delete('/historiales-medicos/:id', DELETE);

export default router;
