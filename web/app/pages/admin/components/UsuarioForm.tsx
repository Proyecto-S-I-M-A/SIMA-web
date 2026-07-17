import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, TextField, Typography, Button } from '@mui/material';
import type { UsuarioCreation } from '~/types/Usuario';
import { UsuarioCreationSchema } from '~/types/Usuario';
import { useCreateUsuarioMutation } from '~/lib/api/QueryUsuario';
import RefreshQuery from '~/lib/RefreshQuery';
import CustomeSelectQuery from '~/components/CustomeSelectQuery';

export function UsuarioForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<UsuarioCreation>({
    resolver: zodResolver(UsuarioCreationSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      rol: '',
      id_acceso: '',
      ruc_doctor: '',
    },
  });

  const { mutate, isPending, isError, error, isSuccess } = useCreateUsuarioMutation();

  const onSubmit = (data: UsuarioCreation) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
    RefreshQuery(['usuarios']);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {isSuccess && (
          <Typography variant="body2" sx={{ color: 'success.main' }}>
            Usuario creado exitosamente
          </Typography>
        )}

        {isError && (
          <Typography variant="body2" sx={{ color: 'error.main' }}>
            {error instanceof Error ? error.message : 'Error al crear usuario'}
          </Typography>
        )}

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
          name="rol"
          control={control}
          render={({ field }) => (
            <>
              {errors.rol && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.rol.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Rol"
                placeholder="admin, doctor, farmacéutico, etc..."
                variant="outlined"
                {...field}
              />
            </>
          )}
        />

        <Controller
          name="ruc_doctor"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="RUC Doctor"
              placeholder="123456789"
              variant="outlined"
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="especialidades"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Especialidades"
              placeholder="Cardiología, Pediatría, etc..."
              variant="outlined"
              multiline
              rows={3}
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="id_acceso"
          control={control}
          render={({ field }) => (
          <CustomeSelectQuery
                endpoint='accesos'
                labelID='acceso'
                label="ID Acceso"
                labelSelector='id'
                secondaryLabelSelector='correo'
                valueSelector='id'
                value={field.value ?? ''}
                onChange={field.onChange}
              />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{ mt: 2, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
        >
          {isPending ? 'Creando…' : 'Crear Usuario'}
        </Button>
      </Stack>
    </form>
  );
}
