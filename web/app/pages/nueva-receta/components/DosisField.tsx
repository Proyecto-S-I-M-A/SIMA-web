import {
  Box,
  Typography,
  IconButton,
  TextField,
  Chip,
  Divider,
  Tooltip,
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MedicationIcon from '@mui/icons-material/Medication';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { RecetasDosisCreation } from '~/types/receta';
import CustomeSelectQuery from '~/components/CustomeSelectQuery';

type DosisFieldProps = {
  index: number;
  control: Control<RecetasDosisCreation>;
  errors: FieldErrors<RecetasDosisCreation>;
  onRemove: () => void;
};

export default function DosisField({ index, control, errors, onRemove }: DosisFieldProps) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        mb: 2,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: '0 4px 16px rgba(2, 136, 209, 0.12)' },
      }}
    >
      {/* Header de la dosis */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.2,
          bgcolor: 'rgba(2, 136, 209, 0.06)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {index + 1}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <MedicationIcon sx={{ fontSize: 18, color: 'primary.main' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Medicamento #{index + 1}
            </Typography>
          </Box>
        </Box>

        <Tooltip title="Eliminar medicamento">
          <IconButton
            onClick={onRemove}
            size="small"
            sx={{
              color: 'error.main',
              '&:hover': { bgcolor: 'error.light', color: 'white' },
              transition: 'all 0.2s',
            }}
          >
            <DeleteOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
            gap: 2,
            alignItems: "end",
            mb: 2,
          }}
        >
          {/* Selector de medicamento */}
          <Controller
            name={`Dosis.${index}.id_medicamento`}
            control={control}
            render={({ field }) => (
              <CustomeSelectQuery
                endpoint="inventario"
                labelSelector="nombre_medicamento"
                secondaryLabelSelector="marca"
                valueSelector="id"
                label="Medicamento"
                value={field.value ?? ''}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  field.onChange(nextValue ? Number(nextValue) : null);
                }}
              />
            )}
          />

          {/* Cantidad */}
          <Controller
            name={`Dosis.${index}.cantidad`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Cantidad"
                type="number"
                size="small"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                error={!!errors?.Dosis?.[index]?.cantidad}
                helperText={errors?.Dosis?.[index]?.cantidad?.message}
                slotProps={{ htmlInput: { min: 1 } }}
              />
            )}
          />
        </Box>

        <Divider sx={{ mb: 2 }}>
          <Chip label="Instrucciones" size="small" sx={{ fontSize: 11, color: 'text.secondary' }} />
        </Divider>

        {/* Instrucciones */}
        <Controller
          name={`Dosis.${index}.instrucciones`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Instrucciones de uso"
              multiline
              minRows={2}
              size="small"
              placeholder="Ej: Tomar 1 tableta cada 8 horas con agua..."
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!errors?.Dosis?.[index]?.instrucciones}
              helperText={errors?.Dosis?.[index]?.instrucciones?.message}
            />
          )}
        />
      </Box>
    </Box>
  );
}