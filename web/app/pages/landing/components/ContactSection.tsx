import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';

import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaceIcon from '@mui/icons-material/Place';

import SectionHeading from './SectionHeading';

const CONTACT_EMAIL = 'ruben.feng@utp.ac.pa';
const REPO_URL = 'https://github.com/Proyecto-S-I-M-A';

const channels = [
  {
    icon: <EmailIcon />,
    title: 'Correo',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: <GitHubIcon />,
    title: 'Repositorio',
    value: 'Proyecto-S-I-M-A',
    href: REPO_URL,
  },
  {
    icon: <PlaceIcon />,
    title: 'Ubicación',
    value: 'Panamá, Panamá',
    href: undefined,
  },
];

/** Canales de contacto y llamada a la acción final. */
export default function ContactSection() {
  return (
    <Box component="section" id="contacto" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          overline="Contacto"
          title="¿Quieres saber más del proyecto?"
          subtitle="Escríbenos si te interesa una demo, colaborar o conocer los detalles técnicos."
        />

        <Grid container spacing={3}>
          {channels.map((channel) => (
            <Grid key={channel.title} size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                }}
              >
                <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                  <Box sx={{ color: 'primary.main' }}>{channel.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {channel.title}
                  </Typography>
                  {channel.href ? (
                    <Typography
                      component="a"
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      variant="body2"
                      sx={{ color: 'text.secondary', wordBreak: 'break-all' }}
                    >
                      {channel.value}
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {channel.value}
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            mt: { xs: 4, md: 6 },
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            textAlign: 'center',
            color: 'primary.contrastText',
            background: 'linear-gradient(135deg, #01579B 0%, #0288D1 50%, #2E7D32 100%)',
            boxShadow: '0 16px 40px rgba(2,136,209,0.25)',
          }}
        >
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Prueba S.I.M.A. hoy mismo
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 560, opacity: 0.9 }}>
              Explora el panel del médico con la cuenta de demostración y recorre el flujo
              completo de una receta.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  fontWeight: 700,
                  bgcolor: 'common.white',
                  color: 'primary.dark',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                Probar demo
              </Button>
              <Button
                href={`mailto:${CONTACT_EMAIL}`}
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  fontWeight: 700,
                  color: 'common.white',
                  borderColor: 'rgba(255,255,255,0.7)',
                  '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                Contactar al equipo
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
