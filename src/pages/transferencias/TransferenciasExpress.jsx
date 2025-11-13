


import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid,
  Alert,
  Chip
} from '@mui/material';
import FormularioToken from './FormularioToken';
import useTokenTransaccion from '../../api/hooks/useTokenTransaccion';
import { formatCurrency, formatDate } from '@utils/formatters';

const TransferenciasExpress = () => {

  // usamos el hook para listar tokens existentes

  const { tokens, loading } = useTokenTransaccion(true);
  
  // estado para mostrar el token recien generado

  const [nuevoToken, setNuevoToken] = useState(null);

  const handleTokenGenerado = (token) => {
    setNuevoToken(token);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ color: 'white', mb: 3 }}>
        Transferencias Express (Token)
      </Typography>

      <Grid container spacing={4}>
        
        {/* Formulario para generar token */}

        <Grid item xs={12} md={5}>
          <FormularioToken onTokenGenerado={handleTokenGenerado} />
        </Grid>

        {/* Lista de tokens activos */}

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, bgcolor: 'white' }}>
            <Typography variant="h6" color="#0E9A9A" gutterBottom>
              Tokens Activos
            </Typography>
            
            {/* mostrar token recien generado */}

            {nuevoToken && (
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">¡Token generado!</Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ textAlign: 'center' }}>
                  {nuevoToken.token}
                </Typography>
                <Typography variant="caption" display="block" sx={{ textAlign: 'center' }}>
                  Expira en 24 horas (simulado)
                </Typography>
              </Alert>
            )}

            {loading && <Typography>Cargando tokens...</Typography>}
            
            {/* lista de tokens pendientes */}
            
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              {tokens.length === 0 && !loading && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                  No tienes tokens pendientes.
                </Typography>
              )}
              
              {tokens.map(token => (
                <Paper key={token.idToken} variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: 'monospace', color: '#0A7070' }}>
                      {token.token}
                    </Typography>
                    <Chip 
                      label={token.tipo} 
                      color={token.tipo === 'RETIRO' ? 'error' : 'success'} 
                      size="small" 
                    />
                  </Box>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(token.monto)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Generado: {formatDate(token.fechaCreacion, true)}
                  </Typography>
                </Paper>
              ))}
            </Box>

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransferenciasExpress;