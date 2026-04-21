import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useCreateMaquinaMutation } from '~/lib/api/QueryMaquina';
import type { MaquinaCreation } from '~/types/Maquina';
import { MaquinaCreationSchema } from '~/types/Maquina';

export function MaquinaForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<MaquinaCreation>({
    resolver: zodResolver(MaquinaCreationSchema),
    defaultValues: {
      ubicacion: '',
      activo: true,
      latitud: null,
      longitud: null,
    },
  });

  const { mutate, isPending, isError, error, isSuccess } = useCreateMaquinaMutation();

  const onSubmit = (data: MaquinaCreation) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {isSuccess && (
          <Typography variant="body2" sx={{ color: 'success.main' }}>
            Máquina creada exitosamente
          </Typography>
        )}

        {isError && (
          <Typography variant="body2" sx={{ color: 'error.main' }}>
            {error instanceof Error ? error.message : 'Error al crear máquina'}
          </Typography>
        )}

        <Controller
          name="ubicacion"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Ubicación"
              placeholder="Tienda central"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="latitud"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Latitud"
              type="number"
              variant="outlined"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
            />
          )}
        />

        <Controller
          name="longitud"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Longitud"
              type="number"
              variant="outlined"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
            />
          )}
        />

        <Controller
          name="activo"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value ?? false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Activa"
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{ mt: 2, bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1b5e20' } }}
        >
          {isPending ? 'Creando…' : 'Crear Máquina'}
        </Button>
      </Stack>
    </form>
  );
}