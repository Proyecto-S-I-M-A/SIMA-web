import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import Sidebar from '~/components/Sidebar';
import { Navbar } from '~/pages/dashboard/components/Navbar';
import { PatientsTable } from '~/pages/dashboard/components/PatientsTable';
import { usePatientsTable } from '~/pages/dashboard/hooks/usePatientsTable';

type Props = {
  /** Ruta destino a la que se navega con `?cedula=` al seleccionar un paciente. */
  destination: string;
  /** Título mostrado sobre la tabla. */
  title?: string;
  /** Texto explicativo mostrado bajo el título. */
  subtitle?: string;
};

/**
 * Capa de selección de paciente. Se usa cuando se llega a una página que
 * requiere un paciente (nueva receta, historial) sin `?cedula=` en la URL
 * (p. ej. navegando desde el sidebar). Renderiza la tabla de pacientes y, al
 * elegir uno, navega a `destination?cedula=<cedula>`.
 */
export default function PatientSelector({ destination, title, subtitle }: Props) {
  const navigate = useNavigate();
  const {
    rawSearch,
    setRawSearch,
    search,
    sortKey,
    sortDir,
    handleSort,
    processedData,
    paginated,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    loading,
    error,
    refetch,
  } = usePatientsTable();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, minWidth: 0, bgcolor: 'background.default' }}>
        <Navbar rawSearch={rawSearch} onSearchChange={setRawSearch} />

        <Box sx={{ px: 4, pt: 3 }}>
          {title && (
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {title}
            </Typography>
          )}
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            {subtitle ?? 'Selecciona un paciente para continuar.'}
          </Alert>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Box sx={{ px: 4, mt: 4 }}>
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={() => void refetch()}>
                  Reintentar
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        )}

        {!loading && !error && (
          <PatientsTable
            search={search}
            processedData={processedData}
            paginated={paginated}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setPage(0);
            }}
            onSelectPatient={(row) =>
              navigate(`${destination}?cedula=${row.cedula}`)
            }
          />
        )}
      </Box>
    </Box>
  );
}
