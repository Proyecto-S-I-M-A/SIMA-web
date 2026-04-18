
import { useState } from 'react';
import { Box, Container, Paper, Tabs, Tab, Typography } from '@mui/material';
import { ClienteForm } from './components/ClienteForm';
import { AccesoForm } from './components/AccesoForm';
import { UsuarioForm } from './components/UsuarioForm';
import { CreateSupabaseUserForm } from './components/CreateSupabaseUserForm';
import CustomTabPanel from '~/components/CustomeTabPanel';

export default function AdminPanel() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
            >
              <Tab label="Crear Cliente" id="admin-tab-0" aria-controls="admin-tabpanel-0" />
              <Tab label="Crear Acceso" id="admin-tab-1" aria-controls="admin-tabpanel-1" />
              <Tab label="Crear Usuario" id="admin-tab-2" aria-controls="admin-tabpanel-2" />
              <Tab label="Crear Usuario Supabase" id="admin-tab-3" aria-controls="admin-tabpanel-3" />
            </Tabs>
          </Box>

          <CustomTabPanel value={tabValue} index={0}>
            <ClienteForm />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <AccesoForm />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2}>
            <UsuarioForm />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={3}>
            <CreateSupabaseUserForm />
          </CustomTabPanel>
        </Paper>
      </Box>
    </Container>
  );
}
