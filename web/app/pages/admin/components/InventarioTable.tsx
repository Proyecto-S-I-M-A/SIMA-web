import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useGetInventarios, useUpdateInventarioMutation } from '~/lib/api/QueryInventario';
import type { InventarioUpdate } from '~/types/Inventario';

export function InventarioTable() {
  const { data: inventarios, isLoading, isError, error } = useGetInventarios('all');
  const updateMutation = useUpdateInventarioMutation();
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<InventarioUpdate>({});

  const handleRowClick = (inventario: {
    id: number;
    nombre_medicamento: string | null;
    marca: string | null;
    precio: number | null;
    resetado: boolean | null;
  }) => {
    if (updatingId) return;

    setEditingId(inventario.id);
    setEditForm({
      nombre_medicamento: inventario.nombre_medicamento ?? '',
      marca: inventario.marca ?? '',
      precio: inventario.precio,
      resetado: inventario.resetado ?? false,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleFieldChange = (field: keyof InventarioUpdate, value: string | boolean | number | null) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async (id: number) => {
    setUpdatingId(id);
    try {
      await updateMutation.mutateAsync({ id, body: editForm });
      handleCancelEdit();
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Error al cargar inventario: {error?.message}</Alert>;
  }

  if (!inventarios || inventarios.length === 0) {
    return <Typography>No hay inventario registrado</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3, overflow: 'auto' }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Medicamento</strong></TableCell>
            <TableCell><strong>Marca</strong></TableCell>
            <TableCell><strong>Precio</strong></TableCell>
            <TableCell><strong>Resetado</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventarios.map((inventario) => (
            <TableRow
              key={inventario.id}
              hover
              onClick={() => handleRowClick(inventario)}
              sx={{ cursor: updatingId ? 'wait' : 'pointer' }}
            >
              <TableCell>{inventario.id}</TableCell>
              <TableCell>
                {editingId === inventario.id ? (
                  <TextField
                    value={editForm.nombre_medicamento ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('nombre_medicamento', e.target.value || null)}
                  />
                ) : (
                  inventario.nombre_medicamento || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === inventario.id ? (
                  <TextField
                    value={editForm.marca ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('marca', e.target.value || null)}
                  />
                ) : (
                  inventario.marca || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === inventario.id ? (
                  <TextField
                    value={editForm.precio ?? ''}
                    size="small"
                    type="number"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleFieldChange('precio', e.target.value === '' ? null : Number(e.target.value))
                    }
                  />
                ) : (
                  inventario.precio ?? 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === inventario.id ? (
                  <TextField
                    select
                    value={String(editForm.resetado ?? false)}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('resetado', e.target.value === 'true')}
                  >
                    <MenuItem value="true">Sí</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>
                ) : (
                  inventario.resetado ? 'Sí' : 'No'
                )}
              </TableCell>
              <TableCell>
                {editingId === inventario.id ? (
                  <Box sx={{ display: 'flex', gap: 1 }} onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSaveEdit(inventario.id)}
                      disabled={updatingId === inventario.id}
                    >
                      {updatingId === inventario.id ? <CircularProgress size={20} /> : 'Guardar'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleCancelEdit}
                      disabled={updatingId === inventario.id}
                    >
                      Cancelar
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(inventario);
                    }}
                  >
                    Editar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}