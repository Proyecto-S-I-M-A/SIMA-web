import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, TextField, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import type { AccesoCreation } from '~/types/Acceso';
import { AccesoCreationSchema } from '~/types/Acceso';

export function AccesoForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(AccesoCreationSchema),
    defaultValues: {
      usuario: '',
      tipo: '',
      correo: '',
      activo: true,
    },
  });

  const onSubmit = (data: AccesoCreation) => {
    console.log('Acceso data:', data);
    // Aquí irá la lógica de backend con fetch
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <>
              {errors.id && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.id.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="id"
                placeholder="UUID"
                variant="outlined"
                {...field}
              />
            </>
          )}
        />
        <Controller
          name="usuario"
          control={control}
          render={({ field }) => (
            <>
              {errors.usuario && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.usuario.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Usuario"
                placeholder="juan_perez"
                variant="outlined"
                {...field}
              />
            </>
          )}
        />

        <Controller
          name="tipo"
          control={control}
          render={({ field }) => (
            <>
              {errors.tipo && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.tipo.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Tipo"
                placeholder="admin, cliente, doctor, etc..."
                variant="outlined"
                {...field}
              />
            </>
          )}
        />

        <Controller
          name="correo"
          control={control}
          render={({ field }) => (
            <>
              {errors.correo && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.correo.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Correo"
                type="email"
                placeholder="usuario@correo.com"
                variant="outlined"
                {...field}
              />
            </>
          )}
        />

        <Controller
          name="activo"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value || false} />}
              label="Activo"
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1b5e20' } }}
        >
          Crear Acceso
        </Button>
      </Stack>
    </form>
  );
}
