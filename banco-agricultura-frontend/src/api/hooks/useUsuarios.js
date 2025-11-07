
import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios.config';
import API_ENDPOINTS from '../../api/endpoints';



// datos simulados solo para pruebas (se usaran mientras el backend no este listo)

const MOCK_USUARIOS = [
  {
    id: 1,
    nombre: 'Karen Bannesa',
    apellido: 'Ochoa Garcia',
    dui: '12345678-9',
    email: 'karen.ochoa@banco.com',
    telefono: '7123-0000',
    direccion: 'San Salvador, Centro',
    fechaNacimiento: '1995-05-15',
    rol: 'ADMIN',
    sucursal: 'Central',
    sucursalId: 1,
    estado: true,
    fechaCreacion: '2025-11-7T08:00:00'
  },
  {
    id: 2,
    nombre: 'Oscar Danilo',
    apellido: 'Rivera Bernal',
    dui: '23456789-0',
    email: 'oscar.rivera@banco.com',
    telefono: '7234-0000',
    direccion: 'Santa Tecla, Centro',
    fechaNacimiento: '1995-08-22',
    rol: 'EMPLEADO',
    sucursal: 'Sucursal Norte',
    sucursalId: 2,
    estado: true,
    fechaCreacion: '2025-11-6T10:30:00'
  },
  {
    id: 3,
    nombre: 'Enrique Alexander',
    apellido: 'Flores Cazun',
    dui: '34567890-1',
    email: 'enrique.flores@gmail.com',
    telefono: '7345-6789',
    direccion: 'Antiguo Cuscatlan',
    fechaNacimiento: '1995-12-03',
    rol: 'CLIENTE',
    sucursal: 'Sucursal Este',
    sucursalId: 3,
    estado: true,
    fechaCreacion: '2025-03-20T14:00:00'
  },
  {
    id: 4,
    nombre: 'Ana Gabriela',
    apellido: 'Flores Castillo',
    dui: '45678901-2',
    email: 'ana.flores@banco.com',
    telefono: '7456-7890',
    direccion: 'San Miguel, Centro',
    fechaNacimiento: '1992-06-18',
    rol: 'EMPLEADO',
    sucursal: 'Sucursal Sur',
    sucursalId: 4,
    estado: true,
    fechaCreacion: '2024-04-05T09:15:00'
  },
  {
    id: 5,
    nombre: 'Roberto José',
    apellido: 'Molina Ramírez',
    dui: '56789012-3',
    email: 'roberto.molina@hotmail.com',
    telefono: '7567-8901',
    direccion: 'Santa Ana, Residencial',
    fechaNacimiento: '1995-03-25',
    rol: 'CLIENTE',
    sucursal: 'Central',
    sucursalId: 1,
    estado: false,
    fechaCreacion: '2025-05-12T11:45:00'
  }
];

const useUsuarios = (autoFetch = true) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Obtener todos los usuarios
   * info de BACKEND: GET /api/usuarios
   */
  const fetchUsuarios = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // descomentar cuando el backend este listo:
      // const response = await axiosInstance.get(API_ENDPOINTS.USUARIOS.LIST);
      // setUsuarios(response.data.data || response.data);
      
      //  descomentar cuando el backend este listo:

      console.log(' Usando datos simulados - Conectar con GET /api/usuarios');
      await new Promise(resolve => setTimeout(resolve, 800)); // Simular delay de red
      setUsuarios(MOCK_USUARIOS);
      
      setLoading(false);
      return { success: true, data: MOCK_USUARIOS };
      
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Error al cargar usuarios';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  /**
   * Crear nuevo usuario
   * 
   */
  const createUsuario = async (usuarioData) => {
    setLoading(true);
    setError(null);
    
    try {

      // Cuando el backend este listo descomentar esta parte:
      // const response = await axiosInstance.post(API_ENDPOINTS.USUARIOS.CREATE, usuarioData);
      // await fetchUsuarios();
      
      //  SIMULACIoN

      console.log(' Crear usuario (simulado):', usuarioData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nuevoUsuario = {
        id: Date.now(),
        ...usuarioData,
        estado: true,
        fechaCreacion: new Date().toISOString()
      };
      
      setUsuarios(prev => [...prev, nuevoUsuario]);
      
      setLoading(false);
      return { success: true, data: nuevoUsuario };
      
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Error al crear usuario';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  /**
   * Actualizar usuario existente
   * 
   */
  const updateUsuario = async (id, usuarioData) => {
    setLoading(true);
    setError(null);
    
    try {

      // descomentar cuando el backend este listo:
      // const response = await axiosInstance.put(API_ENDPOINTS.USUARIOS.UPDATE(id), usuarioData);
      // await fetchUsuarios();
      
      // SIMULACIoN :

      console.log(' Actualizar usuario (simulado):', id, usuarioData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsuarios(prev => prev.map(u => 
        u.id === id ? { ...u, ...usuarioData } : u
      ));
      
      setLoading(false);
      return { success: true };
      
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Error al actualizar usuario';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  /**
   * Eliminar usuario
   * 
   */
  const deleteUsuario = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      // descomentar cuando el backend este listo:
      // await axiosInstance.delete(API_ENDPOINTS.USUARIOS.DELETE(id));
      // await fetchUsuarios();
      
      //  SIMULACIoN :

      console.log(' Eliminar usuario (simulado):', id);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUsuarios(prev => prev.filter(u => u.id !== id));
      
      setLoading(false);
      return { success: true };
      
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Error al eliminar usuario';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  /**
   * Buscar usuario por DUI
   * info de BACKEND: GET /api/usuarios/buscar?dui=12345678-9
   */
  const searchByDUI = async (dui) => {
    setLoading(true);
    setError(null);
    
    try {

      // descomentar cuando el backend este listo:
      // const response = await axiosInstance.get(API_ENDPOINTS.USUARIOS.SEARCH_BY_DUI, {
      //   params: { dui }
      // });
      
      //  SIMULACIoN :

      console.log(' Buscar usuario por DUI (simulado):', dui);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const usuarioEncontrado = MOCK_USUARIOS.find(u => u.dui === dui);
      
      setLoading(false);
      return { 
        success: !!usuarioEncontrado, 
        data: usuarioEncontrado 
      };
      
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Error al buscar usuario';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // auto-fetch al montar el componente

  useEffect(() => {
    if (autoFetch) {
      fetchUsuarios();
    }
  }, [autoFetch]);

  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    searchByDUI
  };
};

export default useUsuarios;
