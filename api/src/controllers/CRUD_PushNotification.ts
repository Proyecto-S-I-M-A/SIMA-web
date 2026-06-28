import type { Request, Response } from 'express';
import Cliente from '../models/Cliente.js';
import type { RegisterTokenBody, SendNotificationBody } from '../types/PushNotification.js';
import {
  sendNuevaReceta,
  sendRecetaPorExpirar,
  sendRecetaRetirada,
  sendRecordatorioReceta,
} from '../services/PushNotification.js';

async function registerToken(request: Request, response: Response) {
  try {
    const { id_cliente, push_token }: RegisterTokenBody = request.body;

    if (!id_cliente || !push_token) {
      return response.status(400).json({ error: 'id_cliente y push_token son requeridos' });
    }

    const valid =
      push_token.startsWith('ExponentPushToken[') ||
      push_token.startsWith('ExpoPushToken[');

    if (!valid) {
      return response.status(400).json({ error: 'push_token no es un Expo Push Token valido' });
    }

    const [affected] = await Cliente.update(
      { push_token },
      { where: { id: id_cliente } }
    );

    if (affected === 0) {
      return response.status(404).json({ error: 'Cliente no encontrado' });
    }

    return response.status(200).json({ message: 'Push token registrado exitosamente' });
  } catch (e: any) {
    return response.status(500).json({ error: 'Error al registrar push token', details: e.message });
  }
}

async function sendNotification(request: Request, response: Response) {
  try {
    const { id_cliente, type, data = {} }: SendNotificationBody = request.body;

    if (!id_cliente || !type) {
      return response.status(400).json({ error: 'id_cliente y type son requeridos' });
    }

    const cliente = await Cliente.findByPk(id_cliente);

    if (!cliente) {
      return response.status(404).json({ error: 'Cliente no encontrado' });
    }

    if (!cliente.push_token) {
      return response
        .status(422)
        .json({ error: 'El cliente no tiene un push token registrado' });
    }

    const clienteNombre = cliente.nombre;
    const pushToken = cliente.push_token;

    let result;

    switch (type) {
      case 'nueva-receta':
        result = await sendNuevaReceta(pushToken, { clienteNombre, ...data } as any);
        break;
      case 'receta-por-expirar':
        result = await sendRecetaPorExpirar(pushToken, { clienteNombre, ...data } as any);
        break;
      case 'receta-retirada':
        result = await sendRecetaRetirada(pushToken, { clienteNombre, ...data } as any);
        break;
      case 'recordatorio-receta':
        result = await sendRecordatorioReceta(pushToken, { clienteNombre, ...data } as any);
        break;
      default:
        return response.status(400).json({ error: `Tipo de notificacion desconocido: ${type}` });
    }

    return response.status(200).json({ message: 'Notificacion enviada', result });
  } catch (e: any) {
    return response
      .status(500)
      .json({ error: 'Error al enviar notificacion', details: e.message });
  }
}

export { registerToken, sendNotification };
