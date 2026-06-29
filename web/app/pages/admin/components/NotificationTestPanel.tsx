import { useState } from 'react';
import {
  Typography,
  Stack,
  Button,
  Alert,
  Divider,
  Box,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import CustomeSelectQuery from '~/components/CustomeSelectQuery';
import { useSendPushNotificationMutation } from '~/lib/api/QueryNotification';

type NotificationType =
  | 'nueva-receta'
  | 'receta-por-expirar'
  | 'receta-retirada'
  | 'recordatorio-receta';

type Status = 'idle' | 'pending' | 'success' | 'error';

const NOTIFICATION_TYPES: { type: NotificationType; label: string; color: 'primary' | 'warning' | 'error' | 'info' }[] = [
  { type: 'nueva-receta',         label: 'Nueva Receta',          color: 'primary' },
  { type: 'receta-por-expirar',   label: 'Receta por Expirar',    color: 'warning' },
  { type: 'receta-retirada',      label: 'Receta Retirada',       color: 'error'   },
  { type: 'recordatorio-receta',  label: 'Recordatorio de Receta',color: 'info'    },
];

const INITIAL_STATUSES: Record<NotificationType, Status> = {
  'nueva-receta':        'idle',
  'receta-por-expirar':  'idle',
  'receta-retirada':     'idle',
  'recordatorio-receta': 'idle',
};

export function NotificationTestPanel() {
  const [selectedAcceso, setSelectedAcceso] = useState('');
  const [statuses, setStatuses] = useState<Record<NotificationType, Status>>(INITIAL_STATUSES);
  const { mutate } = useSendPushNotificationMutation();

  const handleSend = (type: NotificationType) => {
    if (!selectedAcceso) return;
    setStatuses((prev) => ({ ...prev, [type]: 'pending' }));
    mutate(
      { id_acceso: selectedAcceso, type },
      {
        onSuccess: () => setStatuses((prev) => ({ ...prev, [type]: 'success' })),
        onError: ()   => setStatuses((prev) => ({ ...prev, [type]: 'error' })),
      }
    );
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Prueba de Notificaciones Push
      </Typography>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary' }}>
          Seleccionar Cliente
        </Typography>
        <CustomeSelectQuery
          endpoint="accesos"
          labelID="notif-acceso-select"
          label="Cliente / Acceso"
          value={selectedAcceso}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
            setSelectedAcceso(e.target.value as string)
          }
          labelSelector="usuario"
          secondaryLabelSelector="correo"
          valueSelector="id"
        />
      </Box>

      {!selectedAcceso && (
        <Alert severity="info">
          Selecciona un cliente para poder enviar notificaciones de prueba.
        </Alert>
      )}

      <Divider />

      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
        {NOTIFICATION_TYPES.map(({ type, label, color }) => {
          const status = statuses[type];
          return (
            <Stack key={type} spacing={0.5} sx={{ alignItems: 'flex-start' }}>
              <Button
                variant={status === 'success' ? 'outlined' : 'contained'}
                color={status === 'error' ? 'error' : color}
                startIcon={<SendIcon />}
                onClick={() => handleSend(type)}
                disabled={!selectedAcceso || status === 'pending'}
                loading={status === 'pending'}
              >
                {label}
              </Button>
              {status === 'success' && (
                <Typography variant="caption" color="success.main">
                  Enviado
                </Typography>
              )}
              {status === 'error' && (
                <Typography variant="caption" color="error.main">
                  Error al enviar
                </Typography>
              )}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
