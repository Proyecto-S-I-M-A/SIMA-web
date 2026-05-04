import { useSearchParams } from 'react-router';
import { useGetRecetasByCedula } from '~/lib/api/QueryReceta';
import { useGetClienteByCedula } from '~/lib/api/QueryCliente';
import { useGetDosisByReceta } from '~/lib/api/QueryDosis';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

function RecetaDosisList({ idReceta }: { idReceta: number }) {
  const { data: dosis, isLoading } = useGetDosisByReceta(String(idReceta), !!idReceta);

  if (isLoading) {
    return <CircularProgress size={20} />;
  }

  if (!dosis || dosis.length === 0) {
    return <Typography variant="body2">No hay dosis registradas.</Typography>;
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: '#f8f9fa' }}>
            <TableCell sx={{ fontWeight: 600 }}>ID Medicamento</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Cantidad</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Instrucciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dosis.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.id_medicamento || '-'}</TableCell>
              <TableCell>{d.cantidad || '-'}</TableCell>
              <TableCell>{d.instrucciones || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
    error: errorRecetas,
  } = useGetRecetasByCedula(cedula, !!cedula);

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
            Error al cargar el historial: {error.message}
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
                          {receta.doctor_remitente || 'Doctor no especificado'}
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
                        <RecetaDosisList idReceta={receta.id} />
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