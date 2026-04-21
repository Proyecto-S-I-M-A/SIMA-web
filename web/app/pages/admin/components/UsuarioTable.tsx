import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { useGetUsuarios, useUpdateUsuarioMutation } from '~/lib/api/QueryUsuario';
import type { UsuarioUpdate } from '~/types/Usuario';

export function UsuarioTable() {
  const { data: usuarios, isLoading, isError, error } = useGetUsuarios('all');
  const updateMutation = useUpdateUsuarioMutation();
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<UsuarioUpdate>({});

  const handleRowClick = (usuario: {
    id: number;
    nombre: string | null;
    apellido: string | null;
    rol: string | null;
    id_acceso: string | null;
    ruc_doctor: string | null;
    especialidades: string | null;
  }) => {
    if (updatingId) return;
    setEditingId(usuario.id);
    setEditForm({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
      id_acceso: usuario.id_acceso,
      ruc_doctor: usuario.ruc_doctor,
      especialidades: usuario.especialidades,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleFieldChange = (field: keyof UsuarioUpdate, value: string | null) => {
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
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  if (isError) {
    return <Alert severity="error">Error al cargar usuarios: {error?.message}</Alert>;
  }

  if (!usuarios || usuarios.length === 0) {
    return <Typography>No hay usuarios registrados</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Apellido</strong></TableCell>
            <TableCell><strong>Rol</strong></TableCell>
            <TableCell><strong>ID Acceso</strong></TableCell>
            <TableCell><strong>RUC Doctor</strong></TableCell>
            <TableCell><strong>Especialidades</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow
              key={usuario.id}
              hover
              onClick={() => handleRowClick(usuario)}
              sx={{ cursor: updatingId ? 'wait' : 'pointer' }}
            >
              <TableCell>{usuario.id}</TableCell>
              <TableCell>
                {editingId === usuario.id ? (
                  <TextField
                    value={editForm.nombre ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('nombre', e.target.value || null)}
                  />
                ) : (
                  usuario.nombre || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === usuario.id ? (
                  <TextField
                    value={editForm.apellido ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('apellido', e.target.value || null)}
                  />
                ) : (
                  usuario.apellido || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === usuario.id ? (
                  <TextField
                    select
                    value={editForm.rol ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('rol', e.target.value || null)}
                  >
                    <MenuItem value="">N/A</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                    <MenuItem value="doctor">doctor</MenuItem>
                    <MenuItem value="farmacista">farmacista</MenuItem>
                    <MenuItem value="cajero">cajero</MenuItem>
                  </TextField>
                ) : (
                  usuario.rol || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === usuario.id ? (
                  <TextField
                    value={editForm.id_acceso ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('id_acceso', e.target.value || null)}
                  />
                ) : (
                  usuario.id_acceso || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === usuario.id ? (
                  <TextField
                    value={editForm.ruc_doctor ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('ruc_doctor', e.target.value || null)}
                  />
                ) : (
                  usuario.ruc_doctor || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === usuario.id ? (
                  <TextField
                    value={editForm.especialidades ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('especialidades', e.target.value || null)}
                  />
                ) : (
                  usuario.especialidades || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === usuario.id ? (
                  <Box sx={{ display: 'flex', gap: 1 }} onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSaveEdit(usuario.id)}
                      disabled={updatingId === usuario.id}
                    >
                      {updatingId === usuario.id ? <CircularProgress size={20} /> : 'Guardar'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleCancelEdit}
                      disabled={updatingId === usuario.id}
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
                      handleRowClick(usuario);
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
