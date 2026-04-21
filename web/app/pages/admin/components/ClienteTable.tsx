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
import { useGetClientes, useUpdateClienteMutation } from '~/lib/api/QueryCliente';
import type { ClienteUpdate } from '~/types/cliente';

export function ClienteTable() {
  const { data: clientes, isLoading, isError, error } = useGetClientes('all');
  const updateMutation = useUpdateClienteMutation();
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ClienteUpdate>({});

  const handleRowClick = (cliente: {
    id: number;
    nombre: string;
    apellido: string | null;
    cedula: string | null;
    correo: string | null;
    asegurado: boolean;
    verificado: boolean;
    sexo: string | null;
  }) => {
    if (updatingId) return;
    setEditingId(cliente.id);
    setEditForm({
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      cedula: cliente.cedula,
      correo: cliente.correo,
      asegurado: cliente.asegurado,
      verificado: cliente.verificado,
      sexo: cliente.sexo,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleFieldChange = (field: keyof ClienteUpdate, value: string | boolean | null) => {
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
    return <Alert severity="error">Error al cargar clientes: {error?.message}</Alert>;
  }

  if (!clientes || clientes.length === 0) {
    return <Typography>No hay clientes registrados</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3, overflow: 'auto' }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Apellido</strong></TableCell>
            <TableCell><strong>Cédula</strong></TableCell>
            <TableCell><strong>Correo</strong></TableCell>
            <TableCell><strong>Asegurado</strong></TableCell>
            <TableCell><strong>Verificado</strong></TableCell>
            <TableCell><strong>Sexo</strong></TableCell>
            <TableCell><strong>ID Acceso</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow
              key={cliente.id}
              hover
              onClick={() => handleRowClick(cliente)}
              sx={{ cursor: updatingId ? 'wait' : 'pointer' }}
            >
              <TableCell>{cliente.id}</TableCell>
              <TableCell>
                {editingId === cliente.id ? (
                  <TextField
                    value={editForm.nombre ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('nombre', e.target.value)}
                  />
                ) : (
                  cliente.nombre
                )}
              </TableCell>
              <TableCell>
                {editingId === cliente.id ? (
                  <TextField
                    value={editForm.apellido ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('apellido', e.target.value || null)}
                  />
                ) : (
                  cliente.apellido || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === cliente.id ? (
                  <TextField
                    value={editForm.cedula ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('cedula', e.target.value || null)}
                  />
                ) : (
                  cliente.cedula || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === cliente.id ? (
                  <TextField
                    value={editForm.correo ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('correo', e.target.value || null)}
                  />
                ) : (
                  cliente.correo || 'N/A'
                )}
              </TableCell>
              <TableCell>
                {editingId === cliente.id ? (
                  <TextField
                    select
                    value={String(editForm.asegurado ?? false)}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('asegurado', e.target.value === 'true')}
                  >
                    <MenuItem value="true">Sí</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>
                ) : (
                  cliente.asegurado ? 'Sí' : 'No'
                )}
              </TableCell>
              <TableCell>
                {editingId === cliente.id ? (
                  <TextField
                    select
                    value={String(editForm.verificado ?? false)}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('verificado', e.target.value === 'true')}
                  >
                    <MenuItem value="true">Sí</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>
                ) : (
                  cliente.verificado ? 'Sí' : 'No'
                )}
              </TableCell>
              <TableCell>
                {editingId === cliente.id ? (
                  <TextField
                    select
                    value={editForm.sexo ?? ''}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('sexo', e.target.value || null)}
                  >
                    <MenuItem value="">N/A</MenuItem>
                    <MenuItem value="M">M</MenuItem>
                    <MenuItem value="F">F</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </TextField>
                ) : (
                  cliente.sexo || 'N/A'
                )}
              </TableCell>
              <TableCell>{cliente.id_acceso}</TableCell>
              <TableCell>
                {editingId === cliente.id ? (
                  <Box sx={{ display: 'flex', gap: 1 }} onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSaveEdit(cliente.id)}
                      disabled={updatingId === cliente.id}
                    >
                      {updatingId === cliente.id ? <CircularProgress size={20} /> : 'Guardar'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleCancelEdit}
                      disabled={updatingId === cliente.id}
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
                      handleRowClick(cliente);
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
