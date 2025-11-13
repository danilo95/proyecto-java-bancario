
import { useState, useEffect } from 'react';
// import axiosInstance from '../../api/axios.config'; para backend real
// import API_ENDPOINTS from '../../api/endpoints'; para backend real

// datos simulados

const MOCK_PRESTAMOS = [
  {
    id: 1,
    idCliente: 3, // Enrique Alexander
    nombreCliente: 'Enrique Alexander Flores',
    monto: 10000.00,
    tasaInteres: 3.0,
    plazoAnios: 5,
    cuotaMensual: 179.69,
    estado: 'EN_ESPERA', 
    fechaSolicitud: '2025-11-01T10:00:00'
  },
  {
    id: 2,
    idCliente: 5, // Edwin Franco
    nombreCliente: 'Edwin Vladimir Franco',
    monto: 25000.00,
    tasaInteres: 4.0,
    plazoAnios: 10,
    cuotaMensual: 253.11,
    estado: 'APROBADO',
    fechaSolicitud: '2025-10-15T14:30:00'
  },
  {
    id: 3,
    idCliente: 3, // Amanda Berenice Rodriguez Rivera
    nombreCliente: 'Amanda Berenice Rodriguez',
    monto: 5000.00,
    tasaInteres: 3.0,
    plazoAnios: 3,
    cuotaMensual: 145.41,
    estado: 'RECHAZADO',
    fechaSolicitud: '2025-09-05T08:15:00'
  }
];

// logica de prestamos

const usePrestamos = (autoFetch = true) => {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // cargar todos los prestamos (simulado)

  const fetchPrestamos = async () => {
    setLoading(true);
    setError(null);
    try {

      // const response = await axiosInstance.get(API_ENDPOINTS.PRESTAMOS.LIST); backend real

      console.log(' Usando datos simulados - Conectar con GET /api/prestamos');
      await new Promise(resolve => setTimeout(resolve, 600)); // Simular delay de red
      setPrestamos(MOCK_PRESTAMOS);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar prestamos');
      setLoading(false);
    }
  };

  // crear un nuevo prestamo (simulado)

  const createPrestamo = async (prestamoData) => {
    setLoading(true);
    try {

      // const response = await axiosInstance.post(API_ENDPOINTS.PRESTAMOS.CREATE, prestamoData); backend real

      console.log(' Crear prestamo (simulado):', prestamoData);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const nuevoPrestamo = {
        id: Date.now(), 
        ...prestamoData,
        estado: 'EN_ESPERA', 
        fechaSolicitud: new Date().toISOString(),
        nombreCliente: 'Cliente (Simulado)' 
      };
      setPrestamos(prev => [...prev, nuevoPrestamo]);
      setLoading(false);
      return { success: true, data: nuevoPrestamo };
    } catch (err) {
      setLoading(false);
      return { success: false, message: 'Error al crear prestamo' };
    }
  };

  // actualizar estado de un prestamo (simulado)

  const actualizarEstadoPrestamo = async (id, estado) => {
    setLoading(true);
    try {

      // const url = estado === 'APROBADO'  para backend real
      //   ? API_ENDPOINTS.PRESTAMOS.APROBAR(id) 
      //   : API_ENDPOINTS.PRESTAMOS.RECHAZAR(id);
      // const response = await axiosInstance.put(url);
      
      console.log(` Actualizar estado prestamo ${id} a ${estado} (simulado)`);
      await new Promise(resolve => setTimeout(resolve, 500));

      setPrestamos(prev => prev.map(p => 
        p.id === id ? { ...p, estado: estado } : p
      ));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: 'Error al actualizar estado' };
    }
  };

  // carga de datos

  useEffect(() => {
    if (autoFetch) {
      fetchPrestamos();
    }
  }, [autoFetch]);

  return {
    prestamos,
    loading,
    error,
    fetchPrestamos,
    createPrestamo,
    actualizarEstadoPrestamo
  };
};

export default usePrestamos;