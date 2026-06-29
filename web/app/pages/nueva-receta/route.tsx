import { useSearchParams, useNavigate } from 'react-router';
import { useGetClienteByCedula } from '~/lib/api/QueryCliente';
import { useGetUsuario } from '~/lib/api/QueryUsuario';
import { useCreateRecetaWithDosisMutation } from '~/lib/api/QueryReceta';
import { useSendPushNotificationMutation } from '~/lib/api/QueryNotification';
import { useGetInventario } from '~/lib/api/QueryInventario';
import { useProtectedRoute } from '~/lib/useProtectedRoute';
import { GetSession } from '~/lib/GetSession';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RecetasDosisSchema, type RecetasDosisCreation } from '~/types/receta';
import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navbar } from '../dashboard/components/Navbar';
import PatientBanner from './components/PatientBanner';
import DoctorSection from './components/DoctorSection';
import RecetaDataSection from './components/RecetaDataSection';
import MedicamentosSection from './components/MedicamentosSection';
import SuccessModal from './components/SuccessModal';

export default function NuevaReceta() {
  useProtectedRoute();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cedula = searchParams.get('cedula') || '';
  const sessionID = GetSession() || '';

  const [successMessage, setSuccessMessage] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: cliente, isLoading: loadingCliente } = useGetClienteByCedula(cedula, !!cedula);
  const { data: usuario, isLoading: loadingUsuario } = useGetUsuario(sessionID, !!sessionID);
  // Precarga el caché que consume CustomeSelectQuery en DosisField
  const { isLoading: loadingInventario } = useGetInventario('all', true);

  const createRecetaMutation = useCreateRecetaWithDosisMutation();
  const sendNotification = useSendPushNotificationMutation();

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
      Dosis: [{ id_medicamento: null, cantidad: null, instrucciones: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'Dosis' });

  useEffect(() => {
    if (cliente) setValue('Receta.id_cliente', Number(cliente.id));
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
      setSubmitError(null);
      await createRecetaMutation.mutateAsync({
        Receta: { ...data.Receta },
        Dosis: data.Dosis.map((d) => ({
          ...d,
          cantidad: d.cantidad ? Number(d.cantidad) : null,
        })),
      });

      // Fire-and-forget: no bloquea el flujo si la notificacion falla
      if (cliente?.id_acceso) {
        sendNotification.mutate({
          id_acceso: cliente.id_acceso,
          type: 'nueva-receta',
          data: { doctor: doctorName },
        });
      }

      setSuccessMessage(true);
      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      console.error('Error al crear receta:', error);
      setSubmitError(error instanceof Error ? error.message : 'No se pudo crear la receta');
    }
  };

  /* ─── Loading ─── */
  if (loadingCliente || loadingUsuario || loadingInventario) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar rawSearch="" onSearchChange={() => {}} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 12, gap: 2 }}>
          <CircularProgress size={48} />
          <Typography variant="body2" color="text.secondary">
            Cargando información…
          </Typography>
        </Box>
      </Box>
    );
  }

  /* ─── Sin paciente ─── */
  if (!cedula || !cliente) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar rawSearch="" onSearchChange={() => {}} />
        <Container maxWidth="sm" sx={{ pt: 6 }}>
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            No se seleccionó un paciente. Seleccione uno desde el dashboard.
          </Alert>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/home')} sx={{ mt: 2 }}>
            Volver al dashboard
          </Button>
        </Container>
      </Box>
    );
  }

  const doctorName =
    usuario && usuario.length > 0
      ? `${usuario[0].nombre} ${usuario[0].apellido}`.trim()
      : '';
  const doctorRuc = usuario && usuario.length > 0 ? usuario[0].ruc_doctor || '' : '';

  /* ─── Main ─── */
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar rawSearch="" onSearchChange={() => {}} />

      <PatientBanner cliente={cliente} onBack={() => navigate('/home')} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <DoctorSection
              control={control}
              errors={errors}
              doctorName={doctorName}
              doctorRuc={doctorRuc}
            />
            <RecetaDataSection control={control} errors={errors} />
            <MedicamentosSection
              control={control}
              errors={errors}
              fields={fields}
              onAppend={() => append({ id_medicamento: null, cantidad: null, instrucciones: '' })}
              onRemove={remove}
              isPending={createRecetaMutation.isPending}
              submitError={submitError}
            />
          </Stack>
        </form>
      </Container>

      <SuccessModal open={successMessage} />
    </Box>
  );
}
