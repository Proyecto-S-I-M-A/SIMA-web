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
import {
  useCreateAccesoMutation,
  useUpdateAccesoActivoMutation,
} from '~/lib/api/QueryAcceso';

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
        setSessionID(result.session.user.id);
      }
    } catch {
      console.error('Error en el inicio de sesión');
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
        overflow: 'hidden',
        background:
          'linear-gradient(270deg, #edf1f4, #a1c4fd, #c2e9fb, #ffffff)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 12s ease infinite',

        '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },

        '@keyframes floatY': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
          '100%': { transform: 'translateY(0px)' },
        },

        '@keyframes floatXY': {
          '0%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(20px, -30px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },

        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: 0.6,
          zIndex: 0,
        },

        '&::before': {
          background: '#4facfe',
          top: '40%',
          right: '10%',
          animation: 'floatXY 10s ease-in-out infinite',
        },

        '&::after': {
          background: '#43e97b',
          top: '50%',
          right: '25%',
          animation: 'floatY 12s ease-in-out infinite',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: 0.5,
          background: '#a1c4fd',
          top: '10%',
          left: '5%',
          zIndex: 0,

          animation: 'floatXY 14s ease-in-out infinite reverse',
        }}
      />
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

              width: '100%',

              position: 'relative',
              zIndex: 1,
              backdropFilter: 'blur(20px)',
              background: 'rgba(255,255,255,0.75)',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
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
                FE
              </Typography>
            </Box>

            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 0.5,
                fontWeight: 600,
                textAlign: 'center',
                width: '80%',
                margin: '18px auto 10px auto',
              }}
            >
              FarmaExpress
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
