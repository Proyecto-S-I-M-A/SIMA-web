import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, TextField, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import type { ClienteCreation } from '~/types/cliente';
import { ClienteCreationSchema } from '~/types/cliente';

export function ClienteForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(ClienteCreationSchema),
  });

  const onSubmit = (data: ClienteCreation) => {
    console.log('Cliente data:', data);
    // Aquí irá la lógica de backend con fetch
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="nombre"
          control={control}
          render={({ field }) => (
            <>
              {errors.nombre && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.nombre.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Nombre"
                placeholder="Juan"
                variant="outlined"
                {...field}
              />
            </>
          )}
        />

        <Controller
          name="apellido"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Apellido"
              placeholder="Pérez"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="cedula"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Cédula"
              placeholder="123456789"
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
              placeholder="cliente@correo.com"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="sexo"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Sexo"
              placeholder="M / F"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="asegurado"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value || false} />}
              label="¿Es asegurado?"
            />
          )}
        />

        <Controller
          name="id_acceso"
          control={control}
          render={({ field }) => (
            <>
              {errors.id_acceso && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.id_acceso.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="ID de Acceso"
                type="number"
                variant="outlined"
                {...field}
                value={field.value || 0}
              />
            </>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1b5e20' } }}
        >
          Crear Cliente
        </Button>
      </Stack>
    </form>
  );
}
