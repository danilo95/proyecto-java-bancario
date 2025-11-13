

import { useState, useEffect } from 'react';
// import axiosInstance from '../../api/axios.config'; para el backend
// import API_ENDPOINTS from '../../api/endpoints'; para el backend

// datos simulados tokentransaccion

const MOCK_TOKENS = [
  {
    idToken: 1,
    token: '123456',
    idCuenta: 1,
    idUsuario: 3,
    tipo: 'RETIRO',
    monto: 50.00,
    estado: 'PENDIENTE',
    fechaCreacion: '2025-11-07T10:00:00',
    fechaUso: null
  },
  {
    idToken: 2,
    token: '654321',
    idCuenta: 2,
    idUsuario: 3,
    tipo: 'INGRESO',
    monto: 100.00,
    estado: 'USADO',
    fechaCreacion: '2025-11-06T15:00:00',
    fechaUso: '2025-11-06T15:10:00'
  }
];

const useTokenTransaccion = (autoFetch = true) => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // cargar tokens

  const fetchTokens = async () => {
    setLoading(true);
    setError(null);
    try {

      // const response = await axiosInstance.get(API_ENDPOINTS.TRANSFERENCIAS.HISTORIAL); // para el backend

      console.log(' Usando datos simulados - Conectar con GET /api/tokens');
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // filtrar pendientes 

      const dataFiltrada = MOCK_TOKENS.filter(t => t.estado === 'PENDIENTE');
      setTokens(dataFiltrada);
      
      setLoading(false);
    } catch (err) {
      setError('Error al cargar tokens');
      setLoading(false);
    }
  };

  // crear un nuevo token (simulado)

  const createToken = async (tokenData) => {
    setLoading(true);
    setError(null);
    try {

      // const response = await axiosInstance.post(API_ENDPOINTS.TRANSFERENCIAS.CREATE_EXPRESS, tokenData); para el backend

      console.log(' Crear token (simulado):', tokenData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nuevoToken = {
        idToken: Date.now(),
        token: `${Math.floor(Math.random() * 900000) + 100000}`, // token de 6 digitos
        idCuenta: tokenData.idCuenta,
        idUsuario: 3, // es simulado (sin embargo deberia venir de auth y del backend)
        tipo: tokenData.tipo,
        monto: tokenData.monto,
        estado: 'PENDIENTE',
        fechaCreacion: new Date().toISOString(),
        fechaUso: null
      };
      
      setTokens(prev => [...prev, nuevoToken]);
      setLoading(false);
      return { success: true, data: nuevoToken }; // devolvemos el token
      
    } catch (err) {
      setLoading(false);
      setError('Error al generar el token');
      return { success: false, message: 'Error al generar token' };
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchTokens();
    }
  }, [autoFetch]);

  return {
    tokens, // lista de tokens activos
    loading,
    error,
    createToken // funcion para generar uno nuevo
  };
};

export default useTokenTransaccion;