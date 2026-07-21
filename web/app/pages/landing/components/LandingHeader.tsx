import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';

const navLinks = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Descargar app', href: '#descargar' },
  { label: 'Guía de uso', href: '#guia' },
  { label: 'Autores', href: '#autores' },
  { label: 'Contacto', href: '#contacto' },
];

/** Barra superior con navegación por anclas hacia las secciones de la landing. */
export default function LandingHeader() {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: { xs: 2, md: 6 },
        py: 1.5,
        backdropFilter: 'blur(16px)',
        background: 'rgba(255,255,255,0.65)',
        borderBottom: '1px solid rgba(255,255,255,0.6)',
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

      <Stack
        component="nav"
        direction="row"
        spacing={1}
        sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
      >
        {navLinks.map((link) => (
          <Button
            key={link.href}
            href={link.href}
            size="small"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {link.label}
          </Button>
        ))}
      </Stack>

      <Button
        component={Link}
        to="/login"
        variant="contained"
        size="small"
        sx={{ fontWeight: 600, px: 2.5 }}
      >
        Iniciar sesión
      </Button>
    </Box>
  );
}
