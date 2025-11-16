import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axios.config';

const LOGIN_URL = '/auth/login';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null
  );

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const { data } = await axiosInstance.post(LOGIN_URL, {
        correo: email,
        password,
      });

      const { token: apiToken, usuario } = data;

      const userData = {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      };

      setToken(apiToken);
      setUser(userData);

      localStorage.setItem('token', apiToken);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      let message = 'Error al iniciar sesión';

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.data?.detalle) {
        message = error.response.data.detalle;
      }

      return { success: false, message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return ctx;
};

export default AuthProvider;
