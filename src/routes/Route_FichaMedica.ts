import { CREATE, READ, UPDATE, DELETE } from '../controllers/CRUD_FichaMedica.js';
import { validateFichaMedicaCreation, handleValidationErrors } from '../middleware/validateFichaMedica.js';
import { Router } from 'express';

const router = Router();

router.post('/fichas-medicas', validateFichaMedicaCreation, handleValidationErrors, CREATE);
router.get('/fichas-medicas/:id', READ);
router.put('/fichas-medicas/:id', validateFichaMedicaCreation, handleValidationErrors, UPDATE);
router.delete('/fichas-medicas/:id', DELETE);

export default router;
