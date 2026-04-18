import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, TextField, Typography, Button } from '@mui/material';
import type { UsuarioCreation } from '~/types/Usuario';
import { UsuarioCreationSchema } from '~/types/Usuario';
import { useCreateUsuarioMutation } from '~/lib/Query';

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
      password: '',
      usuario: '',
      ruc_doctor: '',
      especialidades: '',
    },
  });

  const { mutate, isPending, isError, error, isSuccess } = useCreateUsuarioMutation();

  const onSubmit = (data: UsuarioCreation) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
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
          name="password"
          control={control}
          render={({ field }) => (
            <>
              {errors.password && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.password.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                variant="outlined"
                {...field}
              />
            </>
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

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{ mt: 2, bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1b5e20' } }}
        >
          {isPending ? 'Creando…' : 'Crear Usuario'}
        </Button>
      </Stack>
    </form>
  );
}
