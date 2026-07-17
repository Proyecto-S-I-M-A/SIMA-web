import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useCreateInventarioMutation } from '~/lib/api/QueryInventario';
import type { InventarioCreation } from '~/types/Inventario';
import { InventarioCreationSchema } from '~/types/Inventario';

export function InventarioForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<InventarioCreation>({
    resolver: zodResolver(InventarioCreationSchema),
    defaultValues: {
      nombre_medicamento: '',
      marca: '',
      precio: null,
      resetado: false,
    },
  });

  const { mutate, isPending, isError, error, isSuccess } = useCreateInventarioMutation();

  const onSubmit = (data: InventarioCreation) => {
    console.log(data)
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {isSuccess && (
          <Typography variant="body2" sx={{ color: 'success.main' }}>
            Inventario creado exitosamente
          </Typography>
        )}

        {isError && (
          <Typography variant="body2" sx={{ color: 'error.main' }}>
            {error instanceof Error ? error.message : 'Error al crear inventario'}
          </Typography>
        )}

        <Controller
          name="nombre_medicamento"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Nombre del medicamento"
              placeholder="Acetaminofén"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="marca"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Marca"
              placeholder="Genérico"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="precio"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Precio"
              type="number"
              variant="outlined"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
            />
          )}
        />

        <Controller
          name="resetado"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value ?? false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Resetado"
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{ mt: 2, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
        >
          {isPending ? 'Creando…' : 'Crear Inventario'}
        </Button>
      </Stack>
    </form>
  );
}