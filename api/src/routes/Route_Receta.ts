import { CREATE, READ, UPDATE, DELETE } from '../controllers/CRUD_Receta.js';
import PostRecetaByCedula from '../controllers/PostRecetaByCedula.js';
import { validateRecetaCreation, handleValidationErrors } from '../middleware/validateReceta.js';
import { Router } from 'express';

const router = Router();

router.post('/recetas', validateRecetaCreation, handleValidationErrors, CREATE);
router.get('/recetas/:id', READ);
router.put('/recetas/:id', validateRecetaCreation, handleValidationErrors, UPDATE);
router.delete('/recetas/:id', DELETE);
router.post('/recetas/cedula/:cedula', validateRecetaCreation, handleValidationErrors, PostRecetaByCedula);

export default router;
