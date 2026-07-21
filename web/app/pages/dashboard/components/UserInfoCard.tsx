import { Avatar, Box, Chip, Divider, Skeleton, Stack, Typography } from '@mui/material';

import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ScheduleIcon from '@mui/icons-material/Schedule';

import { GetSession } from '~/lib/GetSession';
import { useGetUsuario } from '~/lib/api/QueryUsuario';
import { useGetAccesos } from '~/lib/api/QueryAcceso';
import type { Acceso } from '~/types/Acceso';

function initials(nombre: string, apellido: string) {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase() || '?';
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 200 }}>
      <Box sx={{ color: 'primary.main', display: 'flex' }}>{icon}</Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" sx={{ color: '#6b7280' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, wordBreak: 'break-word' }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

/** Tarjeta con la información del profesional que tiene la sesión abierta. */
export function UserInfoCard() {
  const sessionID = GetSession() || '';
  const { data: usuarios, isLoading: loadingUsuario } = useGetUsuario(sessionID, !!sessionID);
  const { data: accesoData, isLoading: loadingAcceso } = useGetAccesos(sessionID, !!sessionID);

  const usuario = usuarios && usuarios.length > 0 ? usuarios[0] : undefined;
  // El endpoint devuelve el acceso suelto o dentro de un arreglo según el caso.
  const acceso = (Array.isArray(accesoData) ? accesoData[0] : accesoData) as Acceso | undefined;

  const isLoading = loadingUsuario || loadingAcceso;

  if (isLoading) {
    return (
      <Box sx={{ px: 4, pt: 4 }}>
        <Skeleton variant="rounded" height={140} sx={{ borderRadius: 3 }} />
      </Box>
    );
  }

  if (!usuario) {
    return null;
  }

  const nombre = usuario.nombre || '';
  const apellido = usuario.apellido || '';
  const nombreCompleto = `${nombre} ${apellido}`.trim() || 'Usuario sin nombre';
  const ultimoAcceso = acceso?.ultimo_acceso
    ? new Date(acceso.ultimo_acceso).toLocaleString('es-PA', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Sin registro';

  return (
    <Box sx={{ px: 4, pt: 4 }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 3,
          p: 3,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{ alignItems: { xs: 'flex-start', md: 'center' } }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', minWidth: 260 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                fontWeight: 700,
                fontSize: '1.4rem',
                bgcolor: 'primary.main',
              }}
            >
              {initials(nombre, apellido)}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Sesión iniciada como
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {nombreCompleto}
              </Typography>
              {usuario.rol && (
                <Chip
                  label={usuario.rol}
                  size="small"
                  sx={{
                    mt: 0.5,
                    textTransform: 'capitalize',
                    bgcolor: 'rgba(2,136,209,0.12)',
                    color: 'primary.dark',
                    fontWeight: 600,
                  }}
                />
              )}
            </Box>
          </Stack>

          <Divider flexItem orientation="vertical" sx={{ display: { xs: 'none', md: 'block' } }} />

          <Stack
            direction="row"
            spacing={3}
            sx={{ flexWrap: 'wrap', rowGap: 2, flexGrow: 1 }}
          >
            <DetailItem
              icon={<EmailIcon fontSize="small" />}
              label="Correo"
              value={acceso?.correo || 'No disponible'}
            />
            <DetailItem
              icon={<BadgeIcon fontSize="small" />}
              label="RUC del doctor"
              value={usuario.ruc_doctor || 'No registrado'}
            />
            <DetailItem
              icon={<LocalHospitalIcon fontSize="small" />}
              label="Especialidad"
              value={usuario.especialidades || 'No registrada'}
            />
            <DetailItem
              icon={<ScheduleIcon fontSize="small" />}
              label="Último acceso"
              value={ultimoAcceso}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
