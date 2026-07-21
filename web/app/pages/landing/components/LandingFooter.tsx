import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';

const links = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Descargar app', href: '#descargar' },
  { label: 'Guía de uso', href: '#guia' },
  { label: 'Autores', href: '#autores' },
  { label: 'Contacto', href: '#contacto' },
];

export default function LandingFooter() {
  return (
    <Box component="footer" sx={{ position: 'relative', zIndex: 1, pt: 4, pb: 4 }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              component="img"
              src="/logo/SIMA-logo.webp"
              alt="Logo S.I.M.A."
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              © {new Date().getFullYear()} S.I.M.A. — Sistema Inteligente de Medicación Asistida
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {links.map((link) => (
              <Typography
                key={link.href}
                component="a"
                href={link.href}
                variant="body2"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                {link.label}
              </Typography>
            ))}
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              Iniciar sesión
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
