import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios.config';
import API_ENDPOINTS from '../../api/endpoints';

const useUsuarios = (autoFetch = true) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(API_ENDPOINTS.USUARIOS.LIST);

      setUsuarios(response.data);
      setLoading(false);

      return { success: true, data: response.data };
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || 'Error al cargar usuarios';
      setError(message);

      return { success: false, message };
    }
  };

  const createUsuario = async (data) => {
    setLoading(true);
    setError(null);

    const formatedData = {
      nombre: `${data.nombre} ${data.apellido}`,
      dui: data.dui,
      direccion: data.direccion,
      telefono: data.telefono,
      correo: data.email,
      password: data.password,
      rol: data.rol,
      salario: 0,
    };

    try {
      await axiosInstance.post(API_ENDPOINTS.USUARIOS.CREATE, formatedData);
      await fetchUsuarios();

      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || 'Error al crear usuario';
      setError(message);

      return { success: false, message };
    }
  };

  const updateUsuario = async (id, data) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.put(API_ENDPOINTS.USUARIOS.UPDATE(id), data);
      await fetchUsuarios();

      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);

      const message =
        err.response?.data?.message || 'Error al actualizar usuario';
      setError(message);

      return { success: false, message };
    }
  };

  const deleteUsuario = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(API_ENDPOINTS.USUARIOS.DELETE(id));
      await fetchUsuarios();

      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);

      const message =
        err.response?.data?.message || 'Error al eliminar usuario';
      setError(message);

      return { success: false, message };
    }
  };

  const searchByDUI = async (dui) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.USUARIOS.SEARCH_BY_DUI,
        { params: { dui } }
      );

      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setLoading(false);

      const message = err.response?.data?.message || 'Error al buscar usuario';
      setError(message);

      return { success: false, message };
    }
  };

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
    searchByDUI,
  };
};

export default useUsuarios;
