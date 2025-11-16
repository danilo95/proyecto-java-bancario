import { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Button,
} from '@mui/material';
import {
  Logout,
  AccountBalance,
  AttachMoney,
  People,
  TrendingUp,
} from '@mui/icons-material';

import ListaUsuarios from './pages/usuarios/ListaUsuarios';
import Login from './pages/auth/Login';
import { AuthProvider, useAuth } from '@context/AuthContext';

// Tema principal
const theme = createTheme({
  palette: {
    primary: { main: '#0E9A9A' },
    secondary: { main: '#FFA726' },
  },
});

// DASHBOARD (solo UI, sin datos mock de backend)
function DashboardPage({ user, onLogout }) {
  const [selectedMenu, setSelectedMenu] = useState('usuarios');
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: prev[menu] ? null : menu,
    }));
  };

  const menuItems = [
    {
      id: 'usuarios',
      label: 'Usuarios',
      icon: <People />,
      type: 'single',
    },
    {
      id: 'sucursales',
      label: 'Sucursales',
      icon: <AccountBalance />,
      type: 'single',
    },
    {
      id: 'servicios',
      label: 'Servicios',
      icon: <AttachMoney />,
      type: 'group',
      children: [
        { id: 'cuentas', label: 'Cuentas' },
        { id: 'prestamos', label: 'Préstamos' },
        { id: 'transferencias', label: 'Transferencias' },
        { id: 'transferencias-express', label: 'Transferencias Express' },
      ],
    },
    {
      id: 'dependientes',
      label: 'Dependientes',
      icon: <People />,
      type: 'group',
      children: [
        { id: 'consulta', label: 'Consulta' },
        { id: 'agregar', label: 'Agregar' },
        { id: 'lista-dependientes', label: 'Lista Dependientes' },
      ],
    },
    {
      id: 'gestiones',
      label: 'Gestiones',
      icon: <TrendingUp />,
      type: 'group',
      children: [
        { id: 'gestionar-cuentas', label: 'Gestionar Cuentas' },
        { id: 'gestionar-prestamos', label: 'Gestionar Préstamos' },
      ],
    },
  ];

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    setOpenMenus({});
  };

  const renderContent = () => {
    const titles = {
      usuarios: 'Gestión de Usuarios',
      sucursales: 'Gestión de Sucursales',
      cuentas: 'Gestión de Cuentas',
      prestamos: 'Gestión de Préstamos',
      transferencias: 'Transferencias Bancarias',
      'transferencias-express': 'Transferencias Express',
      consulta: 'Consultar Dependientes',
      agregar: 'Agregar Dependiente',
      'lista-dependientes': 'Lista de Dependientes',
      'gestionar-cuentas': 'Gestionar Cuentas',
      'gestionar-prestamos': 'Gestionar Préstamos',
    };

    switch (selectedMenu) {
      case 'usuarios':
        return <ListaUsuarios />;

      default:
        return (
          <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
            <Typography
              variant='h4'
              fontWeight='bold'
              gutterBottom
              sx={{ color: 'white' }}
            >
              {titles[selectedMenu] || 'Bienvenido'}
            </Typography>
            <Paper sx={{ mt: 3, p: 4, bgcolor: 'white', borderRadius: 2 }}>
              <Typography variant='h6' gutterBottom sx={{ color: '#0E9A9A' }}>
                {titles[selectedMenu]}
              </Typography>
              <Typography variant='body1' color='text.secondary' sx={{ mt: 2 }}>
                Contenido de <strong>{titles[selectedMenu]}</strong>
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
                Esta sección está en desarrollo.
              </Typography>
            </Paper>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0E9A9A' }}>
      <Box
        sx={{
          bgcolor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 4,
            py: 2,
            borderBottom: '1px solid #E0E0E0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                bgcolor: '#0E9A9A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize: '24px',
              }}
            >
              BAS
            </Box>
            <Box>
              <Typography
                variant='h6'
                fontWeight='bold'
                sx={{ color: '#0E9A9A' }}
              >
                Banco de Agricultura Salvadoreño
              </Typography>
              <Typography variant='caption' sx={{ color: '#666' }}>
                Sistema de Gestión Bancaria
              </Typography>
            </Box>
          </Box>

          {/* Usuario */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography
                variant='body1'
                fontWeight='bold'
                sx={{ color: '#0E9A9A' }}
              >
                ¡Bienvenido, {user.nombre}!
              </Typography>
              <Typography variant='caption' sx={{ color: '#666' }}>
                Rol: <strong style={{ color: '#0E9A9A' }}>{user.rol}</strong>
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#FFA726', width: 45, height: 45 }}>
              {user.nombre.charAt(0)}
            </Avatar>
            <IconButton
              onClick={onLogout}
              sx={{
                color: '#0E9A9A',
                '&:hover': { bgcolor: '#E0F7F7' },
              }}
            >
              <Logout />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            px: 4,
            py: 1,
            bgcolor: 'white',
          }}
        >
          {menuItems.map((item) => (
            <Box key={item.id} sx={{ position: 'relative' }}>
              {item.type === 'single' ? (
                <Button
                  onClick={() => handleMenuClick(item.id)}
                  startIcon={item.icon}
                  sx={{
                    px: 3,
                    py: 1.5,
                    color: selectedMenu === item.id ? 'white' : '#0E9A9A',
                    bgcolor:
                      selectedMenu === item.id ? '#0E9A9A' : 'transparent',
                    fontWeight: selectedMenu === item.id ? 'bold' : 'normal',
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: selectedMenu === item.id ? '#0A7070' : '#E0F7F7',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => toggleMenu(item.id)}
                    startIcon={item.icon}
                    endIcon={
                      <Typography
                        sx={{
                          transform: openMenus[item.id]
                            ? 'rotate(180deg)'
                            : 'rotate(0)',
                          transition: '0.3s',
                          fontSize: '12px',
                        }}
                      >
                        ▼
                      </Typography>
                    }
                    sx={{
                      px: 3,
                      py: 1.5,
                      color: '#0E9A9A',
                      fontWeight: 'normal',
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#E0F7F7',
                      },
                    }}
                  >
                    {item.label}
                  </Button>

                  {/* Submenú */}
                  {openMenus[item.id] && (
                    <Paper
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        mt: 0.5,
                        minWidth: 200,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        zIndex: 1000,
                      }}
                    >
                      {item.children.map((child) => (
                        <Box
                          key={child.id}
                          onClick={() => handleMenuClick(child.id)}
                          sx={{
                            px: 3,
                            py: 1.5,
                            cursor: 'pointer',
                            bgcolor:
                              selectedMenu === child.id ? '#E0F7F7' : 'white',
                            color: '#0E9A9A',
                            fontWeight:
                              selectedMenu === child.id ? 'bold' : 'normal',
                            borderLeft:
                              selectedMenu === child.id
                                ? '4px solid #0E9A9A'
                                : '4px solid transparent',
                            '&:hover': {
                              bgcolor: '#F0F9F9',
                            },
                          }}
                        >
                          <Typography variant='body2'>
                            - {child.label}
                          </Typography>
                        </Box>
                      ))}
                    </Paper>
                  )}
                </>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {renderContent()}
    </Box>
  );
}

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return <Login />;
  }

  return <DashboardPage user={user} onLogout={logout} />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
