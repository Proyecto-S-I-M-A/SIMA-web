import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';

import SpeedIcon from '@mui/icons-material/Speed';
import RuleIcon from '@mui/icons-material/Rule';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import InsightsIcon from '@mui/icons-material/Insights';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import SectionHeading from './SectionHeading';

const benefits = [
  {
    icon: <SpeedIcon />,
    title: 'Menos tiempo por consulta',
    description:
      'Los datos del paciente y sus medicamentos se autocompletan: emitir una receta toma segundos, no minutos.',
  },
  {
    icon: <RuleIcon />,
    title: 'Menos errores de medicación',
    description:
      'La dosis viaja validada desde la receta hasta la máquina, sin letra ilegible ni interpretaciones.',
  },
  {
    icon: <Inventory2Icon />,
    title: 'Inventario siempre al día',
    description:
      'Cada entrega descuenta del stock de la máquina, así sabes qué hay disponible antes de recetar.',
  },
  {
    icon: <HistoryEduIcon />,
    title: 'Historial clínico completo',
    description:
      'Todo lo recetado y retirado queda registrado y consultable, sin depender de archivos en papel.',
  },
  {
    icon: <AccessibilityNewIcon />,
    title: 'Mejor experiencia del paciente',
    description:
      'El paciente consulta su receta desde el móvil y retira su medicamento sin filas ni traslados extra.',
  },
  {
    icon: <InsightsIcon />,
    title: 'Decisiones con datos',
    description:
      'Métricas de recetas, pacientes y consumo para entender la operación y anticipar la reposición.',
  },
];

const comparison = [
  { before: 'Recetas en papel que se pierden o no se leen', after: 'Receta electrónica firmada y trazable' },
  { before: 'Historial disperso en carpetas y hojas sueltas', after: 'Ficha clínica centralizada y buscable' },
  { before: 'Entrega manual sujeta a error humano', after: 'Dispensación validada por la máquina' },
  { before: 'Inventario revisado a mano', after: 'Stock actualizado en cada retiro' },
];

/** Qué mejora concretamente al adoptar S.I.M.A. */
export default function BenefitsSection() {
  return (
    <Box component="section" id="beneficios" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          overline="Beneficios"
          title="Qué mejorarás al usar S.I.M.A."
          subtitle="El objetivo no es solo digitalizar la receta, sino reducir errores, tiempos y trabajo manual en todo el proceso."
        />

        <Grid container spacing={3}>
          {benefits.map((benefit) => (
            <Grid key={benefit.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 40px rgba(46,125,50,0.16)',
                  },
                }}
              >
                <Stack spacing={1.5}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      color: 'primary.contrastText',
                      background: 'linear-gradient(135deg, #0288D1 0%, #2E7D32 100%)',
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {benefit.description}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Antes y después */}
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
          <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>
            Antes y después
          </Typography>

          <Stack spacing={2}>
            {comparison.map((row) => (
              <Grid container key={row.after} spacing={2} sx={{ alignItems: 'center' }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <CloseIcon fontSize="small" sx={{ color: 'error.main' }} />
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
                    >
                      {row.before}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <CheckIcon fontSize="small" sx={{ color: 'success.main' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {row.after}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
