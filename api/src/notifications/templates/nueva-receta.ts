import type { ExpoPushMessage } from '../../types/PushNotification.js';

export interface NuevaRecetaData {
  clienteNombre: string;
  doctor?: string;
  hospital?: string;
  medicamento?: string;
}

export function nuevaRecetaTemplate(
  pushToken: string,
  data: NuevaRecetaData
): ExpoPushMessage {
  const doctorInfo = data.doctor ? ` del Dr. ${data.doctor}` : '';
  return {
    to: pushToken,
    title: 'Tienes una nueva receta',
    body: `Hola ${data.clienteNombre}, tienes una nueva receta disponible${doctorInfo}. Puedes retirarla cuando gustes.`,
    data: { type: 'nueva-receta', ...data },
    sound: 'default',
    priority: 'high',
    channelId: 'recetas',
  };
}
