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
} from '@mui/material';
import { useState } from 'react';
import { useGetAccesos, useUpdateAccesoMutation } from '~/lib/api/QueryAcceso';
import type { AccesoUpdate } from '~/types/Acceso';

export function AccesoTable() {
  const { data: accesos, isLoading, isError, error } = useGetAccesos('all');
  const updateMutation = useUpdateAccesoMutation();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<AccesoUpdate>({});

  const handleRowClick = (acceso: {
    id: string;
    usuario: string;
    tipo: string;
    correo: string;
  }) => {
    if (updatingId) return;
    setEditingId(acceso.id);
    setEditForm({
      id: acceso.id,
      usuario: acceso.usuario,
      tipo: acceso.tipo,
      correo: acceso.correo,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleFieldChange = (field: keyof AccesoUpdate, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async (id: string) => {
    setUpdatingId(id);
    try {
      await updateMutation.mutateAsync({ id, body: editForm });
      handleCancelEdit();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleActivo = async (id: string, currentState: boolean) => {
    setUpdatingId(id);
    try {
      await updateMutation.mutateAsync({ id, body: { activo: !currentState } });
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
    return (
      <Alert severity="error">Error al cargar accesos: {error?.message}</Alert>
    );
  }

  if (!accesos || accesos.length === 0) {
    return <Typography>No hay accesos registrados</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell>
              <strong>ID</strong>
            </TableCell>
            <TableCell>
              <strong>Usuario</strong>
            </TableCell>
            <TableCell>
              <strong>Tipo</strong>
            </TableCell>
            <TableCell>
              <strong>Correo</strong>
            </TableCell>
            <TableCell>
              <strong>Activo</strong>
            </TableCell>
            <TableCell>
              <strong>Último Acceso</strong>
            </TableCell>
            <TableCell>
              <strong>Acciones</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accesos.map((acceso) => (
            <TableRow
              key={acceso.id}
              hover
              onClick={() => handleRowClick(acceso)}
              sx={{ cursor: updatingId ? 'wait' : 'pointer' }}
            >
              <TableCell>
                {editingId === acceso.id ? (
                  <TextField
                    value={editForm.id ?? ''}
                    size="small"
                    variant="outlined"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleFieldChange('id', e.target.value)
                    }
                  />
                ) : (
                  acceso.id
                )}
              </TableCell>
              <TableCell>
                {editingId === acceso.id ? (
                  <TextField
                    value={editForm.usuario ?? ''}
                    size="small"
                    variant="outlined"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleFieldChange('usuario', e.target.value)
                    }
                  />
                ) : (
                  acceso.usuario
                )}
              </TableCell>
              <TableCell>
                {editingId === acceso.id ? (
                  <TextField
                    value={editForm.tipo ?? ''}
                    size="small"
                    variant="outlined"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFieldChange('tipo', e.target.value)}
                  />
                ) : (
                  acceso.tipo
                )}
              </TableCell>
              <TableCell>
                {editingId === acceso.id ? (
                  <TextField
                    value={editForm.correo ?? ''}
                    size="small"
                    variant="outlined"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleFieldChange('correo', e.target.value)
                    }
                  />
                ) : (
                  acceso.correo
                )}
              </TableCell>
              <TableCell>{acceso.activo ? 'Sí' : 'No'}</TableCell>
              <TableCell>
                {acceso.ultimo_acceso
                  ? new Date(acceso.ultimo_acceso).toLocaleDateString()
                  : 'N/A'}
              </TableCell>
              <TableCell>
                {editingId === acceso.id ? (
                  <Box
                    sx={{ display: 'flex', gap: 1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSaveEdit(acceso.id)}
                      disabled={updatingId === acceso.id}
                    >
                      {updatingId === acceso.id ? (
                        <CircularProgress size={20} />
                      ) : (
                        'Guardar'
                      )}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleCancelEdit}
                      disabled={updatingId === acceso.id}
                    >
                      Cancelar
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    color={acceso.activo ? 'error' : 'success'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleActivo(acceso.id, acceso.activo);
                    }}
                    disabled={updatingId === acceso.id}
                    sx={{ minWidth: '100px' }}
                  >
                    {updatingId === acceso.id ? (
                      <CircularProgress size={20} />
                    ) : acceso.activo ? (
                      'Desactivar'
                    ) : (
                      'Activar'
                    )}
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
