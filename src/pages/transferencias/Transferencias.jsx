

import { Box, Paper, Typography } from '@mui/material';
import FormularioTransferencia from './FormularioTransferencia';

const Transferencias = () => {
  return (
    <Box>

      {/* encabezado */}

      <Typography variant="h4" fontWeight="bold" sx={{ color: 'white', mb: 3 }}>
        Transferencias Bancarias
      </Typography>

      {/* contenedor del formulario */}

      <Paper sx={{ 
        bgcolor: 'white', 
        maxWidth: '600px', 
        margin: '0 auto', 
        p: 3 
      }}>
        <Typography variant="h6" color="#0E9A9A" gutterBottom>
          Ingreso de Fondos
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Completa los datos para transferencia de fondos entre cuentas
        </Typography>
        
        <FormularioTransferencia />
      </Paper>
    </Box>
  );
};

export default Transferencias;