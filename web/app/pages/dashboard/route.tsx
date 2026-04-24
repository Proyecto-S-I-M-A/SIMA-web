import { Box } from '@mui/material';
import { Navbar } from './components/Navbar';
import { StatsCards } from './components/StatsCards';
import { PatientsTable } from './components/PatientsTable';
import { usePatientsTable } from './hooks/usePatientsTable';

export default function Dashboard() {
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
  } = usePatientsTable();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Navbar rawSearch={rawSearch} onSearchChange={setRawSearch} />
      <StatsCards />
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
    </Box>
  );
}