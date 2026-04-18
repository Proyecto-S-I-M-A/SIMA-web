import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Alert } from '@mui/material';
import { useEffect } from 'react';
import { useGetClientes } from '~/lib/api/QueryCliente';

export function ClienteTable() {
  const { data: clientes, isLoading, isError, error } = useGetClientes("all");

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
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id} hover>
              <TableCell>{cliente.id}</TableCell>
              <TableCell>{cliente.nombre}</TableCell>
              <TableCell>{cliente.apellido || 'N/A'}</TableCell>
              <TableCell>{cliente.cedula || 'N/A'}</TableCell>
              <TableCell>{cliente.correo || 'N/A'}</TableCell>
              <TableCell>{cliente.asegurado ? 'Sí' : 'No'}</TableCell>
              <TableCell>{cliente.verificado ? 'Sí' : 'No'}</TableCell>
              <TableCell>{cliente.sexo || 'N/A'}</TableCell>
              <TableCell>{cliente.id_acceso}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
