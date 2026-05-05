import { CircularProgress, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import type { DosisConInventario } from "~/types/RecetasYDosis";
interface RecetaDosisListProps {
  dosis: DosisConInventario[];
  isLoading: boolean;
}

export default function RecetaDosisList({ dosis, isLoading }: RecetaDosisListProps) {

  if (isLoading) {
    return <CircularProgress size={20} />;
  }

  if (!dosis || dosis.length === 0) {
    return <Typography variant="body2">No hay dosis registradas.</Typography>;
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: '#f8f9fa' }}>
            <TableCell sx={{ fontWeight: 600 }}>Medicamento</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Cantidad</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Instrucciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dosis.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.inventario?.nombre_medicamento || '-'}</TableCell>
              <TableCell>{d.cantidad || '-'}</TableCell>
              <TableCell>{d.instrucciones || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}