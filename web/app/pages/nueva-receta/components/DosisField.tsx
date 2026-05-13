import { Paper, Box, Typography, IconButton, TextField } from '@mui/material';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import type { RecetasDosisCreation } from '~/types/receta';
import CustomeSelectQuery from '~/components/CustomeSelectQuery';

type DosisFieldProps = {
  index: number;
  control: Control<RecetasDosisCreation>;
  errors: FieldErrors<RecetasDosisCreation>;
  onRemove: () => void;
};

export default function DosisField({
  index,
  control,
  errors,
  onRemove,
}: DosisFieldProps) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Medicina #{index + 1}
        </Typography>
        <IconButton onClick={onRemove} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
        <Box>
          <Controller
            name={`Dosis.${index}.id_medicamento`}
            control={control}
            render={({ field }) => (
              <CustomeSelectQuery
                endpoint="inventario"
                labelSelector="nombre_medicamento"
                secondaryLabelSelector="marca"
                valueSelector="id"
                label="Medicina"
                value={field.value ?? ''}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  field.onChange(nextValue ? Number(nextValue) : null);
                }}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name={`Dosis.${index}.cantidad`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Cantidad"
                type="number"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                error={!!errors?.Dosis?.[index]?.cantidad}
                helperText={errors?.Dosis?.[index]?.cantidad?.message}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name={`Dosis.${index}.instrucciones`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Instrucciones"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors?.Dosis?.[index]?.instrucciones}
                helperText={errors?.Dosis?.[index]?.instrucciones?.message}
              />
            )}
          />
        </Box>
      </Box>
    </Paper>
  );
}