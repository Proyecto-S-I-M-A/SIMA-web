import { useSearchParams, useNavigate } from 'react-router';
import { useGetRecetasByCedula } from '~/lib/api/QueryReceta';
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
  MenuItem,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useState, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navbar } from '../dashboard/components/Navbar';

const DosisSchema = z.object({
  id_medicamento: z.number().nullable().optional(),
  cantidad: z.number().nullable().optional(),
  instrucciones: z.string().nullable().optional(),
});

const RecetaFormSchema = z.object({
  id_cliente: z.number(),
  doctor_remitente: z.string().min(1, 'El nombre del doctor es requerido'),
  ruc_doctor_remitente: z.string().nullable().optional(),
  hospital_remitente: z.string().min(1, 'El hospital es requerido'),
  telefono_hospital: z.string().nullable().optional(),
  codigo: z.number().nullable().optional(),
  fecha: z.date().nullable().optional(),
  Dosis: z.array(DosisSchema).min(1, 'Al menos una medicina es requerida'),
});

type RecetaFormData = z.infer<typeof RecetaFormSchema>;

function DosisField({ index, control, errors, inventarios, onRemove }: {
  index: number;
  control: any;
  errors: any;
  inventarios: any[];
  onRemove: () => void;
}) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Medicina #{index + 1}
        </Typography>
        <IconButton onClick={onRemove} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
        <Box>
          <Controller
            name={`Dosis.${index}.id_medicamento`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Medicina"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors?.Dosis?.[index]?.id_medicamento}
                helperText={errors?.Dosis?.[index]?.id_medicamento?.message}
              >
                <MenuItem value="">Seleccionar medicina</MenuItem>
                {inventarios?.map((inv: any) => (
                  <MenuItem key={inv.id} value={inv.id}>
                    {inv.nombre_medicamento} - {inv.marca}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
        <Box>
          <Controller
            name={`Dosis.${index}.cantidad`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Cantidad"
                type="number"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                error={!!errors?.Dosis?.[index]?.cantidad}
                helperText={errors?.Dosis?.[index]?.cantidad?.message}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name={`Dosis.${index}.instrucciones`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Instrucciones"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors?.Dosis?.[index]?.instrucciones}
                helperText={errors?.Dosis?.[index]?.instrucciones?.message}
              />
            )}
          />
        </Box>
      </Box>
    </Paper>
  );
}

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
  } = useForm<RecetaFormData>({
    resolver: zodResolver(RecetaFormSchema),
    defaultValues: {
      id_cliente: 0,
      doctor_remitente: '',
      ruc_doctor_remitente: '',
      hospital_remitente: '',
      telefono_hospital: '',
      codigo: Math.floor(Math.random() * 90000) + 10000,
      fecha: new Date(),
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
      setValue('id_cliente', Number(cliente.id));
    }
  }, [cliente, setValue]);

  useEffect(() => {
    if (usuario && usuario.length > 0) {
      const doc = usuario[0];
      setValue('doctor_remitente', `${doc.nombre} ${doc.apellido}`.trim());
      setValue('ruc_doctor_remitente', doc.ruc_doctor || '');
    }
  }, [usuario, setValue]);

  const onSubmit = async (data: RecetaFormData) => {
    try {
      await createRecetaMutation.mutateAsync({
        Receta: {
          ...data,
          codigo: data.codigo || Math.floor(Math.random() * 90000) + 10000,
          fecha: new Date(),
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
                  name="doctor_remitente"
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
                  name="ruc_doctor_remitente"
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
                  name="hospital_remitente"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Hospital"
                      error={!!errors.hospital_remitente}
                      helperText={errors.hospital_remitente?.message}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="telefono_hospital"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Teléfono Hospital"
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="codigo"
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