
import { useEffect, useState } from 'react';
import { Box, Container, Paper, Tabs, Tab, Typography } from '@mui/material';
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
import { useGetAccesos } from '~/lib/api/QueryAcceso';
import GetSession from '~/lib/GetSession';
import CustomTabPanel from '~/components/CustomeTabPanel';
import { useNavigate } from 'react-router';

export default function AdminPanel() {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const sessionID = GetSession();
  const { data, isError, refetch } = useGetAccesos(sessionID || "");
  useEffect(() => {
    if(!sessionID){
      navigate("/home");
      return;
    }
    if(data && data?.length > 0) {
      refetch();
      const hasAdminAccess = data.some(acceso => acceso.tipo === 'admin');
      if (!hasAdminAccess) {
        navigate("/home");
      }
    }
    if(isError){
      navigate("/home");
    }
  }, []);

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
              <Tab label="Inventario de Máquinas" id="admin-tab-5" aria-controls="admin-tabpanel-5" />
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
          </CustomTabPanel>
        </Paper>
      </Box>
    </Container>
  );
}
