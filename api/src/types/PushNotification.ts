export interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  sound?: 'default' | null;
  badge?: number;
  channelId?: string;
  ttl?: number;
  expiration?: number;
  priority?: 'default' | 'normal' | 'high';
}

export interface ExpoPushTicket {
  id: string;
  status: 'ok' | 'error';
  message?: string;
  details?: Record<string, unknown>;
}

export interface ExpoPushResponse {
  data: ExpoPushTicket[];
}

export type NotificationType =
  | 'nueva-receta'
  | 'receta-por-expirar'
  | 'receta-retirada'
  | 'recordatorio-receta';

export interface SendNotificationBody {
  id_cliente: number;
  type: NotificationType;
  data?: Record<string, unknown>;
}

export interface RegisterTokenBody {
  id_cliente: number;
  push_token: string;
}
