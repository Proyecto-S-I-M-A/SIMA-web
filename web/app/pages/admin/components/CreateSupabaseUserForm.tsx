import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, TextField, Typography, Button } from '@mui/material';
import type { LoginData } from '~/types/login';
import { LoginSchema } from '~/types/login';
import { useSignupMutation } from '~/lib/Query';
import { useCreateAccesoMutation } from '~/lib/api/QueryAcceso';

export function CreateSupabaseUserForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: signup, error, isError } = useSignupMutation();
  const { mutateAsync: CreateAccess } = useCreateAccesoMutation();
  
  const onSubmit = (data: LoginData) => {
    console.log('Create Supabase User data:', data);
    signup(data, {
      onSuccess: (response) => {
        console.log('Usuario creado exitosamente:', response);
        CreateAccess({
          id: response.session?.user.id || "",
          correo: response.session?.user.email || "",
          activo: true,
        });
      },
      onError: (error) => {
        console.error('Error al crear usuario:', error);
      }
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              {errors.email && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.email.message}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Email"
                placeholder="usuario@example.com"
                variant="outlined"
                type="email"
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
                placeholder="••••••••"
                variant="outlined"
                type="password"
                {...field}
              />
            </>
          )}
        />
        {isError && (
          <Typography variant="body2" sx={{ color: 'error.main' }}>
            {error.message}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Crear Usuario
        </Button>
      </Stack>
    </form>
  );
}
