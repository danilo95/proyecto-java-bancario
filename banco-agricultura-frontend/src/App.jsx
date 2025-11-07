import ListaUsuarios from './pages/usuarios/ListaUsuarios';
import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Link,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Logout,
  AccountBalance,
  AttachMoney,
  People,
  TrendingUp,
} from "@mui/icons-material";

// tema

const theme = createTheme({
  palette: {
    primary: { main: "#0E9A9A" },
    secondary: { main: "#FFA726" },
  },
});

// componente login

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "admin@banco.com" && password === "admin123") {
      onLogin({ nombre: "Bane Administrador", email, rol: "ADMIN" });
    } else if (email === "empleado@banco.com" && password === "emp123") {
      onLogin({ nombre: "Empleada", email, rol: "EMPLEADO" });
    } else if (email === "cliente@banco.com" && password === "cli123") {
      onLogin({ nombre: "Cliente", email, rol: "CLIENTE" });
    } else {
      setError("Credenciales incorrectas");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        bgcolor: "#0E9A9A",
        overflow: "hidden",
        margin: 0,
        margin: 0,
      }}
    >
      {/* logo del banco*/}

      <Box
        sx={{
          width: { xs: "0%", md: "80%" },
          display: { xs: "none", md: "flex" },
          bgcolor: "#0E9A9A",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 6,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Circulos decorativos de fondo }
        <Box
          sx={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            border: "50px solid rgba(255, 255, 255, 0.1)",
            top: "-150px",
            left: "-150px",
          }} 
        />
        <Box
          sx={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: "40px solid rgba(255, 255, 255, 0.08)",
            bottom: "-100px",
            right: "-100px",
          }}
        />

        // {/* Logo adicional en esquina superior derecha */}

        <Box
          component="img"
          src="../public/logo_banco_agro.png"
          alt="Logo banco"
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 80,
            height: "auto",
            zIndex: 10,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
          }}
        />

        {/* Contenido centrado */}

        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Logo circular grande */}

          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 40px",
              fontSize: "90px",
              fontWeight: "bold",
              color: "#0E9A9A",
              boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
              border: "8px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            BAS
          </Box>

          {/* Nombre del banco */}

          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: "2.5rem",
              letterSpacing: "2px",
              mb: 3,
            }}
          >
            BANCO DE
            <br />
            AGRICULTURA SALVADOREÑO
          </Typography>

          {/* Lnea decorativa */}

          <Box
            sx={{
              width: 80,
              height: 4,
              bgcolor: "white",
              margin: "0 auto 30px",
              borderRadius: 2,
              opacity: 0.8,
            }}
          />

          {/* Slogan */}

          <Typography
            variant="h6"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 300,
              maxWidth: 400,
              mx: "auto",
              lineHeight: 1.8,
              opacity: 0.95,
            }}
          >
            Tu Confianza,
            <br />
            Tu Futuro
          </Typography>
        </Box>
      </Box>

      {/* Formulario de Login */}

      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          bgcolor: "#0E9A9A",
        }}
      >
        <Box sx={{ maxWidth: 480, width: "100%" }}>
          {/* Logo para mOvil */}

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                bgcolor: "#0E9A9A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              BA
            </Box>
          </Box>

          {/* Tarjeta del formulario */}

          <Card
            sx={{
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.3)",
              bgcolor: "transparent",
            }}
          >
            <CardContent sx={{ p: 5 }}>
              {/* titulo */}

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "white", mb: 1 }}
                >
                  Iniciar Sesion
                </Typography>
                <Typography variant="body2" color="white">
                  Ingresa tus credenciales para continuar
                </Typography>
              </Box>

              {/* Mensaje de error */}

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {/* Formulario */}

              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    sx={{ mb: 1, color: "white" }}
                  >
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="ejemplo@correo.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        "&:hover fieldset": {
                          borderColor: "#0E9A9A",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0E9A9A",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    sx={{ mb: 1, color: "white" }}
                  >
                    Contraseña
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Ingresa tu contraseña"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        "&:hover fieldset": {
                          borderColor: "#0E9A9A",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0E9A9A",
                          borderWidth: "2px",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* Link olvide contraseña */}

                <Box sx={{ textAlign: "right", mb: 3 }}>
                  <Link
                    href="#"
                    underline="hover"
                    variant="body2"
                    sx={{
                      color: "white",
                      fontWeight: 500,
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Box>

                {/* Boton de login */}

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.8,
                    bgcolor: "#0E9A9A",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(14, 154, 154, 0.3)",
                    "&:hover": {
                      bgcolor: "#0A7070",
                      boxShadow: "0 6px 16px rgba(14, 154, 154, 0.4)",
                    },
                  }}
                >
                  {loading ? "Iniciando sesion..." : "Iniciar Sesion"}
                </Button>
              </form>

              {/* Credenciales de prueba */}

              <Box
                sx={{
                  mt: 4,
                  p: 2.5,
                  bgcolor: "#E8F5F5",
                  borderRadius: 2,
                  border: "1px dashed #0E9A9A",
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ color: "#0E9A9A", display: "block", mb: 1 }}
                >
                  🔑 Credenciales de prueba:
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ color: "#495057", lineHeight: 1.8 }}
                >
                  👤 <strong>Admin:</strong> admin@banco.com / admin123
                  <br />
                  👤 <strong>Empleado:</strong> empleado@banco.com / emp123
                  <br />
                  👤 <strong>Cliente:</strong> cliente@banco.com / cli123
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

// Componente Dashboard con Menu

function DashboardPage({ user, onLogout }) {
  const [selectedMenu, setSelectedMenu] = useState("usuarios");
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: prev[menu] ? null : menu,
    }));
  };

  // Estructura del menu

  const menuItems = [
    {
      id: "usuarios",
      label: "Usuarios",
      icon: <People />,
      type: "single",
    },
    {
      id: "sucursales",
      label: "Sucursales",
      icon: <AccountBalance />,
      type: "single",
    },
    {
      id: "servicios",
      label: "Servicios",
      icon: <AttachMoney />,
      type: "group",
      children: [
        { id: "cuentas", label: "Cuentas" },
        { id: "prestamos", label: "Prestamos" },
        { id: "transferencias", label: "Transferencias" },
        { id: "transferencias-express", label: "Transferencias Express" },
      ],
    },
    {
      id: "dependientes",
      label: "Dependientes",
      icon: <People />,
      type: "group",
      children: [
        { id: "consulta", label: "Consulta" },
        { id: "agregar", label: "Agregar" },
        { id: "lista-dependientes", label: "Lista Dependientes" },
      ],
    },
    {
      id: "gestiones",
      label: "Gestiones",
      icon: <TrendingUp />,
      type: "group",
      children: [
        { id: "gestionar-cuentas", label: "Gestionar Cuentas" },
        { id: "gestionar-prestamos", label: "Gestionar Prestamos" },
      ],
    },
  ];

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    setOpenMenus({});
  };

  // Contenido segun la opcion seleccionada (operaciones bancarias simuladas)

  const renderContent = () => {

  // Titulos de cada seccion
  
  const titles = {
    usuarios: "Gestión de Usuarios",
    sucursales: "Gestión de Sucursales",
    cuentas: "Gestión de Cuentas",
    prestamos: "Gestión de Préstamos",
    transferencias: "Transferencias Bancarias",
    "transferencias-express": "Transferencias Express",
    consulta: "Consultar Dependientes",
    agregar: "Agregar Dependiente",
    "lista-dependientes": "Lista de Dependientes",
    "gestionar-cuentas": "Gestionar Cuentas",
    "gestionar-prestamos": "Gestionar Préstamos",
  };

  // renderizado segun opcion

  switch(selectedMenu) {
    case 'usuarios':
      return <ListaUsuarios />;
    
    // paginas pendientes aca abajo:
    // case 'sucursales':
    //   return <ListaSucursales />;
    // case 'cuentas':
    //   return <ListaCuentas />;
    // case 'prestamos':
    //   return <ListaPrestamos />;
    
    default:

      // Placeholder para secciones en desarrollo

      return (
        <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "white" }}
          >
            {titles[selectedMenu] || "Bienvenido"}
          </Typography>
          <Paper sx={{ mt: 3, p: 4, bgcolor: "white", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#0E9A9A" }}>
              {titles[selectedMenu]}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Contenido de <strong>{titles[selectedMenu]}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Esta sección esta en desarrollo. Pronto estara disponible.
            </Typography>
          </Paper>
        </Box>
      );
  }
};

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0E9A9A" }}>

      {/* encabezado */}

      <Box
        sx={{
          bgcolor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >

        {/* barra superior con logo y usuario */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 2,
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          {/* Logo */}

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                bgcolor: "#0E9A9A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: "24px",
              }}
            >
              BAS
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#0E9A9A" }}
              >
                Banco de Agricultura Salvadoreño
              </Typography>
              <Typography variant="caption" sx={{ color: "#666" }}>
                Sistema de Gestion Bancaria
              </Typography>
            </Box>
          </Box>

          {/* saludo y nombre de usuario */}

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ color: "#0E9A9A" }}
              >
                ¡Bienvenido, {user.nombre}!
              </Typography>
              <Typography variant="caption" sx={{ color: "#666" }}>
                Rol: <strong style={{ color: "#0E9A9A" }}>{user.rol}</strong>
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "#FFA726", width: 45, height: 45 }}>
              {user.nombre.charAt(0)}
            </Avatar>
            <IconButton
              onClick={onLogout}
              sx={{
                color: "#0E9A9A",
                "&:hover": { bgcolor: "#E0F7F7" },
              }}
            >
              <Logout />
            </IconButton>
          </Box>
        </Box>

        {/* menu */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            px: 4,
            py: 1,
            bgcolor: "white",
          }}
        >
          {menuItems.map((item) => (
            <Box key={item.id} sx={{ position: "relative" }}>
              {item.type === "single" ? (
                <Button
                  onClick={() => handleMenuClick(item.id)}
                  startIcon={item.icon}
                  sx={{
                    px: 3,
                    py: 1.5,
                    color: selectedMenu === item.id ? "white" : "#0E9A9A",
                    bgcolor:
                      selectedMenu === item.id ? "#0E9A9A" : "transparent",
                    fontWeight: selectedMenu === item.id ? "bold" : "normal",
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: selectedMenu === item.id ? "#0A7070" : "#E0F7F7",
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
                            ? "rotate(180deg)"
                            : "rotate(0)",
                          transition: "0.3s",
                          fontSize: "12px",
                        }}
                      >
                        ▼
                      </Typography>
                    }
                    sx={{
                      px: 3,
                      py: 1.5,
                      color: "#0E9A9A",
                      fontWeight: "normal",
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#E0F7F7",
                      },
                    }}
                  >
                    {item.label}
                  </Button>

                  {/* Submenu dashboard desplegable */}

                  {openMenus[item.id] && (
                    <Paper
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        mt: 0.5,
                        minWidth: 200,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        borderRadius: 2,
                        overflow: "hidden",
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
                            cursor: "pointer",
                            bgcolor:
                              selectedMenu === child.id ? "#E0F7F7" : "white",
                            color: "#0E9A9A",
                            fontWeight:
                              selectedMenu === child.id ? "bold" : "normal",
                            borderLeft:
                              selectedMenu === child.id
                                ? "4px solid #0E9A9A"
                                : "4px solid transparent",
                            "&:hover": {
                              bgcolor: "#F0F9F9",
                            },
                          }}
                        >
                          <Typography variant="body2">
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

      {/* contenido principal */}

      {renderContent()}
    </Box>
  );
}

// app principal

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <DashboardPage user={user} onLogout={handleLogout} />
      )}
    </ThemeProvider>
  );
}

export default App;
