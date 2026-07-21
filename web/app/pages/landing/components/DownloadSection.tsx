import { Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';

import AndroidIcon from '@mui/icons-material/Android';
import DownloadIcon from '@mui/icons-material/Download';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import SectionHeading from './SectionHeading';

const APK_URL =
  'https://expo.dev/artifacts/eas/MKosTsc-MB_AmzNnjKPemPrvJMFCQFowGaukogC6H3I.apk';

const appFeatures = [
  {
    icon: <ReceiptLongIcon />,
    title: 'Tus recetas siempre a mano',
    description: 'Consulta las prescripciones activas y el historial de tu tratamiento.',
  },
  {
    icon: <NotificationsActiveIcon />,
    title: 'Recordatorios de dosis',
    description: 'Notificaciones para que no se te pase ninguna toma.',
  },
];

/** Descarga del APK de la app móvil para pacientes. */
export default function DownloadSection() {
  return (
    <Box component="section" id="descargar" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          overline="App móvil"
          title="Lleva S.I.M.A. en tu bolsillo"
          subtitle="La app para pacientes te permite ver tus recetas y retirar tus medicamentos desde la máquina."
        />

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          }}
        >
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={2.5} sx={{ alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
                <Box
                  sx={{
                    width: 88,
                    height: 88,
                    borderRadius: 3,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'primary.contrastText',
                    background: 'linear-gradient(135deg, #0288D1 0%, #2E7D32 100%)',
                    boxShadow: '0 12px 30px rgba(2,136,209,0.25)',
                  }}
                >
                  <AndroidIcon sx={{ fontSize: 48 }} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  App S.I.M.A. para pacientes
                </Typography>

                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Chip label="Android" size="small" icon={<AndroidIcon />} />
                  <Chip label="APK · Instalación directa" size="small" />
                </Stack>

                <Button
                  href={APK_URL}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  size="large"
                  startIcon={<DownloadIcon />}
                  sx={(theme) => ({
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    },
                  })}
                >
                  Descargar APK
                </Button>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Al ser una versión de prueba distribuida fuera de Google Play, Android pedirá
                  autorizar la instalación desde orígenes desconocidos.
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={2}>
                {appFeatures.map((feature) => (
                  <Stack key={feature.title} direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        display: 'grid',
                        placeItems: 'center',
                        color: 'primary.main',
                        bgcolor: 'rgba(2,136,209,0.10)',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
