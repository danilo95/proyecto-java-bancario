
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // LOGIN SIMULADO (para demo sin backend)

  const login = async (email, password) => {

    // Simular delay de red
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validar credenciales de demo

    const demoUsers = {
      'admin@banco.com': {
        id: 1,
        nombre: 'banne Administrador',
        email: 'admin@banco.com',
        rol: 'ADMIN',
        permisos: ['VER_TODO', 'CREAR', 'EDITAR', 'ELIMINAR']
      },
      'empleado@banco.com': {
        id: 2,
        nombre: 'Ana Empleada',
        email: 'empleado@banco.com',
        rol: 'EMPLEADO',
        permisos: ['VER_CUENTAS', 'CREAR_CUENTAS']
      },
      'cliente@banco.com': {
        id: 3,
        nombre: 'Oscar Cliente',
        email: 'cliente@banco.com',
        rol: 'CLIENTE',
        permisos: ['VER_PROPIAS']
      }
    };

    const validPasswords = {
      'admin@banco.com': 'admin123',
      'empleado@banco.com': 'emp123',
      'cliente@banco.com': 'cli123'
    };

    if (demoUsers[email] && validPasswords[email] === password) {
      const userData = demoUsers[email];
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'demo-token-' + Date.now());
      navigate('/dashboard');
      return { success: true };
    } else {
      return { success: false, message: 'Credenciales incorrectas' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const hasRole = (role) => {
    return user?.rol === role;
  };

  const value = {
    user,
    login,
    logout,
    hasRole,
    isAuthenticated: !!user,
    loading: false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};