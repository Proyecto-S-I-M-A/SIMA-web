import { useSearchParams, useNavigate } from 'react-router';
import { useGetClienteByCedula } from '~/lib/api/QueryCliente';
import { useGetUsuario } from '~/lib/api/QueryUsuario';
import { useCreateRecetaWithDosisMutation } from '~/lib/api/QueryReceta';
import { useGetInventario } from '~/lib/api/QueryInventario';
import GetSession from '~/lib/GetSession';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Alert,
  InputLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { RecetasDosisSchema, type RecetasDosisCreation } from '~/types/receta';
import { useState, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navbar } from '../dashboard/components/Navbar';
import DosisField from './components/DosisField';

export default function NuevaReceta() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cedula = searchParams.get('cedula') || '';
  const sessionID = GetSession() || '';
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    data: cliente,
    isLoading: loadingCliente,
  } = useGetClienteByCedula(cedula, !!cedula);

  const {
    data: usuario,
    isLoading: loadingUsuario,
  } = useGetUsuario(sessionID, !!sessionID);

  const {
    data: inventarios,
    isLoading: loadingInventario,
  } = useGetInventario('all', true);

  const createRecetaMutation = useCreateRecetaWithDosisMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<RecetasDosisCreation>({
    resolver: zodResolver(RecetasDosisSchema),
    defaultValues: {
      Receta: {
        id_cliente: 0,
        doctor_remitente: '',
        ruc_doctor_remitente: '',
        hospital_remitente: '',
        telefono_hospital: '',
        codigo: Math.floor(Math.random() * 90000) + 10000,
        fecha: new Date(),
        estado: 'Pendiente',
      },
      Dosis: [
        {
          id_medicamento: null,
          cantidad: null,
          instrucciones: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'Dosis',
  });

  useEffect(() => {
    if (cliente) {
      setValue('Receta.id_cliente', Number(cliente.id));
    }
  }, [cliente, setValue]);

  useEffect(() => {
    if (usuario && usuario.length > 0) {
      const doc = usuario[0];
      setValue('Receta.doctor_remitente', `${doc.nombre} ${doc.apellido}`.trim());
      setValue('Receta.ruc_doctor_remitente', doc.ruc_doctor || '');
    }
  }, [usuario, setValue]);

  const onSubmit = async (data: RecetasDosisCreation) => {
    try {
      await createRecetaMutation.mutateAsync({
        Receta: {
          ...data.Receta,
        },
        Dosis: data.Dosis.map((d) => ({
          ...d,
          cantidad: d.cantidad ? Number(d.cantidad) : null,
        })),
      });
      setSuccessMessage(true);
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      console.error('Error al crear receta:', error);
    }
  };

  if (loadingCliente || loadingUsuario || loadingInventario) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Navbar rawSearch="" onSearchChange={() => {}} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!cedula || !cliente) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Navbar rawSearch="" onSearchChange={() => {}} />
        <Container maxWidth="lg" sx={{ pt: 2 }}>
          <Alert severity="warning">
            No se seleccionó un paciente. Seleccione uno desde el dashboard.
          </Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/home')}
            sx={{ mt: 2 }}
          >
            Volver al dashboard
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Navbar rawSearch="" onSearchChange={() => {}} />
      <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/home')}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Nueva Receta
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Paciente:</strong> {cliente.nombre} {cliente.apellido}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Cédula:</strong> {cliente.cedula}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Datos del Doctor
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
              <Box>
                <Controller
                  name="Receta.doctor_remitente"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Doctor"
                      disabled
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="Receta.ruc_doctor_remitente"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="RUC Doctor"
                      disabled
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="Receta.hospital_remitente"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Hospital"
                      error={!!errors.Receta?.hospital_remitente}
                      helperText={errors.Receta?.hospital_remitente?.message}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="Receta.telefono_hospital"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Teléfono Hospital"
                      error={!!errors.Receta?.telefono_hospital}
                      helperText={errors.Receta?.telefono_hospital?.message}
                    />
                  )}
                />
              </Box>
              <Box>
                <InputLabel sx={{ mb: 1 }}>Expiración de la receta</InputLabel>
                <Controller
                  name="Receta.fecha"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="date"
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="Receta.codigo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Código"
                      type="number"
                    />
                  )}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Medicinas Recetadas
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() =>
                  append({
                    id_medicamento: null,
                    cantidad: null,
                    instrucciones: '',
                  })
                }
              >
                Agregar Medicina
              </Button>
            </Box>

            {errors.Dosis && typeof errors.Dosis === 'object' && 'root' in errors.Dosis && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.Dosis.root?.message || 'Al menos una medicina es requerida'}
              </Alert>
            )}

            {fields.map((field, index) => (
              <DosisField
                key={field.id}
                index={index}
                control={control}
                errors={errors}
                inventarios={inventarios ?? []}
                onRemove={() => remove(index)}
              />
            ))}

            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={createRecetaMutation.isPending}
              sx={{ mt: 2 }}
            >
              {createRecetaMutation.isPending ? 'Guardando...' : 'Guardar Receta'}
            </Button>
          </form>
        </Paper>
      </Container>

      {successMessage && (
        <>
          <Box sx={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 9998,
          }} />
          <Box sx={{ 
            position: 'fixed', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
            minWidth: 300
          }}>
            <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 'bold', mb: 2 }}>
              Receta creada exitosamente
            </Typography>
            <Typography variant="body1">
              Redireccionando...
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}