
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Grid,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import usePrestamos from '../../api/hooks/usePrestamos';

// validacion Zod 

const prestamoSchema = z.object({
  idCliente: z
    .string() // lo pido como string luego lo convierto
    .min(1, 'El ID del cliente es requerido'),
  monto: z
    .number({ invalid_type_error: 'Debe ser un numero' })
    .min(100, 'El monto minimo es $100.00'),
  plazoAnios: z
    .number({ invalid_type_error: 'Debe ser un numero' })
    .min(1, 'El plazo minimo es 12 meses')
    .max(30, 'El plazo maximo es 30 años')
});

const FormularioPrestamo = ({ onClose }) => {
  const { createPrestamo } = usePrestamos(false); // No auto-fetch

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(prestamoSchema),
    defaultValues: {
      idCliente: '',
      monto: '',
      plazoAnios: ''
    }
  });

  const onSubmit = async (data) => {

    // convertimos los datos antes de enviar

    const dataLimpia = {
      ...data,
      idCliente: parseInt(data.idCliente, 10),
      monto: parseFloat(data.monto),
      plazoAnios: parseInt(data.plazoAnios, 10)
    };
    
    const result = await createPrestamo(dataLimpia);
    if (result.success) {
      onClose(); 
    } else {
      console.error('Error al crear prestamo');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Alert severity="info" sx={{ mb: 3 }}>
        Complete los datos para la solicitud del prestamo
      </Alert>

      <Grid container spacing={3}>
      
        {/* campo que deberia ser automatico con auth con token de usuario */}

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="ID de Cliente"
            {...register('idCliente')}
            error={!!errors.idCliente}
            helperText={errors.idCliente?.message || "ID del cliente que solicita"}
            disabled={isSubmitting}
          />
        </Grid>

        {/* monto solicitado */}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Monto Solicitado"
            type="number"
            {...register('monto', { valueAsNumber: true })}
            error={!!errors.monto}
            helperText={errors.monto?.message}
            disabled={isSubmitting}
          />
        </Grid>

        {/* plazo en años */}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Plazo (en años)"
            type="number"
            {...register('plazoAnios', { valueAsNumber: true })}
            error={!!errors.plazoAnios}
            helperText={errors.plazoAnios?.message}
            disabled={isSubmitting}
          />
        </Grid>
      </Grid>

      {/* botones */}

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
          {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioPrestamo;