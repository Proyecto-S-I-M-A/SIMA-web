
import { useState } from 'react';
import { Box, CircularProgress, Container, Paper, Tabs, Tab, Typography } from '@mui/material';
import { ClienteForm } from './components/ClienteForm';
import { AccesoForm } from './components/AccesoForm';
import { UsuarioForm } from './components/UsuarioForm';
import { CreateSupabaseUserForm } from './components/CreateSupabaseUserForm';
import { AccesoTable } from './components/AccesoTable';
import { UsuarioTable } from './components/UsuarioTable';
import { ClienteTable } from './components/ClienteTable';
import { MaquinaForm } from './components/MaquinaForm';
import { MaquinaTable } from './components/MaquinaTable';
import { InventarioForm } from './components/InventarioForm';
import { InventarioTable } from './components/InventarioTable';
import { MaquinaInventarioManager } from './components/MaquinaInventarioManager';
import { RecetaAndDosisForm } from './components/RecetaAndDosisForm';
import { RecetaTable } from './components/RecetaTable';
import { DosisTable } from './components/DosisTable';
import { NotificationTestPanel } from './components/NotificationTestPanel';
import { useGetAccesos } from '~/lib/api/QueryAcceso';
import { useProtectedRoute } from '~/lib/useProtectedRoute';
import {GetSession} from '~/lib/GetSession';
import CustomTabPanel from '~/components/CustomeTabPanel';
import { Navigate } from 'react-router';
import type { Acceso } from '~/types/Acceso';

export default function AdminPanel() {
  // Validar autenticación
  useProtectedRoute();

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const sessionID = GetSession();
  const { data, isError, isLoading } = useGetAccesos(sessionID || '', !!sessionID);

  // El endpoint devuelve el acceso suelto o dentro de un arreglo según el caso.
  const acceso = (Array.isArray(data) ? data[0] : data) as Acceso | undefined;
  const isAdmin = acceso?.tipo === 'admin';

  // Las guardas van antes del render del panel: así sus tablas y formularios
  // nunca llegan a montarse ni a lanzar peticiones si el usuario no es admin.
  if (!sessionID) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}
          >
            Panel Administrativo
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="admin tabs"
              sx={{ minHeight: '64px' }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Crear Usuario Supabase" id="admin-tab-0" aria-controls="admin-tabpanel-0" />
              <Tab label="Crear Acceso" id="admin-tab-1" aria-controls="admin-tabpanel-1" />
              <Tab label="Crear Usuario" id="admin-tab-2" aria-controls="admin-tabpanel-2" />
              <Tab label="Crear Cliente" id="admin-tab-3" aria-controls="admin-tabpanel-3" />
              <Tab label="Administrar Máquinas" id="admin-tab-4" aria-controls="admin-tabpanel-4" />
              <Tab label="Inventario y Máquinas" id="admin-tab-5" aria-controls="admin-tabpanel-5" />
              <Tab label="Recetas y Dosis" id="admin-tab-6" aria-controls="admin-tabpanel-6" />
              <Tab label="Probar Notificaciones" id="admin-tab-7" aria-controls="admin-tabpanel-7" />
            </Tabs>
          </Box>

          <CustomTabPanel value={tabValue} index={0}>
            <CreateSupabaseUserForm />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <AccesoForm />
            <AccesoTable />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2}>
            <UsuarioForm />
            <UsuarioTable />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={3}>
            <ClienteForm />
            <ClienteTable />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={4}>
            <MaquinaForm />
            <MaquinaTable />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={5}>
            <InventarioForm />
            <InventarioTable />
            <MaquinaInventarioManager />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={6}>
            <RecetaAndDosisForm />
            <RecetaTable />
            <DosisTable />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={7}>
            <NotificationTestPanel />
          </CustomTabPanel>
        </Paper>
      </Box>
    </Container>
  );
}
