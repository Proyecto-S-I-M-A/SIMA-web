import { Box, InputLabel, Paper, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { RecetasDosisCreation } from '~/types/receta';
import AutoFilledField from './AutoFilledField';
import SectionHeader from './SectionHeader';

type DoctorSectionProps = {
  control: Control<RecetasDosisCreation>;
  errors: FieldErrors<RecetasDosisCreation>;
  doctorName: string;
  doctorRuc: string;
};

export default function DoctorSection({
  control,
  errors,
  doctorName,
  doctorRuc,
}: DoctorSectionProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
      <SectionHeader
        icon={<PersonIcon fontSize="small" />}
        title="Datos del Doctor"
        subtitle="Información del médico que emite la receta"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
        }}
      >
        <AutoFilledField label="Doctor responsable" value={doctorName} />
        <AutoFilledField label="RUC del doctor" value={doctorRuc} />

        <Box>
          <InputLabel sx={{ fontSize: 13, fontWeight: 600, color: 'text.secondary', mb: 0.8 }}>
            Hospital / Clínica
          </InputLabel>
          <Controller
            name="Receta.hospital_remitente"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                placeholder="Nombre del hospital remitente"
                error={!!errors.Receta?.hospital_remitente}
                helperText={errors.Receta?.hospital_remitente?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <LocalHospitalIcon sx={{ mr: 1, color: 'text.disabled', fontSize: 18 }} />
                    ),
                  },
                }}
              />
            )}
          />
        </Box>

        <Box>
          <InputLabel sx={{ fontSize: 13, fontWeight: 600, color: 'text.secondary', mb: 0.8 }}>
            Teléfono del hospital
          </InputLabel>
          <Controller
            name="Receta.telefono_hospital"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                placeholder="Ej: +507 300-0000"
                error={!!errors.Receta?.telefono_hospital}
                helperText={errors.Receta?.telefono_hospital?.message}
              />
            )}
          />
        </Box>
      </Box>
    </Paper>
  );
}
