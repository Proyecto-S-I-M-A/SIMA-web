import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Alert } from '@mui/material';
import { useEffect } from 'react';
import { useGetUsuarios } from '~/lib/api/QueryUsuario';

export function UsuarioTable() {
  const { data: usuarios, isLoading, isError, error } = useGetUsuarios("all");

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
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id} hover>
              <TableCell>{usuario.id}</TableCell>
              <TableCell>{usuario.nombre || 'N/A'}</TableCell>
              <TableCell>{usuario.apellido || 'N/A'}</TableCell>
              <TableCell>{usuario.rol || 'N/A'}</TableCell>
              <TableCell>{usuario.id_acceso || 'N/A'}</TableCell>
              <TableCell>{usuario.ruc_doctor || 'N/A'}</TableCell>
              <TableCell>{usuario.especialidades || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
