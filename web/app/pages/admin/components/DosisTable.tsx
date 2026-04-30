import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import { useGetDosis, useUpdateDosisMutation } from '~/lib/api/QueryDosis';
import type { DosisUpdate } from '~/types/Dosis';

export function DosisTable() {
  const { data: dosis, isLoading, isError, error } = useGetDosis('all');
  const updateMutation = useUpdateDosisMutation();
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<DosisUpdate>({});

  const handleRowClick = (dosisItem: {
    id: number;
    id_medicamento: number | null;
    id_receta: number;
    cantidad: number | null;
    instrucciones: string | null;
  }) => {
    if (updatingId) return;

    setEditingId(dosisItem.id);
    setEditForm({
      id_medicamento: dosisItem.id_medicamento,
      id_receta: dosisItem.id_receta,
      cantidad: dosisItem.cantidad,
      instrucciones: dosisItem.instrucciones ?? '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleFieldChange = (field: keyof DosisUpdate, value: string | number | null) => {
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
    return <Alert severity="error">Error al cargar dosis: {error?.message}</Alert>;
  }

  if (!dosis || dosis.length === 0) {
    return <Typography>No hay dosis registradas</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3, overflow: 'auto' }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>ID Medicamento</strong></TableCell>
            <TableCell><strong>ID Receta</strong></TableCell>
            <TableCell><strong>Cantidad</strong></TableCell>
            <TableCell><strong>Instrucciones</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dosis.map((dosisItem) => (
            <TableRow
              key={dosisItem.id}
              hover
              onClick={() => handleRowClick(dosisItem)}
              sx={{ cursor: updatingId ? 'wait' : 'pointer' }}
            >
              <TableCell>{dosisItem.id}</TableCell>
              <TableCell>
                {editingId === dosisItem.id ? (
                  <TextField
                    value={editForm.id_medicamento ?? ''}
                    size="small"
                    type="number"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('id_medicamento', e.target.value === '' ? null : Number(e.target.value))}
                  />
                ) : (
                  dosisItem.id_medicamento ?? 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === dosisItem.id ? (
                  <TextField
                    value={editForm.id_receta ?? ''}
                    size="small"
                    type="number"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('id_receta', Number(e.target.value))}
                  />
                ) : (
                  dosisItem.id_receta
                )}
              </TableCell>
              <TableCell>
                {editingId === dosisItem.id ? (
                  <TextField
                    value={editForm.cantidad ?? ''}
                    size="small"
                    type="number"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('cantidad', e.target.value === '' ? null : Number(e.target.value))}
                  />
                ) : (
                  dosisItem.cantidad ?? 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === dosisItem.id ? (
                  <TextField
                    value={editForm.instrucciones ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('instrucciones', e.target.value || null)}
                  />
                ) : (
                  dosisItem.instrucciones || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === dosisItem.id ? (
                  <Box sx={{ display: 'flex', gap: 1 }} onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSaveEdit(dosisItem.id)}
                      disabled={updatingId === dosisItem.id}
                    >
                      {updatingId === dosisItem.id ? <CircularProgress size={20} /> : 'Guardar'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleCancelEdit}
                      disabled={updatingId === dosisItem.id}
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
                      handleRowClick(dosisItem);
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
