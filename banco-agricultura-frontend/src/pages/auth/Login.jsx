
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '@context/AuthContext';
import { loginSchema } from '@utils/validators';

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    const result = await login(data.email, data.password);

    if (!result.success) {
      setError(result.message || 'Error al iniciar sesion');
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #2E7D32 0%, #60AD5E 100%)',
        p: 2
      }}
    >
      <Card sx={{ maxWidth: 450, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>

          {/* logo y titulo */}

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                bgcolor: '#2E7D32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              BAS
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Banco de Agricultura Salvadoreño
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ingresa tus credenciales para continuar
            </Typography>
          </Box>

          {/* mensaje de error */}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Formulario */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
              InputProps={{ /* ignorar */
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              startIcon={<LoginIcon />}
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Bienvenido, iniciando sesion...' : 'Iniciar Sesion'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link href="#" underline="hover" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
          </form>

          {/* Credenciales de prueba demostraacion */}

          <Box sx={{ mt: 4, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              <strong>Credenciales de prueba:</strong>
            </Typography>
            <Typography variant="caption" display="block">
               Admin: baneAdmin@banco.com / admin123
            </Typography>
            <Typography variant="caption" display="block">
               Empleado: empleado@banco.com / emp123
            </Typography>
            <Typography variant="caption" display="block">
               Cliente: cliente@banco.com / cli123
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;