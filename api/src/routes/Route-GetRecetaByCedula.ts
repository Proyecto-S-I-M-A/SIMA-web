import { Router } from 'express';
import GetRecetaByCedula from '../controllers/GetRecetaByCedula.js';
import { GetRecetasYDosis } from '../controllers/GetRecetasyDosis.js';

const router = Router();
router.get('/recetas/cliente/:cedula', GetRecetaByCedula);
router.get('/recetas/dosis/cliente/:cedula', GetRecetasYDosis);


export default router;