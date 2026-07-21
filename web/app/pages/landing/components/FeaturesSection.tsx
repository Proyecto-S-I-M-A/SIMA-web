import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';

import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SecurityIcon from '@mui/icons-material/Security';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import SectionHeading from './SectionHeading';

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

/** Capacidades principales de la plataforma. */
export default function FeaturesSection() {
  return (
    <Container component="section" id="caracteristicas" maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
      <SectionHeading
        overline="Plataforma"
        title="Todo el ciclo de la receta en un solo lugar"
        subtitle="Desde la prescripción del médico hasta la entrega del medicamento en la máquina."
      />

      <Grid container spacing={3}>
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
  );
}
