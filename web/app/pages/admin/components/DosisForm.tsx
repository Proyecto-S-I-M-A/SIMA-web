import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useCreateDosisMutation } from '~/lib/api/QueryDosis';
import type { DosisCreation } from '~/types/Dosis';
import { DosisCreationSchema } from '~/types/Dosis';

export function DosisForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<DosisCreation>({
    resolver: zodResolver(DosisCreationSchema),
    defaultValues: {
      id_medicamento: null,
      id_receta: undefined,
      cantidad: null,
      instrucciones: '',
    },
  });

  const { mutate, isPending, isError, error, isSuccess } = useCreateDosisMutation();

  const onSubmit = (data: DosisCreation) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {isSuccess && (
          <Typography variant="body2" sx={{ color: 'success.main' }}>
            Dosis creada exitosamente
          </Typography>
        )}

        {isError && (
          <Typography variant="body2" sx={{ color: 'error.main' }}>
            {error instanceof Error ? error.message : 'Error al crear dosis'}
          </Typography>
        )}

        <Controller
          name="id_medicamento"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="ID del medicamento"
              type="number"
              variant="outlined"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
            />
          )}
        />

        <Controller
          name="id_receta"
          control={control}
          render={({ field }) => (
            <>
              {errors.id_receta && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.id_receta.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="ID de la receta"
                type="number"
                variant="outlined"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
              />
            </>
          )}
        />

        <Controller
          name="cantidad"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Cantidad"
              type="number"
              variant="outlined"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
            />
          )}
        />

        <Controller
          name="instrucciones"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Instrucciones"
              placeholder="Tomar después de las comidas"
              variant="outlined"
              multiline
              rows={3}
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{ mt: 2, bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1b5e20' } }}
        >
          {isPending ? 'Creando…' : 'Crear Dosis'}
        </Button>
      </Stack>
    </form>
  );
}
