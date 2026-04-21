import { Router } from 'express';
import GetRecetaByCedula from '../controllers/GetRecetaByCedula.js';

const router = Router();
router.get('/recetas/cliente/:cedula', GetRecetaByCedula);

export default router;