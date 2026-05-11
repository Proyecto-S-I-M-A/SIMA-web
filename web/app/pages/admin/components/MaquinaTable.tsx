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
import { useGetMaquinas, useUpdateMaquinaMutation } from '~/lib/api/QueryMaquina';
import type { MaquinaUpdate } from '~/types/Maquina';

export function MaquinaTable() {
  const { data: maquinas, isLoading, isError, error } = useGetMaquinas('all');
  const updateMutation = useUpdateMaquinaMutation();
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<MaquinaUpdate>({});

  const handleRowClick = (maquina: {
    id: number;
    id_maquina: string;
    ubicacion: string | null;
    activo: boolean | null;
    latitud: number | null;
    longitud: number | null;
  }) => {
    if (updatingId) return;

    setEditingId(maquina.id);
    setEditForm({
      id_maquina: maquina.id_maquina,
      ubicacion: maquina.ubicacion ?? '',
      activo: maquina.activo ?? true,
      latitud: maquina.latitud,
      longitud: maquina.longitud,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleFieldChange = (field: keyof MaquinaUpdate, value: string | boolean | number | null) => {
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
    return <Alert severity="error">Error al cargar máquinas: {error?.message}</Alert>;
  }

  if (!maquinas || maquinas.length === 0) {
    return <Typography>No hay máquinas registradas</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3, overflow: 'auto' }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Código</strong></TableCell>
            <TableCell><strong>Ubicación</strong></TableCell>
            <TableCell><strong>Latitud</strong></TableCell>
            <TableCell><strong>Longitud</strong></TableCell>
            <TableCell><strong>Activa</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maquinas.map((maquina) => (
            <TableRow
              key={maquina.id}
              hover
              onClick={() => handleRowClick(maquina)}
              sx={{ cursor: updatingId ? 'wait' : 'pointer' }}
            >
              <TableCell>{maquina.id}</TableCell>
              <TableCell>
                {editingId === maquina.id ? (
                  <TextField
                    value={editForm.id_maquina ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('id_maquina', e.target.value)}
                  />
                ) : (
                  maquina.id_maquina
                )}
              </TableCell>
              <TableCell>
                {editingId === maquina.id ? (
                  <TextField
                    value={editForm.ubicacion ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('ubicacion', e.target.value || null)}
                  />
                ) : (
                  maquina.ubicacion || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === maquina.id ? (
                  <TextField
                    value={editForm.latitud ?? ''}
                    size="small"
                    type="number"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleFieldChange('latitud', e.target.value === '' ? null : Number(e.target.value))
                    }
                  />
                ) : (
                  maquina.latitud ?? 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === maquina.id ? (
                  <TextField
                    value={editForm.longitud ?? ''}
                    size="small"
                    type="number"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleFieldChange('longitud', e.target.value === '' ? null : Number(e.target.value))
                    }
                  />
                ) : (
                  maquina.longitud ?? 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === maquina.id ? (
                  <TextField
                    select
                    value={String(editForm.activo ?? true)}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('activo', e.target.value === 'true')}
                  >
                    <MenuItem value="true">Sí</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>
                ) : (
                  maquina.activo ? 'Sí' : 'No'
                )}
              </TableCell>
              <TableCell>
                {editingId === maquina.id ? (
                  <Box sx={{ display: 'flex', gap: 1 }} onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSaveEdit(maquina.id)}
                      disabled={updatingId === maquina.id}
                    >
                      {updatingId === maquina.id ? <CircularProgress size={20} /> : 'Guardar'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleCancelEdit}
                      disabled={updatingId === maquina.id}
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
                      handleRowClick(maquina);
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