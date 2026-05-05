import { useSearchParams } from 'react-router';
import { useGetRecetasYDosisByCedula } from '~/lib/api/QueryReceta';
import { useGetClienteByCedula } from '~/lib/api/QueryCliente';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Navbar } from '../dashboard/components/Navbar';
import RecetaDosisList from './components/DosisTable';


export default function Historial() {
  const [searchParams] = useSearchParams();
  const cedula = searchParams.get('cedula') || '';
  const navigate = useNavigate();

  const {
    data: cliente,
    isLoading: loadingCliente,
    error: errorCliente,
  } = useGetClienteByCedula(cedula, !!cedula);

  const {
    data: recetas,
    isLoading: loadingRecetas,
    isError: errorRecetas,
  } = useGetRecetasYDosisByCedula(cedula, !!cedula);

  console.log('Recetas con dosis e inventario:', recetas);

  const loading = loadingCliente || loadingRecetas;
  const error = errorCliente || errorRecetas;

  if (!cedula) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          No se proporcionó una cédula para consultar el historial.
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/home')}
          sx={{ mt: 2 }}
        >
          Volver al dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Navbar rawSearch="" onSearchChange={() => {}} />
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/home')}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error al cargar el historial
          </Alert>
        )}

        {!loading && !error && cliente && (
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Historial de {cliente.nombre} {cliente.apellido}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cédula: {cliente.cedula} | Email: {cliente.correo} | Sexo: {cliente.sexo}
            </Typography>
            <Chip
              label={cliente.asegurado ? 'Asegurado' : 'No asegurado'}
              color={cliente.asegurado ? 'success' : 'default'}
              size="small"
              sx={{ mt: 1 }}
            />
          </Paper>
        )}

        {!loading && !error && (
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <MedicalServicesIcon sx={{ color: '#0288D1' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recetas
              </Typography>
            </Box>

            {recetas && recetas.length > 0 ? (
              <Box>
                {recetas.map((receta) => (
                  <Accordion key={receta.id} sx={{ mb: 1 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ bgcolor: '#f8f9fa' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                        <Typography sx={{ fontWeight: 600, flex: 1 }}>
                          {receta.doctor_remitente ?? 'Doctor no especificado'}
                        </Typography>
                        <Chip
                          label={receta.activo ? 'Activa' : 'Inactiva'}
                          color={receta.activo ? 'success' : 'default'}
                          size="small"
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Hospital:</strong> {receta.hospital_remitente || '-'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Código:</strong> {receta.codigo || '-'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          <strong>Fecha:</strong>{' '}
                          {receta.fecha
                            ? new Date(receta.fecha).toLocaleDateString('es-EC', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })
                            : '-'}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                          Dosis recetadas:
                        </Typography>
                        <RecetaDosisList dosis={receta.dosis} isLoading={loading} />
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                No se encontraron recetas para este paciente.
              </Typography>
            )}
          </Paper>
        )}
      </Container>
    </Box>
  );
}