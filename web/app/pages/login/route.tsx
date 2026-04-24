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
import { LoginSchema } from '~/types/login';
import { useLogin } from './hook/useLogin';
import { useLoginMutation } from '~/lib/Query';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useUpdateAccesoActivoMutation } from '~/lib/api/QueryAcceso';

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment, IconButton } from '@mui/material';

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

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      SaveSession(sessionID ?? '');
      UpdateAccess({
        id: sessionID ?? '',
        body: { ultimo_acceso: new Date() },
      });
      navigate('/home');
    }
  }, [isSuccess, navigate]);
  const onSubmit = async (formData: LoginData) => {
    try {
      const result = await mutateAsync(formData);
      if (result?.session?.access_token && result?.session?.refresh_token) {
        SaveOnCokie(result.session.access_token, result.session.refresh_token);
        setSessionID(result.session.user);
      }
    } catch {
      // Errors are surfaced via react-query state (isError/error)
    }
  };

  return (
    <Box
        sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        background: 'linear-gradient(270deg, #ffffff, #759cf2, #356be8)',

        backgroundSize: '200% 600%',
        animation: 'gradientMove 6s ease infinite',

        '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
  
    >
      <Container
        component="main"
        maxWidth="sm"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            width: '90%',
            py: 2,
            backgroundColor: 'gradient(135deg, #626e73 0%, #FFFFFF 0%)',
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
              background: '#FFFFFF',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Logo/Title */}
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0095ff 0%, #1e00ff 100%)',
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
              sx={{
                mb: 0.5,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width: '80%',
                height: 'auto',

                margin: '18px auto 10px auto',
              }}
            >
              Farma Express
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}
            >
              Excelencia en el cuidado de tu salud.
            </Typography>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Correo Electrónico"
                      type="email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f9f9f9',
                        },
                        '& .MuiInputLabel-root': {
                          fontWeight: 500,
                        },
                      }}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Contraseña"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f9f9f9',
                        },
                        '& .MuiInputLabel-root': {
                          fontWeight: 500,
                        },
                      }}
                    />
                  )}
                />
                {isError && (
                  <Typography variant="body2" sx={{ color: 'error.main' }}>
                    {error instanceof Error
                      ? error.message
                      : 'Error desconocido'}
                  </Typography>
                )}
                <ButtonVariant type="submit" variant="Primary" size="medium">
                  Iniciar Sesión
                </ButtonVariant>

                <Stack spacing={4}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
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
    </Box>
  );
}
