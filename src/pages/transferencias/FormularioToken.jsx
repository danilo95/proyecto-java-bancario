

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Typography,
  Paper
} from '@mui/material';
import { AddCard } from '@mui/icons-material';
import useTokenTransaccion from '../../api/hooks/useTokenTransaccion';

// validacion zod 

const tokenSchema = z.object({
  idCuenta: z
    .number({ invalid_type_error: 'Debes seleccionar una cuenta' })
    .min(1, 'Selecciona una cuenta'),
  monto: z
    .number({ invalid_type_error: 'Debe ser un número' })
    .min(1, 'El monto debe ser mayor a $0.00'),
  tipo: z
    .enum(['RETIRO', 'INGRESO'], {
      errorMap: () => ({ message: 'Selecciona un tipo' })
    })
});

// cuentas simuladas

const MOCK_CUENTAS_USUARIO = [
  { id: 1, numeroCuenta: '0011223344', saldo: 1500.75 },
  { id: 2, numeroCuenta: '0011225566', saldo: 500.00 }
];


const FormularioToken = ({ onTokenGenerado }) => {
  const { createToken, loading } = useTokenTransaccion(false); // No auto-fetch

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      idCuenta: 0, 
      monto: '',
      tipo: 'RETIRO'
    }
  });

  const onSubmit = async (data) => {
    const dataLimpia = {
      ...data,
      monto: parseFloat(data.monto)
    };
    
    const result = await createToken(dataLimpia);
    if (result.success) {
      onTokenGenerado(result.data); // pasamos el nuevo token al padre
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ p: 3, border: '1px dashed #0E9A9A' }}>
        <Typography variant="h6" color="#0E9A9A" gutterBottom>
          Generar Nuevo Token
        </Typography>
        
        <TextField
          fullWidth
          select
          label="Cuenta"
          margin="normal"
          {...register('idCuenta', { valueAsNumber: true })}
          error={!!errors.idCuenta}
          helperText={errors.idCuenta?.message || "Selecciona la cuenta "}
          disabled={loading}
        >
          <MenuItem value={0} disabled>Selecciona una cuenta</MenuItem>
          {MOCK_CUENTAS_USUARIO.map(cuenta => (
            <MenuItem key={cuenta.id} value={cuenta.id}>
              {cuenta.numeroCuenta} (Saldo: ${cuenta.saldo})
            </MenuItem>
          ))}
        </TextField>
        
        <TextField
          fullWidth
          label="Monto"
          type="number"
          margin="normal"
          {...register('monto', { valueAsNumber: true })}
          error={!!errors.monto}
          helperText={errors.monto?.message}
          disabled={loading}
        />
        
        <TextField
          fullWidth
          select
          label="Tipo de Transacción"
          margin="normal"
          {...register('tipo')}
          error={!!errors.tipo}
          helperText={errors.tipo?.message}
          disabled={loading}
        >
          <MenuItem value="RETIRO">RETIRO (Para sacar dinero)</MenuItem>
          <MenuItem value="INGRESO">INGRESO (Para depositar dinero)</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <AddCard />}
          disabled={loading}
          size="large"
          fullWidth
          sx={{ mt: 2, bgcolor: '#0E9A9A' }}
        >
          {loading ? 'Generando...' : 'Generar Token'}
        </Button>
      </Paper>
    </Box>
  );
};

export default FormularioToken;