import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  useCreateMaquinaInventarioMutation,
  useDeleteMaquinaInventarioMutation,
  useGetMaquinaInventarios,
  useUpdateMaquinaInventarioMutation,
} from '~/lib/api/QueryMaquinaInventario';
import { useGetMaquinas } from '~/lib/api/QueryMaquina';
import { useGetInventarios } from '~/lib/api/QueryInventario';
import type { Inventario, MaquinaInventarioCreation } from '~/types/Inventario';
import { MaquinaInventarioCreationSchema } from '~/types/Inventario';
import type { Maquina } from '~/types/Maquina';
import CustomeSelectQuery from '~/components/CustomeSelectQuery';

const FormSchema = MaquinaInventarioCreationSchema.extend({
  id_maquina: MaquinaInventarioCreationSchema.shape.id_maquina
    .int('Selecciona una maquina')
    .positive('Selecciona una maquina'),
  id_inventario: MaquinaInventarioCreationSchema.shape.id_inventario
    .int('Selecciona un medicamento')
    .positive('Selecciona un medicamento'),
});

export function MaquinaInventarioManager() {
  const { data: relaciones, isLoading, isError, error } = useGetMaquinaInventarios('all');
  const { data: maquinas } = useGetMaquinas('all');
  const { data: inventarios } = useGetInventarios('all');

  const createMutation = useCreateMaquinaInventarioMutation();
  const updateMutation = useUpdateMaquinaInventarioMutation();
  const deleteMutation = useDeleteMaquinaInventarioMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MaquinaInventarioCreation>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      codigo_maquina: '',
      id_maquina: 0,
      id_inventario: 0,
      cantidad: null,
    },
  });
  const maquinasByCode = useMemo(() => {
    return new Map((maquinas ?? []).map((m) => [m.id_maquina, m]));
  }, [maquinas]);

  const inventariosById = useMemo(() => {
    return new Map((inventarios ?? []).map((i) => [i.id, i]));
  }, [inventarios]);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const resetForm = () => {
    reset({
      codigo_maquina: '',
      id_maquina: 0,
      id_inventario: 0,
      cantidad: null,
    });
    setEditingId(null);
  };

  const onSubmit = async (data: MaquinaInventarioCreation) => {
    const body: MaquinaInventarioCreation = {
      ...data,
      id_maquina: Number(data.id_maquina),
      id_inventario: Number(data.id_inventario),
    };

    try {
      if (editingId === null) {
        await createMutation.mutateAsync(body);
      } else {
        await updateMutation.mutateAsync({ id: editingId, body });
      }
      resetForm();
    } catch (error){
    }
  };

  const handleEdit = (item: {
    codigo_maquina: string;
    id: number;
    id_maquina: number | string;
    id_inventario: number;
    cantidad?: number | null;
  }) => {
    const nextIdMaquina = Number(item.id_maquina);
    setEditingId(item.id);
    reset({
      codigo_maquina: item.codigo_maquina || String(item.id_maquina ?? ''),
      id_maquina: Number.isNaN(nextIdMaquina) ? 0 : nextIdMaquina,
      id_inventario: item.id_inventario,
      cantidad: item.cantidad ?? null,
    });
  };

  const getMedicamentoLabel = (item: Inventario | undefined) => {
    if (!item) return 'N/A';
    const nombre = item.nombre_medicamento ?? 'Sin nombre';
    const marca = item.marca ? ` (${item.marca})` : '';
    return `${nombre}${marca}`;
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Asignacion de inventario por maquina
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <Stack spacing={1} sx={{ width: '100%' }}>
              <Controller
                name="id_maquina"
                control={control}
                render={({ field }) => (
                  <CustomeSelectQuery
                    onChange={(event) => {
                      const nextValue = Number(event.target.value) || 0;
                      const selected = (maquinas ?? []).find(
                        (maquina) => Number(maquina.id) === nextValue,
                      );
                      field.onChange(nextValue);
                      setValue('codigo_maquina', selected?.id_maquina ?? '', {
                        shouldValidate: true,
                      });
                    }}
                    value={field.value}
                    label='Id Maquina'
                    labelID='select-maquina'
                    endpoint='maquinas'
                    labelSelector='id_maquina'
                    secondaryLabelSelector='ubicacion'
                    valueSelector='id'
                  />
                )}
              />
              {errors.id_maquina && (
                <Typography variant="caption" sx={{ color: 'error.main' }}>
                  {errors.id_maquina.message}
                </Typography>
              )}
              <Controller
                name="codigo_maquina"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Codigo maquina"
                    value={field.value || ''}
                    disabled
                  />
                )}
              />
            </Stack>

            <Controller
              name="id_inventario"
              control={control}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ width: '100%' }}>
                    <CustomeSelectQuery
                      onChange={(event) => field.onChange(Number(event.target.value) || 0)}
                      value={field.value}
                      label='Id medicamento'
                      labelID='select-medicamento'
                      endpoint='inventario'
                      labelSelector='nombre_medicamento'
                      secondaryLabelSelector='marca'
                      valueSelector='id'
                    />
                    {errors.id_inventario && (
                      <Typography variant="caption" sx={{ color: 'error.main' }}>
                        {errors.id_inventario.message}
                      </Typography>
                    )}
                  </Stack>
                )
              }}
            />
            <Controller
              name="cantidad"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Cantidad"
                  type="number"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? null : Number(e.target.value))
                  }
                  error={!!errors.cantidad}
                  helperText={errors.cantidad?.message}
                />
              )}
            />

            <Stack direction="row" spacing={1}>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={18} /> : editingId === null ? 'Asignar' : 'Guardar'}
              </Button>
              {editingId !== null && (
                <Button variant="outlined" onClick={resetForm} disabled={isSubmitting}>
                  Cancelar
                </Button>
              )}
            </Stack>
          </Stack>

          {(createMutation.isError || updateMutation.isError) && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {(createMutation.error as Error | undefined)?.message ||
                (updateMutation.error as Error | undefined)?.message ||
                'No se pudo guardar la asignacion'}
            </Alert>
          )}
        </form>
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
                    <TableCell>{item.codigo_maquina}</TableCell>
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
