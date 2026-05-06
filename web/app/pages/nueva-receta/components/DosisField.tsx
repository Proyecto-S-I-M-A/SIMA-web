import  { Paper, Box, Typography, IconButton, TextField, MenuItem } from "@mui/material";
import  { Controller } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';


export default function DosisField({ index, control, errors, inventarios, onRemove }: {
  index: number;
  control: any;
  errors: any;
  inventarios: any[];
  onRemove: () => void;
}) {
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
              <TextField
                {...field}
                select
                fullWidth
                label="Medicina"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors?.Dosis?.[index]?.id_medicamento}
                helperText={errors?.Dosis?.[index]?.id_medicamento?.message}
              >
                <MenuItem value="">Seleccionar medicina</MenuItem>
                {inventarios?.map((inv: any) => (
                  <MenuItem key={inv.id} value={inv.id}>
                    {inv.nombre_medicamento} - {inv.marca}
                  </MenuItem>
                ))}
              </TextField>
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