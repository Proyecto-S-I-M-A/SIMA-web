import type { ExpoPushMessage } from '../../types/PushNotification.js';

export interface RecordatorioRecetaData {
  clienteNombre: string;
  medicamento: string;
  dosis?: string;
  hora?: string;
}

export function recordatorioRecetaTemplate(
  pushToken: string,
  data: RecordatorioRecetaData
): ExpoPushMessage {
  const horaInfo = data.hora ? ` a las ${data.hora}` : '';
  const dosisInfo = data.dosis ? ` — Dosis: ${data.dosis}` : '';
  return {
    to: pushToken,
    title: 'Recordatorio de medicamento',
    body: `Hola ${data.clienteNombre}, es hora de tomar ${data.medicamento}${horaInfo}${dosisInfo}.`,
    data: { type: 'recordatorio-receta', ...data },
    sound: 'default',
    priority: 'high',
    channelId: 'recordatorios',
  };
}
