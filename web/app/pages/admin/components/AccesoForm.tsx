import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, TextField, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import type { AccesoCreation } from '~/types/Acceso';
import { AccesoCreationSchema } from '~/types/Acceso';
import { useCreateAccesoMutation } from '~/lib/api/QueryAcceso';
import RefreshQuery from '~/lib/RefreshQuery';

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

  const { mutate, isPending, isError, error, isSuccess, data } = useCreateAccesoMutation();

  const onSubmit = (data: AccesoCreation) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
    RefreshQuery(['accesos']); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {isSuccess && (
          <Typography variant="body2" sx={{ color: 'success.main' }}>
            {data?.message ?? 'Acceso creado exitosamente'}
          </Typography>
        )}

        {isError && (
          <Typography variant="body2" sx={{ color: 'error.main' }}>
            {error instanceof Error ? error.message : 'Error al crear acceso'}
          </Typography>
        )}

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
                label="ID supabase"
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
          disabled={isPending}
          sx={{ mt: 2, bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1b5e20' } }}
        >
          {isPending ? 'Creando…' : 'Crear Acceso'}
        </Button>
      </Stack>
    </form>
  );
}
