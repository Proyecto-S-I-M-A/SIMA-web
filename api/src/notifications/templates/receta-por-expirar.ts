import type { ExpoPushMessage } from '../../types/PushNotification.js';

export interface RecetaPorExpirarData {
  clienteNombre: string;
  diasRestantes: number;
  medicamento?: string;
  codigoReceta?: number;
}

export function recetaPorExpirarTemplate(
  pushToken: string,
  data: RecetaPorExpirarData
): ExpoPushMessage {
  const dias = data.diasRestantes === 1 ? '1 dia' : `${data.diasRestantes} dias`;
  return {
    to: pushToken,
    title: 'Tu receta esta a punto de expirar',
    body: `Hola ${data.clienteNombre}, tu receta vence en ${dias}. Retirala pronto para no perderla.`,
    data: { type: 'receta-por-expirar', ...data },
    sound: 'default',
    priority: 'high',
    channelId: 'recetas',
  };
}
