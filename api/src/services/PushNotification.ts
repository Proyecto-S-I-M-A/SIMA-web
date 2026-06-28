import type { ExpoPushMessage, ExpoPushResponse } from '../types/PushNotification.js';
import {
  nuevaRecetaTemplate,
  recetaPorExpirarTemplate,
  recetaRetiradaTemplate,
  recordatorioRecetaTemplate,
} from '../notifications/templates/index.js';
import type {
  NuevaRecetaData,
  RecetaPorExpirarData,
  RecetaRetiradaData,
  RecordatorioRecetaData,
} from '../notifications/templates/index.js';
import dotenv from 'dotenv';

dotenv.config();

const FUNCTIONS_URL = process.env.SUPABASE_FUNCTIONS_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function sendMessages(messages: ExpoPushMessage[]): Promise<ExpoPushResponse> {
  if (!FUNCTIONS_URL || !SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_FUNCTIONS_URL y SUPABASE_SERVICE_ROLE_KEY son requeridos');
  }

  const response = await fetch(`${FUNCTIONS_URL}/send-push-notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify(messages),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(`Error al enviar notificacion: ${JSON.stringify(error)}`);
  }

  return (await response.json()) as ExpoPushResponse;
}

export async function sendNuevaReceta(
  pushToken: string,
  data: NuevaRecetaData
): Promise<ExpoPushResponse> {
  const message = nuevaRecetaTemplate(pushToken, data);
  return sendMessages([message]);
}

export async function sendRecetaPorExpirar(
  pushToken: string,
  data: RecetaPorExpirarData
): Promise<ExpoPushResponse> {
  const message = recetaPorExpirarTemplate(pushToken, data);
  return sendMessages([message]);
}

export async function sendRecetaRetirada(
  pushToken: string,
  data: RecetaRetiradaData
): Promise<ExpoPushResponse> {
  const message = recetaRetiradaTemplate(pushToken, data);
  return sendMessages([message]);
}

export async function sendRecordatorioReceta(
  pushToken: string,
  data: RecordatorioRecetaData
): Promise<ExpoPushResponse> {
  const message = recordatorioRecetaTemplate(pushToken, data);
  return sendMessages([message]);
}

export async function sendBulk(messages: ExpoPushMessage[]): Promise<ExpoPushResponse> {
  return sendMessages(messages);
}
