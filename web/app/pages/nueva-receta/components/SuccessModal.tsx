import { Box, CircularProgress, Fade, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type SuccessModalProps = {
  open: boolean;
};

export default function SuccessModal({ open }: SuccessModalProps) {
  if (!open) return null;

  return (
    <Fade in={open}>
      <>
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 9998,
          }}
        />
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            bgcolor: 'background.paper',
            p: 5,
            borderRadius: 3,
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
            textAlign: 'center',
            minWidth: 320,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 56, color: 'success.main', mb: 1.5 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
            ¡Receta creada!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Redireccionando al dashboard…
          </Typography>
          <CircularProgress size={20} sx={{ mt: 2, color: 'success.main' }} />
        </Box>
      </>
    </Fade>
  );
}
