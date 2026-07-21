import { Avatar, Box, Chip, Container, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import StorageIcon from '@mui/icons-material/Storage';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import SectionHeading from './SectionHeading';

interface Author {
  name: string;
  role: string;
  github?: string;
  email?: string;
}

interface TeamModule {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  members: Author[];
}

// TODO: completar nombres, correos y usuarios de GitHub del equipo de app móvil y kiosco.
const modules: TeamModule[] = [
  {
    id: 'web',
    label: 'Panel web',
    description: 'Panel para médicos: recetas, pacientes e historial.',
    icon: <LanguageIcon />,
    members: [
      {
        name: 'Rubén Feng',
        role: 'Fullstack / Frontend',
        email: 'ruben.feng@utp.ac.pa',
      },
      {
        name: 'Luis Monterrosa',
        role: 'Frontend',
        github: 'LuisGPT12',
        email: 'luis.monterrosa1@utp.ac.pa',
      },
      {
        name: 'victxr-rod',
        role: 'Backend / API',
        github: 'victxr-rod',
      },
    ],
  },
  {
    id: 'api',
    label: 'API',
    description: 'Backend, base de datos y reglas de negocio.',
    icon: <StorageIcon />,
    members: [
      {
        name: 'Rubén Feng',
        role: 'Fullstack / Backend',
      },
       {
        name: 'Irvin Benitez',
        role: 'Fullstack / Backend',
        github: 'IrvinngB',
        email: 'irvin.benitez@utp.ac.pa',
      },
    ],
  },
  {
    id: 'app',
    label: 'App móvil',
    description: 'Cliente en Expo y React Native para pacientes.',
    icon: <PhoneIphoneIcon />,
    members: [
      {
        name: 'Rubén Feng',
        role: 'Fullstack',
      },
      {
        name: 'Kevin Linares',
        role: 'Dessarrollador móvil',
        github: 'Kevincito20',
        email: 'kevin.linares@utp.ac.pa',
      },
    ],
  },
  {
    id: 'kiosco',
    label: 'Kiosco',
    description: 'Panel de la máquina para el retiro de medicamentos.',
    icon: <PointOfSaleIcon />,
    members: [ 
      {
        name: 'Adrian Romero',
        role: 'Desarrollador IOT',
        github: 'electricforce',
        email: 'adrian.romero@utp.ac.pa',
      },
    ],
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** Equipo que desarrolla el proyecto. */
export default function AuthorsSection() {
  return (
    <Box component="section" id="autores" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          overline="Autores"
          title="El equipo detrás de S.I.M.A."
          subtitle="Proyecto desarrollado por estudiantes de la Universidad Tecnológica de Panamá."
        />

        <Stack spacing={{ xs: 4, md: 5 }}>
          {modules.map((module) => (
            <Box key={module.id}>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: 'center', justifyContent: 'center', mb: 2, textAlign: 'center' }}
              >
                <Box sx={{ color: 'primary.main', display: 'flex' }}>{module.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {module.label}
                </Typography>
                <Chip
                  label={`${module.members.length} ${module.members.length === 1 ? 'integrante' : 'integrantes'}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(2,136,209,0.12)', color: 'primary.dark', fontWeight: 600 }}
                />
              </Stack>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
              >
                {module.description}
              </Typography>

              <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                {module.members.map((author) => (
                  <Grid key={`${module.id}-${author.github ?? author.name}`} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: 3,
                        textAlign: 'center',
                        background: 'rgba(255,255,255,0.75)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          boxShadow: '0 16px 40px rgba(2,136,209,0.18)',
                        },
                      }}
                    >
                      <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            width: 72,
                            height: 72,
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            background: 'linear-gradient(135deg, #0288D1 0%, #2E7D32 100%)',
                          }}
                        >
                          {initials(author.name)}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {author.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                          {author.role}
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                          {author.github && (
                            <IconButton
                              component="a"
                              href={`https://github.com/${author.github}`}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`GitHub de ${author.name}`}
                              size="small"
                            >
                              <GitHubIcon fontSize="small" />
                            </IconButton>
                          )}
                          {author.email && (
                            <IconButton
                              component="a"
                              href={`mailto:${author.email}`}
                              aria-label={`Correo de ${author.name}`}
                              size="small"
                            >
                              <EmailIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Stack>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 4, alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}
        >
          <SchoolIcon fontSize="small" />
          <Typography variant="body2">
            Universidad Tecnológica de Panamá — Proyecto académico
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
