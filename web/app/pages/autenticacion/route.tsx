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

        background: 'linear-gradient(270deg, #ffffff, #759cf2, #356be8)',

        backgroundSize: '200% 600%',
        animation: 'gradientMove 17s ease infinite',

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
