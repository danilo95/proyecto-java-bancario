
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000, // 30 segundos (aumentado para operaciones lentas)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


axiosInstance.interceptors.request.use(
  (config) => {

    // agregar token JWT si existe

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // agregar timestamp para debugging

    config.metadata = { startTime: new Date().getTime() };

    // log de la peticion (solo para esarrollo)

    if (import.meta.env.DEV) {
      console.log(`🔵 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Error en request:', error);
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {

    // calcular duración de la peticion

    const duration = new Date().getTime() - response.config.metadata.startTime;

    // log de respuesta exitosa (solo para desarrollo)

    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        duration: `${duration}ms`,
        data: response.data
      });
    }

    return response;
  },
  (error) => {

    // duracion de la peticion

    const duration = error.config?.metadata?.startTime 
      ? new Date().getTime() - error.config.metadata.startTime 
      : 0;

    // log del error

    console.error(` API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
      duration: `${duration}ms`,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });

    
    // erorres esperados http
    

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:

          // error de validacion

          console.warn(' Error de validacion:', data.errors || data.message);
          break;

        case 401:

          // token invalido o que ha expirado

          console.error('Sesion expirada o token invalido');
          
          // limpieza de datos de autenticacion

          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Redirigir a login (solo si no estamos ya en login)

          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;

        case 403:

          // sin permisos

          console.error('Acceso denegado: No tienes permisos para esta accion');
          break;

        case 404:

          // recurso no encontrado

          console.warn('🔍 Recurso no encontrado');
          break;

        case 500:

          // error del servidor

          console.error('Error del servidor:', data.message);
          break;

        default:
          console.error(`Error ${status}:`, data.message);
      }
    } else if (error.request) {

      // Request creado sin respuesta (problemas de red)

      console.error('🌐 Error de red: No hay respuesta del servidor');
      console.error('Verifica que el backend esté corriendo en http://localhost:8080');
    } else {

      // error en la configuracion de la peticion

      console.error('⚙️ Error de configuración:', error.message);
    }

    return Promise.reject(error);
  }
);


 // verificar si el backend est disponible

export const checkBackendHealth = async () => {
  try {
    const response = await axiosInstance.get('/health');
    return response.status === 200;
  } catch (error) {
    console.error('Servidor no disponible');
    return false;
  }
};

// formato de mensaje de error

export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'Error desconocido';
};

export default axiosInstance;
