

import { useState } from 'react';
// import axiosInstance from '../../api/axios.config'; // hook nuevo para el backend
// import API_ENDPOINTS from '../../api/endpoints'; // hook nuevo para el backend

//  función crear

const useTransferencias = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // crear una nueva transferencia (simulado)

  const createTransferencia = async (transferenciaData) => {
    setLoading(true);
    setError(null);
    try {

      // const response = await axiosInstance.post(API_ENDPOINTS.TRANSFERENCIAS.CREATE, transferenciaData); para el backend

      console.log(' Crear transferencia (simulado):', transferenciaData);
      
      // validacion para el backend simulado

      if (transferenciaData.monto > 1000) {

        // simular un error del negocio

        throw new Error("Fondos insuficientes (simulado)");
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // simular delay de red
            
      setLoading(false);
      return { success: true };
      
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error al procesar transferencia');
      return { success: false, message: err.message };
    }
  };

  return {
    loading,
    error,
    createTransferencia
  };
};

export default useTransferencias;