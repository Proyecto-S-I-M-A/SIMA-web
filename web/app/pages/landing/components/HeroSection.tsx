import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';

const highlights = [
  { value: '3', label: 'Módulos conectados' },
  { value: '0', label: 'Recetas en papel' },
  { value: '24/7', label: 'Dispensación disponible' },
];

/** Portada principal: propuesta de valor y llamada a la acción. */
export default function HeroSection() {
  return (
    <Container
      component="section"
      maxWidth="lg"
      sx={{ position: 'relative', zIndex: 1, pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 10 }, background: '#ffffff60', borderRadius: 3, backdropFilter: 'blur(20px)', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', mt: { xs: 2, md: 3 } }}
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
          sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 680 }}
        >
          Conectamos médicos, pacientes y dispensación automatizada en una sola
          plataforma para hacer la gestión de recetas más simple, segura y precisa.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ width: { xs: '100%', sm: 'auto' }, mt: 1 }}
        >
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            sx={(theme) => ({
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              },
            })}
          >
            Probar demo
          </Button>
          <Button
            href="#como-funciona"
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 600, background: 'rgba(255,255,255,0.6)' }}
          >
            Ver cómo funciona
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={{ xs: 3, md: 6 }}
          sx={{ mt: { xs: 3, md: 5 }, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {highlights.map((item) => (
            <Stack key={item.label} sx={{ alignItems: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.dark' }}>
                {item.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
