import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Alert, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetAccesos, useUpdateAccesoMutation } from '~/lib/api/QueryAcceso';

export function AccesoTable() {
  const { data: accesos, isLoading, isError, error, refetch } = useGetAccesos("all");
  const updateMutation = useUpdateAccesoMutation();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleToggleActivo = async (id: string, currentState: boolean) => {
    setUpdatingId(id);
    try {
      await updateMutation.mutateAsync({ id, activo: !currentState });
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  if (isError) {
    return <Alert severity="error">Error al cargar accesos: {error?.message}</Alert>;
  }

  if (!accesos || accesos.length === 0) {
    return <Typography>No hay accesos registrados</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Usuario</strong></TableCell>
            <TableCell><strong>Tipo</strong></TableCell>
            <TableCell><strong>Correo</strong></TableCell>
            <TableCell><strong>Activo</strong></TableCell>
            <TableCell><strong>Último Acceso</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accesos.map((acceso) => (
            <TableRow key={acceso.id} hover>
              <TableCell>{acceso.id}</TableCell>
              <TableCell>{acceso.usuario}</TableCell>
              <TableCell>{acceso.tipo}</TableCell>
              <TableCell>{acceso.correo}</TableCell>
              <TableCell>{acceso.activo ? 'Sí' : 'No'}</TableCell>
              <TableCell>
                {acceso.ultimo_acceso ? new Date(acceso.ultimo_acceso).toLocaleDateString() : 'N/A'}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  color={acceso.activo ? "error" : "success"}
                  onClick={() => handleToggleActivo(acceso.id, acceso.activo)}
                  disabled={updatingId === acceso.id}
                  sx={{ minWidth: '100px' }}
                >
                  {updatingId === acceso.id ? <CircularProgress size={20} /> : (acceso.activo ? 'Desactivar' : 'Activar')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
