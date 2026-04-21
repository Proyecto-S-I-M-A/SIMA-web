import {
  Box,
  Container,
  TextField,
  Typography,
  Paper,
  Stack,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import ButtonVariant from '~/components/ButtonVariant';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginData } from '~/types/login';
import { LoginSchema} from '~/types/login';
import { useLogin } from './hook/useLogin';
import { useLoginMutation} from '~/lib/Query';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useCreateAccesoMutation, useUpdateAccesoActivoMutation } from '~/lib/api/QueryAcceso';

export default function Login() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const navigate = useNavigate();
  const { SaveOnCokie, SaveSession } = useLogin();  
  const { mutateAsync, isError, isSuccess, error } = useLoginMutation();
  const { mutateAsync: UpdateAccess } = useUpdateAccesoActivoMutation();
  const [sessionID, setSessionID] = useState<string | null>(null);
    useEffect(() => {
    if (isSuccess) {
      SaveSession(sessionID ?? '');
      UpdateAccess({id: sessionID ?? '', body: {ultimo_acceso: new Date()}});
      navigate("/home");
    }
  }, [isSuccess, navigate]);
  const onSubmit = async (formData: LoginData) => {
    try {
      const result = await mutateAsync(formData);
      if (result?.session?.access_token && result?.session?.refresh_token) {
        SaveOnCokie(result.session.access_token, result.session.refresh_token);
        setSessionID(result.session.user.id);
      }
    } catch {
      // Errors are surfaced via react-query state (isError/error)
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 2,
          backgroundColor: 'gradient(135deg, #d7ff6b 0%, #FFFFFF 100%)',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            width: '100%',
          }}
        >
          {/* Logo/Title */}
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
              FT
            </Typography>
          </Box>

          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 0.5, fontWeight: 700 }}
          >
            FarmaTic
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}
          >
            Sistema de Gestión Farmacéutica
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    {errors.email && (
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', mb: 1 }}
                      >
                        {errors.email.message}
                      </Typography>
                    )}
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      type="email"
                      placeholder="tu@correo.com"
                      variant="outlined"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </>
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    {errors.password && (
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', mb: 1 }}
                      >
                        {errors.password.message}
                      </Typography>
                    )}
                    <TextField
                      fullWidth
                      label="Contraseña"
                      type="password"
                      placeholder="••••••••"
                      variant="outlined"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </>
                )}
              />
              {isError && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {error instanceof Error ? error.message : 'Error desconocido'}
                </Typography>
              )}
              <ButtonVariant type="submit" variant="Primary" size="medium">
                Iniciar Sesión
              </ButtonVariant>
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ¿No tienes cuenta?
                </Typography>
                <Typography
                  variant="body2"
                  sx={(theme) => ({ color: theme.palette.primary.main })}
                >
                  Tienes que contactar al administrador para crear una cuenta
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
