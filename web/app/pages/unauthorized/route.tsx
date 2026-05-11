import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import LockIcon from '@mui/icons-material/Lock';

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <LockIcon
            sx={{
              fontSize: 80,
              color: '#d32f2f',
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: '#333',
            }}
          >
            Acceso No Autorizado
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#666',
              mb: 3,
            }}
          >
            Tu sesión ha expirado o no tienes permisos para acceder a esta página.
            Por favor, inicia sesión nuevamente.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login', { replace: true })}
            >
              Ir a Login
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/', { replace: true })}
            >
              Ir a Inicio
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
