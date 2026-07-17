import { useState, type ReactNode } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router';

import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';

import { DeleteSession } from '~/lib/GetSession';
import { deleteAllCookieStoreValue } from '~/lib/GetCookie';

const DRAWER_WIDTH = 260;

type NavItem = {
  label: string;
  to: string;
  icon: ReactNode;
  /** Coincidencia exacta (para no marcar activo en sub-rutas). */
  end?: boolean;
};

const navItems: NavItem[] = [
  { label: 'Pacientes', to: '/home', icon: <PeopleIcon />, end: true },
  { label: 'Nueva receta', to: '/home/nueva-receta', icon: <NoteAddIcon /> },
  { label: 'Historial', to: '/home/historial', icon: <HistoryIcon /> },
  { label: 'Administración', to: '/admin', icon: <AdminPanelSettingsIcon /> },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    onNavigate?.();
    DeleteSession();
    await deleteAllCookieStoreValue();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      {/* Encabezado / logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2.5,
          py: 2.5,
        }}
      >
        <Box
          component="img"
          src="/logo/SIMA-logo.webp"
          alt="Logo S.I.M.A."
          sx={{ width: 40, height: 40 }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
            S.I.M.A.
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Medicación Asistida
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Navegación */}
      <List sx={{ flexGrow: 1, px: 1.5, py: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              sx={{
                borderRadius: 2,
                color: 'text.primary',
                '& .MuiListItemIcon-root': { color: 'text.secondary' },
                '&:hover': { bgcolor: 'action.hover' },
                '&.active': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                  '&:hover': { bgcolor: 'primary.dark' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontWeight: 600 } } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Cerrar sesión */}
      <List sx={{ px: 1.5, py: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: 'error.main',
              '& .MuiListItemIcon-root': { color: 'error.main' },
              '&:hover': { bgcolor: 'error.light', color: 'error.contrastText' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar sesión"
              slotProps={{ primary: { sx: { fontWeight: 600 } } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default function Sidebar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isDesktop) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    );
  }

  return (
    <>
      {/* Botón hamburguesa (solo móvil) */}
      <IconButton
        aria-label="Abrir menú"
        onClick={() => setMobileOpen(true)}
        sx={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: (t) => t.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': { bgcolor: 'background.paper' },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </Drawer>
    </>
  );
}
