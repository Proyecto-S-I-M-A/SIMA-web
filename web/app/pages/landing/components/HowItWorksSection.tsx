import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';

import SectionHeading from './SectionHeading';

const steps = [
  {
    title: 'El médico inicia sesión',
    description: 'Accede al panel web con su cuenta institucional y ve sus pacientes asignados.',
  },
  {
    title: 'Emite la receta electrónica',
    description: 'Selecciona medicamentos y dosis; el sistema valida los datos antes de guardarla.',
  },
  {
    title: 'El paciente la recibe',
    description: 'Consulta su receta y el estado del tratamiento desde la app móvil.',
  },
  {
    title: 'La máquina dispensa',
    description: 'Valida la receta autorizada, entrega la medicación y actualiza el inventario.',
  },
];

/** Flujo del sistema explicado en cuatro pasos. */
export default function HowItWorksSection() {
  return (
    <Box component="section" id="como-funciona" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          overline="Cómo funciona"
          title="Del consultorio a la máquina en cuatro pasos"
          subtitle="Un único flujo conecta al médico, al paciente y a la dispensación automatizada."
        />

        <Grid container spacing={3}>
          {steps.map((step, index) => (
            <Grid key={step.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  borderTop: '4px solid',
                  borderColor: 'primary.main',
                }}
              >
                <Stack spacing={1.5}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: 'primary.main', opacity: 0.35 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {step.description}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
