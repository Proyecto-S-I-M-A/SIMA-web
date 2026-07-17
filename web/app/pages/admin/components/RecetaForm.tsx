import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useCreateRecetaMutation } from '~/lib/api/QueryReceta';
import type { RecetaCreation } from '~/types/receta';
import { RecetaCreationSchema } from '~/types/receta';

export function RecetaForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(RecetaCreationSchema),
    defaultValues: {
      id_cliente: undefined,
      doctor_remitente: '',
      ruc_doctor_remitente: '',
      hospital_remitente: '',
      telefono_hospital: '',
      correo: '',
      codigo: null,
      fecha: null,
    },
  });

  const { mutate, isPending, isError, error, isSuccess } = useCreateRecetaMutation();

  const onSubmit = (data: RecetaCreation) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {isSuccess && (
          <Typography variant="body2" sx={{ color: 'success.main' }}>
            Receta creada exitosamente
          </Typography>
        )}

        {isError && (
          <Typography variant="body2" sx={{ color: 'error.main' }}>
            {error instanceof Error ? error.message : 'Error al crear receta'}
          </Typography>
        )}

        <Controller
          name="id_cliente"
          control={control}
          render={({ field }) => (
            <>
              {errors.id_cliente && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.id_cliente.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="ID del cliente"
                type="number"
                variant="outlined"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
              />
            </>
          )}
        />

        <Controller
          name="doctor_remitente"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Doctor remitente"
              placeholder="Dr. Juan Pérez"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="ruc_doctor_remitente"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="RUC doctor remitente"
              placeholder="123456789"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="hospital_remitente"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Hospital remitente"
              placeholder="Hospital Central"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="telefono_hospital"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Teléfono del hospital"
              placeholder="0999999999"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="correo"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Correo"
              type="email"
              placeholder="doctor@hospital.com"
              variant="outlined"
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value || null)}
            />
          )}
        />

        <Controller
          name="codigo"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Código"
              type="number"
              variant="outlined"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
            />
          )}
        />

        <Controller
          name="fecha"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Fecha"
              type="date"
              variant="outlined"
              value={field.value ? new Date(field.value).toISOString().slice(0, 10) : ''}
              onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{ mt: 2, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
        >
          {isPending ? 'Creando…' : 'Crear Receta'}
        </Button>
      </Stack>
    </form>
  );
}
