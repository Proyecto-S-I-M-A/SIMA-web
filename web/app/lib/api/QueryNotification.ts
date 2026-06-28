import { useMutation } from '@tanstack/react-query';
import { apiJson } from '../apiClient';

type NotificationType =
  | 'nueva-receta'
  | 'receta-por-expirar'
  | 'receta-retirada'
  | 'recordatorio-receta';

interface SendNotificationPayload {
  id_acceso: string;
  type: NotificationType;
  data?: Record<string, unknown>;
}

export const useSendPushNotificationMutation = () => {
  return useMutation({
    mutationFn: (payload: SendNotificationPayload) =>
      apiJson<{ message: string }>('/notifications/send', {
        method: 'POST',
        body: payload,
        auth: true,
      }),
  });
};
