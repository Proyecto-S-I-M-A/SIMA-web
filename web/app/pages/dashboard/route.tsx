import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { Navbar } from './components/Navbar';
import { StatsCards } from './components/StatsCards';
import { PatientsTable } from './components/PatientsTable';
import { usePatientsTable } from './hooks/usePatientsTable';
import { useProtectedRoute } from '~/lib/useProtectedRoute';
import { ProtectedRoute } from '~/components/ProtectedRoute';
import Sidebar from '~/components/Sidebar';

export default function Dashboard() {
  // Validar autenticación
  useProtectedRoute();

  const {
    data,
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
    <ProtectedRoute>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, minWidth: 0, bgcolor: '#ffffff' }}>
          <Navbar rawSearch={rawSearch} onSearchChange={setRawSearch} />

          {/* Cargando */}
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
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => void refetch()}
                >
                  Reintentar
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        )}

        {/* Contenido */}
        {!loading && !error && (
          <>
            <StatsCards data={data || []} />
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
            />
            </>
          )}
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
