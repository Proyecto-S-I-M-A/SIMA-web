import type { ExpoPushMessage } from '../../types/PushNotification.js';

export interface RecetaRetiradaData {
  clienteNombre: string;
  medicamento?: string;
  codigoReceta?: number;
  farmacia?: string;
}

export function recetaRetiradaTemplate(
  pushToken: string,
  data: RecetaRetiradaData
): ExpoPushMessage {
  const farmaciaInfo = data.farmacia ? ` en ${data.farmacia}` : '';
  return {
    to: pushToken,
    title: 'Receta retirada exitosamente',
    body: `Hola ${data.clienteNombre}, tu receta ha sido retirada${farmaciaInfo}. Recuerda seguir las indicaciones de tu medico.`,
    data: { type: 'receta-retirada', ...data },
    sound: 'default',
    priority: 'default',
    channelId: 'recetas',
  };
}
