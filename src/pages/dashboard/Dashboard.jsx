
import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Paper
} from '@mui/material';
import {
  AccountBalance,
  AttachMoney,
  People,
  TrendingUp,
  Brightness4,
  Brightness7,
  AccountCircle,
  Logout,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import { formatCurrency, formatNumber, getInitials } from '@utils/formatters';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  // datos no reales solo para (simulacion para pruebas) la api deberia proveer o alimentar estos datos

  const dashboardStats = {
    totalCuentas: 1245,
    prestamosActivos: 89,
    totalClientes: 567,
    montoTotal: 15750000
  };

  const statCards = [
    {
      title: 'Total Cuentas',
      value: formatNumber(dashboardStats.totalCuentas),
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      color: '#2E7D32',
      bgColor: 'rgba(46, 125, 50, 0.1)'
    },
    {
      title: 'Préstamos Activos',
      value: formatNumber(dashboardStats.prestamosActivos),
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#FFA726',
      bgColor: 'rgba(255, 167, 38, 0.1)'
    },
    {
      title: 'Total Clientes',
      value: formatNumber(dashboardStats.totalClientes),
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#2196F3',
      bgColor: 'rgba(33, 150, 243, 0.1)'
    },
    {
      title: 'Monto Total',
      value: formatCurrency(dashboardStats.montoTotal),
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#4CAF50',
      bgColor: 'rgba(76, 175, 80, 0.1)'
    }
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      {/* encabezado */}

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                fontWeight: 'bold',
                color: 'primary.main',
                fontSize: '18px'
              }}
            >
              BAS
            </Box>
            <Typography variant="h6" component="div">
              Banco de Agricultura Salvadoreño
            </Typography>
          </Box>

          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton onClick={handleMenuOpen} color="inherit" sx={{ ml: 1 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
              {getInitials(user?.nombre || 'Usuario')}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1">{user?.nombre}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
              <Typography variant="caption" color="primary">
                Rol: {user?.rol}
              </Typography>
            </Box>
            
            <Divider />
            
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Mi Perfil
            </MenuItem>
            
            <Divider />
            
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* contenido principal */}

      <Box sx={{ p: 3 }}>

        {/* Saludo */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            ¡Bienvenido, {user?.nombre}! 
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Resumen de Operaciones
          </Typography>
        </Box>

        {/* estadisticas */}

        <Grid container spacing={3}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: stat.bgColor,
                        color: stat.color,
                        p: 1.5,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* seccion de operaciones recientes */}

        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
             Actividad Reciente
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              En esta seccion se mostraran las ultimas transacciones y movimientos
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              (funcionalidad aun en desarrollo)
            </Typography>
          </Box>
        </Paper>

        {/* mensaje demostracion */}

        <Paper sx={{ mt: 3, p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
          <Typography variant="body2">
            <strong> Modo Demostracion:</strong> Este es solo un prototipo funcional sin api. Los datos son simulados para fines de demostracion
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;