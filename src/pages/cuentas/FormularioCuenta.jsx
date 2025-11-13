
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Alert
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import useCuentas from '../../api/hooks/useCuentas';

// import { useAuth } from '@context/AuthContext'; // no se usa aun

// validacion Zod 

const cuentaSchema = z.object({
  tipo: z
    .enum(['AHORRO', 'CORRIENTE'], {
      errorMap: () => ({ message: 'Selecciona un tipo de cuenta' })
    }),

  // El idCliente deberia venir del contexto de Auth

  idCliente: z
    .number()
    .min(1, 'ID de cliente invalido')
});

const FormularioCuenta = ({ onClose }) => {
  const { createCuenta } = useCuentas(false);

  // const { user } = useAuth(); // Descomentar al integrar AuthContext con backend

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(cuentaSchema),
    defaultValues: {
      tipo: 'AHORRO',

      // idCliente: user?.id || 3 // Simulado

      idCliente: 3 // Simulado, reemplazar con el ID del usuario logueado de AuthContext backend
    }
  });

  const onSubmit = async (data) => {
    const result = await createCuenta(data);
    if (result.success) {
      onClose(); 
    } else {
      console.error('Error al crear cuenta');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Alert severity="info" sx={{ mb: 3 }}>
        Selecciona el tipo de cuenta que deseas solicitar
      </Alert>

      <Grid container spacing={3}>
      
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Tipo de Cuenta"
            {...register('tipo')}
            error={!!errors.tipo}
            helperText={errors.tipo?.message}
            disabled={isSubmitting}
          >
            <MenuItem value="AHORRO">Cuenta de Ahorro</MenuItem>
            <MenuItem value="CORRIENTE">Cuenta Corriente</MenuItem>
          </TextField>
        </Grid>
        
        {/* idCliente oculto  */}

      </Grid>

      {/* botones de acciones */}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<Cancel />}
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          startIcon={<Save />}
          disabled={isSubmitting}
          sx={{ bgcolor: '#0E9A9A' }}
        >
          {isSubmitting ? 'Enviando...' : 'Solicitar Cuenta'}
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioCuenta;