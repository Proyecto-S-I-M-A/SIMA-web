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
import { useState } from 'react';
import { OTPInput } from 'input-otp';
import ButtonVariant from '~/components/ButtonVariant';

export default function Autenticacion() {
  const [otp, setOtp] = useState('');
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
            backgroundColor: 'gradient(135deg, #626e73 0%, #FFFFFF 100%)',
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

            <Typography
              variant="body2"
              sx={{
                color: 'text.tertiary',
                mb: 3,
                textAlign: 'center',
                width: '86%',
              }}
            >
              Se envió un código de 6 dígitos a tu correo. Ingrésalo para
              continuar.
            </Typography>
            <form action="">
              <OTPInput
                maxLength={6}
                value={otp}
                onChange={setOtp}
                render={({ slots }) => (
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      justifyContent: 'center',
                      margin: '30px auto 30px auto',
                    }}
                  >
                    {slots.map((slot, index) => (
                      <Box
                        key={index}
                        component="input"
                        {...slot}
                        value={slot.char ?? ''}
                        sx={(theme) => ({
                          width: 48,
                          height: 52,
                          textAlign: 'center',
                          fontSize: '18px',
                          borderRadius: 2,
                          border: '1px solid #ccc',
                          backgroundColor: '#f5f7fa',
                          outline: 'none',
                          transition: '0.2s',

                          ...(slot.char && {
                            borderColor: theme.palette.primary.main,
                          }),

                          ...(slot.isActive && {
                            borderColor: theme.palette.primary.main,
                            boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
                          }),
                        })}
                      />
                    ))}
                  </Box>
                )}
              />

              <ButtonVariant type="submit" variant="Primary" size="medium">
                Verificar
              </ButtonVariant>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
