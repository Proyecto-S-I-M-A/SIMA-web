import { Box, Container, Stack, Typography, Grid, Paper } from '@mui/material';
import ButtonVariant from '~/components/ButtonVariant';

import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SecurityIcon from '@mui/icons-material/Security';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const features = [
  {
    icon: <MedicationLiquidIcon fontSize="large" />,
    title: 'Recetas electrónicas',
    description:
      'Los médicos generan y gestionan prescripciones digitales de forma rápida y segura.',
  },
  {
    icon: <PrecisionManufacturingIcon fontSize="large" />,
    title: 'Dispensación automatizada',
    description:
      'La máquina valida y entrega la medicación correcta en la dosis indicada.',
  },
  {
    icon: <MonitorHeartIcon fontSize="large" />,
    title: 'Seguimiento del paciente',
    description:
      'Historial médico y ficha clínica centralizados para un mejor control del tratamiento.',
  },
  {
    icon: <SecurityIcon fontSize="large" />,
    title: 'Seguro y confiable',
    description:
      'Autenticación y control de acceso para proteger la información sensible.',
  },
];

export default function Landing() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(270deg, #edf1f4, #a1c4fd, #c2e9fb, #ffffff)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 12s ease infinite',

        '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        '@keyframes floatY': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        '@keyframes floatXY': {
          '0%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(20px, -30px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },

        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: 0.5,
          zIndex: 0,
        },
        '&::before': {
          background: '#4facfe',
          top: '30%',
          right: '8%',
          animation: 'floatXY 10s ease-in-out infinite',
        },
        '&::after': {
          background: '#43e97b',
          top: '55%',
          left: '5%',
          animation: 'floatY 12s ease-in-out infinite',
        },
      }}
    >
      {/* Barra superior */}
      <Box
        component="header"
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 6 },
          py: 2,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            component="img"
            src="/logo/SIMA-logo.webp"
            alt="Logo S.I.M.A."
            sx={{ width: 44, height: 44 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            S.I.M.A.
          </Typography>
        </Stack>
      </Box>

      {/* Hero */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{ position: 'relative', zIndex: 1, pt: { xs: 4, md: 8 }, pb: 8 }}
      >
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Box
            component="img"
            src="/logo/SIMA-logo.png"
            alt="Logo S.I.M.A."
            sx={{
              width: { xs: 140, md: 190 },
              height: { xs: 140, md: 190 },
              filter: 'drop-shadow(0 10px 25px rgba(2,136,209,0.25))',
              animation: 'floatY 6s ease-in-out infinite',
            }}
          />

          <Typography
            component="h1"
            sx={(theme) => ({
              fontWeight: 800,
              fontSize: { xs: '2.2rem', md: '3.4rem' },
              lineHeight: 1.1,
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              maxWidth: 900,
            })}
          >
            Sistema Inteligente de Medicación Asistida
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              maxWidth: 680,
            }}
          >
            Conectamos médicos, pacientes y dispensación automatizada en una sola
            plataforma para hacer la gestión de recetas más simple, segura y
            precisa.
          </Typography>

          <Box sx={{ width: { xs: '100%', sm: 280 }, mt: 1 }}>
            <ButtonVariant variant="Primary" size="large" to="/login">
              Probar demo
            </ButtonVariant>
          </Box>
        </Stack>

        {/* Características */}
        <Grid container spacing={3} sx={{ mt: { xs: 4, md: 8 } }}>
          {features.map((feature) => (
            <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 3,
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255,255,255,0.7)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 40px rgba(2,136,209,0.18)',
                  },
                }}
              >
                <Stack spacing={1.5}>
                  <Box sx={{ color: 'primary.main' }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pie */}
      <Box
        component="footer"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          py: 3,
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} S.I.M.A. — Sistema Inteligente de Medicación
          Asistida
        </Typography>
      </Box>
    </Box>
  );
}
