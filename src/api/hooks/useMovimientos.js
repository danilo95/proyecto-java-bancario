

import { useState, useEffect } from 'react';
// import axiosInstance from '../../api/axios.config'; para backend real
// import API_ENDPOINTS from '../../api/endpoints'; // para backend real

// datos simulados de movimientos

const MOCK_MOVIMIENTOS = [

  // Movimientos para Cuenta ID 1 (cuentaAhorro)

  {
    id: 1,
    idCuenta: 1,
    tipo: 'DEPOSITO', 
    monto: 1000.00,
    saldoAnterior: 500.75,
    saldoNuevo: 1500.75,
    descripcion: 'Deposito de planilla',
    fecha: '2025-11-01T09:00:00'
  },
  {
    id: 2,
    idCuenta: 1,
    tipo: 'RETIRO',
    monto: 500.00,
    saldoAnterior: 1500.75,
    saldoNuevo: 1000.75,
    descripcion: 'Compra en supermercado',
    fecha: '2025-11-03T14:30:00'
  },
  {
    id: 3,
    idCuenta: 1,
    tipo: 'RETIRO',
    monto: 50.00,
    saldoAnterior: 1000.75,
    saldoNuevo: 950.75,
    descripcion: 'Pago de servicio (Agua)',
    fecha: '2025-11-05T10:00:00'
  },

  // movimientos para Cuenta ID 2 (cuentaCorriente)

  {
    id: 4,
    idCuenta: 2,
    tipo: 'DEPOSITO',
    monto: 500.00,
    saldoAnterior: 0.00,
    saldoNuevo: 500.00,
    descripcion: 'Deposito inicial',
    fecha: '2025-01-20T14:30:00'
  }
];

// logica de movimientos

const useMovimientos = (idCuenta) => {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // cargar movimientos de una cuenta (simulado)

  const fetchMovimientosByCuenta = async () => {
    if (!idCuenta) return; // aca no hace nada si no hay un ID

    setLoading(true);
    setError(null);
    try {

      // const response = await axiosInstance.get(API_ENDPOINTS.MOVIMIENTOS.BY_CUENTA(idCuenta)); // para backend real

      console.log(` Usando datos simulados - Conectar con GET /api/movimientos/cuenta/${idCuenta}`);
      await new Promise(resolve => setTimeout(resolve, 600)); // Simular delay
      
      const dataFiltrada = MOCK_MOVIMIENTOS.filter(m => m.idCuenta === idCuenta);
      
      setMovimientos(dataFiltrada);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar movimientos');
      setLoading(false);
    }
  };

  // cargar datos al montar el hook (si hay idCuenta)

  useEffect(() => {
    fetchMovimientosByCuenta();
  }, [idCuenta]); // esto depende de idCuenta

  return {
    movimientos,
    loading,
    error,
    fetchMovimientosByCuenta
  };
};

export default useMovimientos;