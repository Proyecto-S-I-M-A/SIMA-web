import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
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
import { useGetRecetas, useUpdateRecetaMutation } from '~/lib/api/QueryReceta';
import type { RecetaUpdate } from '~/types/receta';
import type { Receta } from '~/types/receta';

function formatDateForInput(value: string | Date | null | undefined) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

export function RecetaTable() {
  const { data: recetas, isLoading, isError, error } = useGetRecetas('all');
  const updateMutation = useUpdateRecetaMutation();
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<RecetaUpdate>({});

  const handleRowClick = (receta: Receta) => {
    if (updatingId) return;

    setEditingId(receta.id);
    setEditForm({
      id_cliente: receta.id_cliente,
      doctor_remitente: receta.doctor_remitente ?? '',
      ruc_doctor_remitente: receta.ruc_doctor_remitente ?? '',
      hospital_remitente: receta.hospital_remitente ?? '',
      telefono_hospital: receta.telefono_hospital ?? '',
      correo: receta.correo ?? '',
      codigo: receta.codigo,
      fecha: receta.fecha ? new Date(receta.fecha) : null,
      estado: (receta.estado as "Pendiente" | "Retirado" | "Vencido" | null | undefined) ?? null,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleFieldChange = (field: keyof RecetaUpdate, value: string | number | Date | null) => {
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
    return <Alert severity="error">Error al cargar recetas: {error?.message}</Alert>;
  }

  if (!recetas || recetas.length === 0) {
    return <Typography>No hay recetas registradas</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3, overflow: 'auto' }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>ID Cliente</strong></TableCell>
            <TableCell><strong>Doctor</strong></TableCell>
            <TableCell><strong>RUC Doctor</strong></TableCell>
            <TableCell><strong>Hospital</strong></TableCell>
            <TableCell><strong>Teléfono</strong></TableCell>
            <TableCell><strong>Correo</strong></TableCell>
            <TableCell><strong>Código</strong></TableCell>
            <TableCell><strong>Fecha</strong></TableCell>
            <TableCell><strong>Estado</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recetas.map((receta) => (
            <TableRow
              key={receta.id}
              hover
              onClick={() => handleRowClick(receta)}
              sx={{ cursor: updatingId ? 'wait' : 'pointer' }}
            >
              <TableCell>{receta.id}</TableCell>
              <TableCell>
                {editingId === receta.id ? (
                  <TextField
                    value={editForm.id_cliente ?? ''}
                    size="small"
                    type="number"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('id_cliente', Number(e.target.value))}
                  />
                ) : (
                  receta.id_cliente
                )}
              </TableCell>
              <TableCell>
                {editingId === receta.id ? (
                  <TextField
                    value={editForm.doctor_remitente ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('doctor_remitente', e.target.value || null)}
                  />
                ) : (
                  receta.doctor_remitente || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === receta.id ? (
                  <TextField
                    value={editForm.ruc_doctor_remitente ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('ruc_doctor_remitente', e.target.value || null)}
                  />
                ) : (
                  receta.ruc_doctor_remitente || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === receta.id ? (
                  <TextField
                    value={editForm.hospital_remitente ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('hospital_remitente', e.target.value || null)}
                  />
                ) : (
                  receta.hospital_remitente || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === receta.id ? (
                  <TextField
                    value={editForm.telefono_hospital ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('telefono_hospital', e.target.value || null)}
                  />
                ) : (
                  receta.telefono_hospital || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === receta.id ? (
                  <TextField
                    value={editForm.correo ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('correo', e.target.value || null)}
                  />
                ) : (
                  receta.correo || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === receta.id ? (
                  <TextField
                    value={editForm.codigo ?? ''}
                    size="small"
                    type="number"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('codigo', e.target.value === '' ? null : Number(e.target.value))}
                  />
                ) : (
                  receta.codigo ?? 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === receta.id ? (
                  <TextField
                    value={formatDateForInput(editForm.fecha)}
                    size="small"
                    type="date"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('fecha', e.target.value ? new Date(e.target.value) : null)}
                  />
                ) : (
                  formatDateForInput(receta.fecha) || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === receta.id ? (
                  <Select
                    value={formatDateForInput(editForm.estado)}
                    size="small"
                    type='text'
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('estado', e.target.value ? e.target.value as "Pendiente" | "Retirado" | "Vencido" : null)}
                  >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="Retirado">Retirado</MenuItem>
                    <MenuItem value="Vencido">Vencido</MenuItem>
                  </Select>
                ) : (
                  receta.estado || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === receta.id ? (
                  <Box sx={{ display: 'flex', gap: 1 }} onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSaveEdit(receta.id)}
                      disabled={updatingId === receta.id}
                    >
                      {updatingId === receta.id ? <CircularProgress size={20} /> : 'Guardar'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleCancelEdit}
                      disabled={updatingId === receta.id}
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
                      handleRowClick(receta);
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
