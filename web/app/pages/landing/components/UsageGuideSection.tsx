import { useState } from 'react';
import { Box, Button, Container, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router';

import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

import SectionHeading from './SectionHeading';

// Cuenta de demostración pública: solo datos ficticios, sin información real de pacientes.
const DEMO_EMAIL = 'ruben@admin.com';
const DEMO_PASSWORD = '123456';

const steps = [
  {
    icon: <PhoneIphoneIcon />,
    title: 'Crea tu cuenta desde el celular',
    description:
      'Instala el APK de la app móvil y regístrate como paciente. Ese registro es el que después verás desde el panel web.',
  },
  {
    icon: <LoginIcon />,
    title: 'Entra a la web como médico',
    description:
      'Abre el panel web e inicia sesión con la cuenta de demostración que aparece más abajo.',
  },
  {
    icon: <SearchIcon />,
    title: 'Busca al paciente',
    description:
      'En el listado de pacientes, búscalo por nombre o cédula y abre su ficha para ver sus datos e historial.',
  },
  {
    icon: <EditNoteIcon />,
    title: 'Crea la receta',
    description:
      'Desde la ficha del paciente, registra los medicamentos y las dosis. La receta queda guardada y disponible al instante.',
  },
  {
    icon: <PointOfSaleIcon />,
    title: 'Retira el medicamento',
    description:
      'El paciente ve la receta en la app y la presenta en el kiosco, que valida y dispensa la medicación.',
  },
];

function CredentialRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 96 }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'monospace',
          fontWeight: 700,
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          bgcolor: 'rgba(2,136,209,0.10)',
          wordBreak: 'break-all',
        }}
      >
        {value}
      </Typography>
      <Tooltip title={copied ? 'Copiado' : 'Copiar'}>
        <IconButton size="small" onClick={handleCopy} aria-label={`Copiar ${label}`}>
          {copied ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

/** Guía paso a paso para probar el sistema de extremo a extremo. */
export default function UsageGuideSection() {
  return (
    <Box component="section" id="guia" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <SectionHeading
          overline="Guía de uso"
          title="Prueba el flujo completo en 5 pasos"
          subtitle="Desde el registro del paciente en la app hasta la entrega del medicamento en la máquina."
        />

        <Stack spacing={0}>
          {steps.map((step, index) => (
            <Stack key={step.title} direction="row" spacing={2.5} sx={{ alignItems: 'stretch' }}>
              {/* Columna del indicador con la línea que conecta los pasos */}
              <Stack sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'primary.contrastText',
                    background: 'linear-gradient(135deg, #0288D1 0%, #2E7D32 100%)',
                    boxShadow: '0 8px 20px rgba(2,136,209,0.25)',
                  }}
                >
                  {step.icon}
                </Box>
                {index < steps.length - 1 && (
                  <Box sx={{ flexGrow: 1, width: 2, bgcolor: 'rgba(2,136,209,0.25)', my: 0.5 }} />
                )}
              </Stack>

              <Box sx={{ pb: index < steps.length - 1 ? 4 : 0 }}>
                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                  Paso {index + 1}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  {step.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>

        {/* Credenciales de la cuenta de demostración */}
        <Paper
          elevation={0}
          sx={{
            mt: { xs: 4, md: 6 },
            p: { xs: 2.5, md: 4 },
            borderRadius: 3,
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Cuenta de demostración (médico)
            </Typography>
            <CredentialRow label="Correo" value={DEMO_EMAIL} />
            <CredentialRow label="Contraseña" value={DEMO_PASSWORD} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Es una cuenta de prueba con datos ficticios. No registres información real de
              pacientes en ella.
            </Typography>
            <Box>
              <Button component={Link} to="/login" variant="contained" sx={{ px: 3, fontWeight: 700 }}>
                Ir al inicio de sesión
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
