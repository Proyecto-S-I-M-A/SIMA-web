import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import type { Control, FieldArrayWithId, FieldErrors } from 'react-hook-form';
import type { RecetasDosisCreation } from '~/types/receta';
import DosisField from './DosisField';

type MedicamentosSectionProps = {
  control: Control<RecetasDosisCreation>;
  errors: FieldErrors<RecetasDosisCreation>;
  fields: FieldArrayWithId<RecetasDosisCreation, 'Dosis', 'id'>[];
  onAppend: () => void;
  onRemove: (index: number) => void;
  isPending: boolean;
  submitError: string | null;
};

export default function MedicamentosSection({
  control,
  errors,
  fields,
  onAppend,
  onRemove,
  isPending,
  submitError,
}: MedicamentosSectionProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
      {/* Encabezado de sección + botón agregar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            pb: 1.5,
            borderBottom: '2px solid',
            borderColor: 'warning.main',
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: 'warning.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <MedicalServicesIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Medicamentos Recetados
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Agrega uno o más medicamentos con sus indicaciones
            </Typography>
          </Box>
        </Box>

        <Tooltip title="Agregar otro medicamento">
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            size="small"
            onClick={onAppend}
            sx={{ ml: 2, flexShrink: 0, borderRadius: 2 }}
          >
            Agregar
          </Button>
        </Tooltip>
      </Box>

      {/* Error global de dosis */}
      {errors.Dosis && typeof errors.Dosis === 'object' && 'root' in errors.Dosis && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {errors.Dosis.root?.message || 'Al menos una medicina es requerida'}
        </Alert>
      )}

      {/* Lista de medicamentos */}
      {fields.map((field, index) => (
        <DosisField
          key={field.id}
          index={index}
          control={control}
          errors={errors}
          onRemove={() => onRemove(index)}
        />
      ))}

      <Divider sx={{ mt: 1, mb: 2 }} />

      {/* Error de submit */}
      {submitError && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {submitError}
        </Alert>
      )}

      {/* Botón guardar */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={
            isPending ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />
          }
          disabled={isPending}
          sx={{
            px: 4,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(2,136,209,0.35)',
            '&:hover': { boxShadow: '0 6px 16px rgba(2,136,209,0.45)' },
          }}
        >
          {isPending ? 'Guardando…' : 'Guardar Receta'}
        </Button>
      </Box>
    </Paper>
  );
}
