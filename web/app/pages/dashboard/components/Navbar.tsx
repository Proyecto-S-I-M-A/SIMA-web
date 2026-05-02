import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { theme } from '~/theme';

type Props = {
  rawSearch: string;
  onSearchChange: (value: string) => void;
};

export function Navbar({ rawSearch, onSearchChange }: Props) {
  const [focused, setFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    // FALTA IMPLEMENTAR CIERRE DE SESIÓN REAL
    console.log('Cerrar sesión');
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          FARMA EXPRESS
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(255,255,255,0.1)',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            width: '40%',
            transition: 'all 0.25s ease',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.18)',
              transform: 'scale(1.02)',
            },
            ...(focused && {
              bgcolor: 'rgba(255,255,255,0.22)',
              
              border: '1.5px solid rgb(255, 255, 255)',
            }),
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Buscar por nombre, apellido, cédula o correo..."
            value={rawSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            sx={{ ml: 1, color: 'white', width: '100%' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ color: 'white' }}>
            <NotificationsIcon />
          </IconButton>

          {/* Avatar clickeable */}
          <Avatar
            onClick={handleAvatarClick}
            sx={{
              bgcolor: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: '#4a6a9a',
                transform: 'scale(1.08)',
                boxShadow: '0 0 0 3px rgba(255,255,255,0.3)',
              },
            }}
          >
            <PersonIcon sx={{  color: theme.palette.primary.main,}}/>
          </Avatar >

          {/* Menú desplegable */}
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                elevation: 4,
                sx: {
                  mt: 1.5,
                  minWidth: 190,
                  borderRadius: 2,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.12))',
                  
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {/* Cerrar sesión */}
            <MenuItem
              onClick={handleLogout}
              sx={{
                color: '#dc2626',
                borderRadius: 1,
                mx: 0.5,
                '&:hover': { bgcolor: '#fef2f2' },
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: '#dc2626' }} />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
