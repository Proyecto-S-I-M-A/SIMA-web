import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { Navbar } from './components/Navbar';
import { StatsCards } from './components/StatsCards';
import { PatientsTable } from './components/PatientsTable';
import { usePatientsTable } from './hooks/usePatientsTable';
import { usePatients } from './hooks/Usepatients';



export default function Dashboard() {
  const { data, loading, error, refetch } = usePatients();  

  const {
    rawSearch, setRawSearch,
    search,
    sortKey, sortDir, handleSort,
    processedData, paginated,
    page, setPage,
    rowsPerPage, setRowsPerPage,
  } = usePatientsTable(data); 

  return (


    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
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
            action={<Button color="inherit" size="small" onClick={refetch}>Reintentar</Button>}
          >
            {error}
          </Alert>
        </Box>
      )}

      {/* Contenido */}
      {!loading && !error && (
        <>
          <StatsCards data={data} />
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
            onRowsPerPageChange={(rows) => { setRowsPerPage(rows); setPage(0); }}
          />
        </>
      )}
    </Box>
  );
}


/**
 * Componente principal del dashboard que muestra estadísticas y una tabla de pacientes.
 * 
 * Este componente renderiza la página del dashboard, incluyendo una barra de navegación,
 * tarjetas de estadísticas, y una tabla de pacientes con funcionalidades de búsqueda,
 * ordenamiento y paginación. Maneja estados de carga y error, permitiendo reintentar
 * la carga de datos en caso de fallo.
 * 
 * Utiliza los hooks personalizados `usePatients` para obtener los datos de pacientes
 * y `usePatientsTable` para gestionar la búsqueda, ordenamiento y paginación de la tabla.
 * 
 * @returns El JSX del componente Dashboard, que incluye la estructura completa de la página.
 */