import { CREATE, READ, UPDATE, DELETE } from '../controllers/CRUD_Dosis.js';
import { validateDosisCreation, handleValidationErrors } from '../middleware/validateDosis.js';
import { Router } from 'express';

const router = Router();

router.post('/dosis', validateDosisCreation, handleValidationErrors, CREATE);
router.get('/dosis/:id', READ);
router.put('/dosis/:id', validateDosisCreation, handleValidationErrors, UPDATE);
router.delete('/dosis/:id', DELETE);

export default router;
