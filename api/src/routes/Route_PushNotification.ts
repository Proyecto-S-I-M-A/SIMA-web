import { Router } from 'express';
import { registerToken, sendNotification } from '../controllers/CRUD_PushNotification.js';

const router = Router();

// Registra el Expo push token del cliente
router.post('/notifications/register-token', registerToken);

// Envia una notificacion a un cliente por tipo
router.post('/notifications/send', sendNotification);

export default router;
