

import { useState, useEffect } from 'react';
// import axiosInstance from '../../api/axios.config'; para backend real
// import API_ENDPOINTS from '../../api/endpoints'; para backend real

// datos simulados de cuentas

const MOCK_CUENTAS = [
  {
    id: 1,
    idCliente: 3, // Enrique Alexander
    numeroCuenta: '0011223344',
    tipo: 'AHORRO',
    saldo: 1500.75,
    estado: 'ACTIVA',
    fechaApertura: '2024-03-15T09:00:00'
  },
  {
    id: 2,
    idCliente: 3, // Enrique Alexander
    numeroCuenta: '0011225566',
    tipo: 'CORRIENTE',
    saldo: 500.00,
    estado: 'ACTIVA',
    fechaApertura: '2025-01-20T14:30:00'
  },
  {
    id: 3,
    idCliente: 5, // Amanda Berenice Rodriguez Rivera
    numeroCuenta: '0022334455',
    tipo: 'AHORRO',
    saldo: 10500.50,
    estado: 'CONGELADA',
    fechaApertura: '2023-11-01T11:00:00'
  }
];

// logica de cuentas

const useCuentas = (autoFetch = true) => {
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // cargar todas las cuentas (simulado)

  const fetchCuentas = async () => {
    setLoading(true);
    setError(null);
    try {

      // const response = await axiosInstance.get(API_ENDPOINTS.CUENTAS.LIST);  backend

      console.log(' Usando datos simulados - Conectar con GET /api/cuentas');

      await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay de red
      
      // Aqui deberiamos filtrar por usuario logueado
      // por ahora se muestra todo

      setCuentas(MOCK_CUENTAS);
    
      
      setLoading(false);
    } catch (err) {
      setError('Error al cargar cuentas');
      setLoading(false);
    }
  };

  // crear una nueva cuenta (simulado)

  const createCuenta = async (cuentaData) => {
    setLoading(true);
    try {

      // const response = await axiosInstance.post(API_ENDPOINTS.CUENTAS.CREATE, cuentaData); backend

      console.log(' Crear cuenta (simulado):', cuentaData);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const nuevaCuenta = {
        id: Date.now(),
        idCliente: cuentaData.idCliente,
        numeroCuenta: `00${Math.floor(Math.random() * 90000000) + 10000000}`, // Random
        tipo: cuentaData.tipo,
        saldo: 0.00, 
        estado: 'ACTIVA',
        fechaApertura: new Date().toISOString()
      };
      
      setCuentas(prev => [...prev, nuevaCuenta]);
      setLoading(false);
      return { success: true, data: nuevaCuenta };
    } catch (err) {
      setLoading(false);
      return { success: false, message: 'Error al crear cuenta' };
    }
  };

  // cambiar estado de una cuenta (simulado)

  const actualizarEstadoCuenta = async (id, estado) => {
    setLoading(true);
    try {

      // const response = await axiosInstance.put(API_ENDPOINTS.CUENTAS.UPDATE(id), { estado }); backend

      console.log(` Actualizar estado cuenta ${id} a ${estado} (simulado)`);
      await new Promise(resolve => setTimeout(resolve, 500));

      setCuentas(prev => prev.map(c => 
        c.id === id ? { ...c, estado: estado } : c
      ));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: 'Error al actualizar estado' };
    }
  };

  // auto-cargar datos al mostrar

  useEffect(() => {
    if (autoFetch) {
      fetchCuentas();
    }
  }, [autoFetch]);

  return {
    cuentas,
    loading,
    error,
    fetchCuentas,
    createCuenta,
    actualizarEstadoCuenta
  };
};

export default useCuentas;