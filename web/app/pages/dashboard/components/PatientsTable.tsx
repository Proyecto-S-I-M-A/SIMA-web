import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TablePagination,
  Avatar,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router';
import type { Row, SortKey, SortDir } from '../types';
import { SortCell } from './SortCell';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';

type Props = {
  search: string;
  processedData: Row[];
  paginated: Row[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
};

export function PatientsTable({
  search,
  processedData,
  paginated,
  sortKey,
  sortDir,
  onSort,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const navigate = useNavigate();

  const handleRowClick = (cedula: string) => {
    navigate(`/home/paciente/${cedula}`);
  };

  return (
    <>
      <Box sx={{ px: 4, mt: 3, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Pacientes
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          {processedData.length} resultados encontrados
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', px: 4 }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Table
            sx={{
              '& th, & td': {
                padding: '14px 16px',
                textAlign: 'center',
              },
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: '#f1f5f9',
                  '& th': { color: '#374151', fontWeight: 600 },
                }}
              >
                <SortCell
                  label="Paciente"
                  field="nombre"
                  sortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onSort}
                />
                <SortCell
                  label="Cédula"
                  field="cedula"
                  sortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onSort}
                />
                <SortCell
                  label="Sexo"
                  field="sexo"
                  sortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onSort}
                />
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginated.length > 0 ? (
                paginated.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: '#f0f4ff' },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: '#5E81AC',
                            width: 29,
                            height: 29,
                            fontSize: 14,
                            marginRight: 2,
                          }}
                        >
                          {row.nombre?.charAt(0)}
                          {row.apellido?.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography
                            sx={{ fontWeight: 600, justifyContent: 'center' }}
                          >
                            {row.nombre} {row.apellido}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            {row.correo}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ color: '#555' }}>{row.cedula}</TableCell>

                    <TableCell align="center">
                      <Chip
                        label={row.asegurado ? 'Sí' : 'No'}
                        size="small"
                        sx={{
                          bgcolor: row.asegurado ? '#D1FAE5' : '#FEE2E2',
                          color: row.asegurado ? '#065F46' : '#7F1D1D',
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell align="center">{row.sexo}</TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/home/nueva-receta?cedula=${row.cedula}`);
                          }}
                          sx={{
                            bgcolor: '#0288D1',
                            '&:hover': { bgcolor: '#01579B' },
                            fontSize: '0.75rem',
                            py: 0.5,
                          }}
                        >
                          Receta
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<HistoryIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/home/historial?cedula=${row.cedula}`);
                          }}
                          sx={{
                            color: '#0288D1',
                            borderColor: '#0288D1',
                            fontSize: '0.75rem',
                            py: 0.5,
                          }}
                        >
                          Historial
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ py: 4, color: '#999' }}
                  >
                    No se encontraron resultados para "{search}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={processedData.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, p) => onPageChange(p)}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={(e) => {
              onRowsPerPageChange(+e.target.value);
            }}
            labelRowsPerPage="Filas por página"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} de ${count}`
            }
          />
        </TableContainer>
      </Box>
    </>
  );
}
