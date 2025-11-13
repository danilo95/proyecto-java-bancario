

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress // Para mostrar un spinner de carga
} from '@mui/material';
import { Send, CheckCircle } from '@mui/icons-material';
import useTransferencias from '../../api/hooks/useTransferencias';

// validacion zod

const transferenciaSchema = z.object({
  cuentaOrigen: z
    .string()
    .length(10, 'El N° de cuenta debe tener 10 digitos'),
  cuentaDestino: z
    .string()
    .length(10, 'El N° de cuenta debe tener 10 digitos'),
  monto: z
    .number({ invalid_type_error: 'Debe ser un numero' })
    .min(0.01, 'El monto debe ser mayor a $0.00')
});

const FormularioTransferencia = () => {
  const { createTransferencia, loading, error } = useTransferencias();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset // Para limpiar el formulario
  } = useForm({
    resolver: zodResolver(transferenciaSchema),
    defaultValues: {
      cuentaOrigen: '',
      cuentaDestino: '',
      monto: ''
    }
  });

  const onSubmit = async (data) => {
    setSuccess(false); // resetea el estado de exito en cada envio
    
    const dataLimpia = {
      ...data,
      monto: parseFloat(data.monto) // aseguramos que sea numero
    };

    const result = await createTransferencia(dataLimpia);
    if (result.success) {
      setSuccess(true);
      reset(); // limpia el formulario
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      
      {/* mostrar mensaje de estado */}

      {success && (
        <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 2 }}>
          ¡Transferencia realizada con éxito!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Cuenta Origen"
        placeholder="0011223344"
        margin="normal"
        {...register('cuentaOrigen')}
        error={!!errors.cuentaOrigen}
        helperText={errors.cuentaOrigen?.message}
        disabled={loading}
      />
      
      <TextField
        fullWidth
        label="Cuenta Destino"
        placeholder="0011225566"
        margin="normal"
        {...register('cuentaDestino')}
        error={!!errors.cuentaDestino}
        helperText={errors.cuentaDestino?.message}
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Monto a Transferir"
        type="number"
        placeholder="100.00"
        margin="normal"
        {...register('monto', { valueAsNumber: true })}
        error={!!errors.monto}
        helperText={errors.monto?.message}
        disabled={loading}
      />

      {/* boton de acciones */}
      
      <Button
        type="submit"
        variant="contained"
        startIcon={loading ? <CircularProgress size={20} /> : <Send />}
        disabled={loading}
        size="large"
        fullWidth
        sx={{ mt: 2, bgcolor: '#0E9A9A' }}
      >
        {loading ? 'Procesando...' : 'Realizar Transferencia'}
      </Button>
    </Box>
  );
};

export default FormularioTransferencia;