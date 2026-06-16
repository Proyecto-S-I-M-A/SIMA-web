import { Box, Chip, InputLabel, TextField } from '@mui/material';

type AutoFilledFieldProps = {
  label: string;
  value: string;
};

export default function AutoFilledField({ label, value }: AutoFilledFieldProps) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
        <InputLabel sx={{ fontSize: 13, fontWeight: 600, color: 'text.secondary', mb: 0 }}>
          {label}
        </InputLabel>
        <Chip label="Auto" size="small" color="info" sx={{ height: 18, fontSize: 10 }} />
      </Box>
      <TextField
        fullWidth
        size="small"
        value={value}
        disabled
        sx={{ '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'rgba(0,0,0,0.6)' } }}
      />
    </Box>
  );
}
