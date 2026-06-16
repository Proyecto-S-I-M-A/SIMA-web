import { Box, Button, Chip, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import type { Cliente } from '~/types/cliente';

type PatientBannerProps = {
  cliente: Cliente;
  onBack: () => void;
};

export default function PatientBanner({ cliente, onBack }: PatientBannerProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0288D1 0%, #01579B 100%)',
        color: 'white',
        py: 3,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ color: 'rgba(255,255,255,0.85)', mb: 2, pl: 0, '&:hover': { color: 'white' } }}
        >
          Volver al dashboard
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <MedicalServicesIcon sx={{ fontSize: 30 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              Nueva Receta Médica
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <PersonIcon sx={{ fontSize: 16, opacity: 0.8 }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {cliente.nombre} {cliente.apellido}
              </Typography>
              <Chip
                label={`CI: ${cliente.cedula}`}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 11, height: 22 }}
              />
              <Chip
                label="Pendiente"
                size="small"
                sx={{ bgcolor: 'rgba(255,152,0,0.3)', color: 'white', fontSize: 11, height: 22 }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
