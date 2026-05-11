import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import {
  useCreateMaquinaInventarioMutation,
  useDeleteMaquinaInventarioMutation,
  useGetMaquinaInventarios,
  useUpdateMaquinaInventarioMutation,
} from '~/lib/api/QueryMaquinaInventario';
import { useGetMaquinas } from '~/lib/api/QueryMaquina';
import { useGetInventarios } from '~/lib/api/QueryInventario';
import type { Inventario, MaquinaInventarioCreation } from '~/types/Inventario';
import type { Maquina } from '~/types/Maquina';

type FormState = {
  codigo_maquina: string;
  id_maquina: number | '';
  id_inventario: number | '';
  cantidad: number | null;
};

const INITIAL_FORM: FormState = {
    codigo_maquina: '',
  id_maquina: '',
  id_inventario: '',
  cantidad: null,
};

export function MaquinaInventarioManager() {
  const { data: relaciones, isLoading, isError, error } = useGetMaquinaInventarios('all');
  const { data: maquinas } = useGetMaquinas('all');
  const { data: inventarios } = useGetInventarios('all');

  const createMutation = useCreateMaquinaInventarioMutation();
  const updateMutation = useUpdateMaquinaInventarioMutation();
  const deleteMutation = useDeleteMaquinaInventarioMutation();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const maquinasByCode = useMemo(() => {
    return new Map((maquinas ?? []).map((m) => [m.id_maquina, m]));
  }, [maquinas]);

  const inventariosById = useMemo(() => {
    return new Map((inventarios ?? []).map((i) => [i.id, i]));
  }, [inventarios]);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
    setFormError(null);
  };

  const validateForm = (current: FormState) => {
    if (!current.id_maquina) return 'Selecciona una maquina';
    if (current.id_inventario === '') return 'Selecciona un medicamento';
    return null;
  };

  const buildBody = (current: FormState): MaquinaInventarioCreation => ({
    codigo_maquina: current.codigo_maquina,
    id_maquina: Number(current.id_maquina),
    id_inventario: Number(current.id_inventario),
    cantidad: current.cantidad,
  });

  const handleSubmit = async () => {
    const validationError = validateForm(form);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const body = buildBody(form);

    try {
      if (editingId === null) {
        await createMutation.mutateAsync(body);
      } else {
        await updateMutation.mutateAsync({ id: editingId, body });
      }
      resetForm();
    } catch {
      // La UI ya muestra mensajes de error desde React Query.
    }
  };

  const handleEdit = (item: {codigo_maquina: string; id: number; id_maquina: number; id_inventario: number; cantidad?: number | null }) => {
    setEditingId(item.id);
    setForm({
      codigo_maquina: item.codigo_maquina,
      id_maquina: item.id_maquina,
      id_inventario: item.id_inventario,
      cantidad: item.cantidad ?? null,
    });
    setFormError(null);
  };

  const getMedicamentoLabel = (item: Inventario | undefined) => {
    if (!item) return 'N/A';
    const nombre = item.nombre_medicamento ?? 'Sin nombre';
    const marca = item.marca ? ` (${item.marca})` : '';
    return `${nombre}${marca}`;
  };

  const getMaquinaLabel = (item: Maquina | undefined, fallbackCode: string) => {
    if (!item) return fallbackCode;
    const ubicacion = item.ubicacion ? ` - ${item.ubicacion}` : '';
    return `${item.id_maquina}${ubicacion}`;
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Asignacion de inventario por maquina
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
          <TextField
            select
            fullWidth
            label="Maquina"
            value={form.id_maquina}
            onChange={(e) => setForm((prev) => ({ ...prev, id_maquina: e.target.value, }))}
          >
            {(maquinas ?? []).map((maquina) => (
              <MenuItem key={maquina.id} value={maquina.id_maquina}>
                {getMaquinaLabel(maquina, maquina.id_maquina)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Medicamento"
            value={form.id_inventario}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                id_inventario: e.target.value === '' ? '' : Number(e.target.value),
              }))
            }
          >
            {(inventarios ?? []).map((inventario) => (
              <MenuItem key={inventario.id} value={inventario.id}>
                {getMedicamentoLabel(inventario)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Cantidad"
            type="number"
            value={form.cantidad ?? ''}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                cantidad: e.target.value === '' ? null : Number(e.target.value),
              }))
            }
          />

          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={18} /> : editingId === null ? 'Asignar' : 'Guardar'}
            </Button>
            {editingId !== null && (
              <Button variant="outlined" onClick={resetForm} disabled={isSubmitting}>
                Cancelar
              </Button>
            )}
          </Stack>
        </Stack>

        {formError && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {formError}
          </Alert>
        )}

        {(createMutation.isError || updateMutation.isError) && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {(createMutation.error as Error | undefined)?.message ||
              (updateMutation.error as Error | undefined)?.message ||
              'No se pudo guardar la asignacion'}
          </Alert>
        )}
      </Paper>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Alert severity="error">Error al cargar inventario por maquina: {error?.message}</Alert>
      ) : !relaciones || relaciones.length === 0 ? (
        <Typography>No hay relaciones registradas</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ overflow: 'auto' }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Maquina</strong></TableCell>
                <TableCell><strong>Medicamento</strong></TableCell>
                <TableCell><strong>Cantidad</strong></TableCell>
                <TableCell><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relaciones.map((item) => {
                const maquina = maquinasByCode.get(item.id_maquina);
                const inventario = inventariosById.get(item.id_inventario);

                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{getMaquinaLabel(maquina, item.id_maquina)}</TableCell>
                    <TableCell>{getMedicamentoLabel(inventario)}</TableCell>
                    <TableCell>{item.cantidad ?? 'N/A'}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined" onClick={() => handleEdit(item)}>
                          Editar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          disabled={deleteMutation.isPending}
                          onClick={() => deleteMutation.mutate(item.id)}
                        >
                          Eliminar
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
