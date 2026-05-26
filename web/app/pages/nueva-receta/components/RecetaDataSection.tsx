import { Box, InputLabel, Paper, TextField } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { RecetasDosisCreation } from '~/types/receta';
import SectionHeader from './SectionHeader';

type RecetaDataSectionProps = {
  control: Control<RecetasDosisCreation>;
  errors: FieldErrors<RecetasDosisCreation>;
};

export default function RecetaDataSection({ control, errors }: RecetaDataSectionProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
      <SectionHeader
        icon={<BadgeIcon fontSize="small" />}
        title="Datos de la Receta"
        subtitle="Código identificador y fecha de vencimiento"
        color="secondary.main"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
        }}
      >
        <Box>
          <InputLabel sx={{ fontSize: 13, fontWeight: 600, color: 'text.secondary', mb: 0.8 }}>
            Fecha de expiración
          </InputLabel>
          <Controller
            name="Receta.fecha"
            control={control}
            render={({ field }) => {
              const value = field.value
                ? new Date(field.value).toISOString().slice(0, 10)
                : '';
              return (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="date"
                  value={value}
                  onChange={(e) =>
                    field.onChange(e.target.value ? new Date(e.target.value) : null)
                  }
                  error={!!errors.Receta?.fecha}
                  helperText={errors.Receta?.fecha?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <CalendarMonthIcon sx={{ mr: 1, color: 'text.disabled', fontSize: 18 }} />
                      ),
                    },
                  }}
                />
              );
            }}
          />
        </Box>

        <Box>
          <InputLabel sx={{ fontSize: 13, fontWeight: 600, color: 'text.secondary', mb: 0.8 }}>
            Código de receta
          </InputLabel>
          <Controller
            name="Receta.codigo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                type="number"
                placeholder="Código único"
                error={!!errors.Receta?.codigo}
                helperText={errors.Receta?.codigo?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <TagIcon sx={{ mr: 1, color: 'text.disabled', fontSize: 18 }} />
                    ),
                  },
                }}
              />
            )}
          />
        </Box>
      </Box>
    </Paper>
  );
}
