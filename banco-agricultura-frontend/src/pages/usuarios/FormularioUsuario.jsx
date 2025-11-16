import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Grid, TextField, Button, MenuItem, Alert } from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import useUsuarios from '../../api/hooks/useUsuarios';

/**
 * 
 * que hara formulario de usuario?
 * 
 * Validaciones:
 *  Nombre: Requerido, mínimo 2 caracteres
 *  Apellido: Requerido, mínimo 2 caracteres
 *  DUI: Formato válido 12345678-9 (El Salvador)
 *  Email: Formato válido
 *  Telefono: Formato valido 7123-4567
 *  Password: Solo requerido al crear 8 caracteres minimo
 
 */

// validacion con Zod

const usuarioSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener mínimo 2 caracteres')
    .max(50, 'Máximo 50 caracteres'),

  dui: z
    .string()
    .regex(/^\d{8}-\d$/, 'Formato de DUI inválido (ej: 12345678-9)'),
  email: z.string().email('Email inválido').max(100, 'Máximo 100 caracteres'),
  telefono: z
    .string()
    .regex(/^\d{4}-\d{4}$/, 'Formato de teléfono inválido (ej: 7123-4567)'),
  direccion: z
    .string()
    .min(5, 'La dirección debe tener mínimo 5 caracteres')
    .max(200, 'Máximo 200 caracteres'),
  rol: z.enum(
    ['Admin', 'Cajero', 'Cliente', 'GerenteSucursal', 'GerenteGeneral'],
    {
      errorMap: () => ({ message: 'Selecciona un rol válido' }),
    }
  ),
  password: z
    .string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .optional()
    .or(z.literal('')),
});

const FormularioUsuario = ({ usuario, onClose }) => {
  const { createUsuario, updateUsuario } = useUsuarios(false);
  const isEditing = !!usuario;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(usuarioSchema),
    defaultValues: usuario || {
      nombre: '',
      apellido: '',
      dui: '',
      email: '',
      telefono: '',
      direccion: '',
      fechaNacimiento: '',
      rol: 'CLIENTE',
      sucursalId: 1,
      password: '',
    },
  });

  useEffect(() => {
    if (usuario) {
      reset(usuario);
    }
  }, [usuario, reset]);

  const onSubmit = async (data) => {
    console.log(' Datos del formulario:', data);

    const result = isEditing
      ? await updateUsuario(usuario.id, data)
      : await createUsuario(data);

    if (result.success) {
      console.log(' Usuario guardado exitosamente');
      onClose();
    } else {
      console.error(' Error al guardar usuario:', result.message);
    }
  };

  // Lista de sucursales simuladas (Conectar con GET /api/sucursales)

  const sucursales = [
    { id: 1, nombre: 'Central' },
    { id: 2, nombre: 'Sucursal Norte' },
    { id: 3, nombre: 'Sucursal Este' },
    { id: 4, nombre: 'Sucursal Sur' },
  ];

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      {/* informacion importante */}

      <Alert severity='info' sx={{ mb: 3 }}>
        {isEditing
          ? 'Editando usuario existente. Deja la contraseña vacia para mantener la actual'
          : 'Completa todos los campos para crear un nuevo usuario'}
      </Alert>

      <Grid container spacing={3}>
        {/* Nombre */}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Nombre'
            {...register('nombre')}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
            disabled={isSubmitting}
          />
        </Grid>

        {/* Apellido */}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Apellido'
            {...register('apellido')}
            error={!!errors.apellido}
            helperText={errors.apellido?.message}
            disabled={isSubmitting}
          />
        </Grid>

        {/* DUI */}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='DUI'
            placeholder='12345678-9'
            {...register('dui')}
            error={!!errors.dui}
            helperText={errors.dui?.message || 'Formato: 12345678-9'}
            disabled={isSubmitting}
          />
        </Grid>

        {/* Email */}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Email'
            type='email'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isSubmitting}
          />
        </Grid>

        {/* telefono */}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Teléfono'
            placeholder='7123-4567'
            {...register('telefono')}
            error={!!errors.telefono}
            helperText={errors.telefono?.message || 'Formato: 7123-4567'}
            disabled={isSubmitting}
          />
        </Grid>

        {/* fecha de nacimiento */}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Fecha de Nacimiento'
            type='date'
            {...register('fechaNacimiento')}
            error={!!errors.fechaNacimiento}
            helperText={errors.fechaNacimiento?.message}
            disabled={isSubmitting}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* direccion */}

        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Dirección'
            multiline
            rows={2}
            {...register('direccion')}
            error={!!errors.direccion}
            helperText={errors.direccion?.message}
            disabled={isSubmitting}
          />
        </Grid>

        {/* Rol */}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label='Rol'
            {...register('rol')}
            error={!!errors.rol}
            helperText={errors.rol?.message}
            disabled={isSubmitting}
          >
            <MenuItem value='Admin'>👑 Administrador</MenuItem>
            <MenuItem value='Cliente'>👨‍💼 cliente</MenuItem>
            <MenuItem value='Cajero'>👤 cajero</MenuItem>
            <MenuItem value='GerenteSucursal'>👨‍💼 Gerente Sucursal</MenuItem>
            <MenuItem value='GerenteGeneral'>👨‍💼 Gerente General</MenuItem>
          </TextField>
        </Grid>

        {/* sucursal */}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label='Sucursal'
            {...register('sucursalId', { valueAsNumber: true })}
            error={!!errors.sucursalId}
            helperText={errors.sucursalId?.message}
            disabled={isSubmitting}
          >
            {sucursales.map((sucursal) => (
              <MenuItem key={sucursal.id} value={sucursal.id}>
                {sucursal.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* contraseña (solo al crear o si se quiere cambiar) */}

        <Grid item xs={12}>
          <TextField
            fullWidth
            label={isEditing ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
            type='password'
            {...register('password')}
            error={!!errors.password}
            helperText={
              errors.password?.message ||
              (isEditing ? 'Deja vacío para mantener la contraseña actual' : '')
            }
            disabled={isSubmitting}
          />
        </Grid>
      </Grid>

      {/* botones de accin */}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button
          variant='outlined'
          startIcon={<Cancel />}
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            borderColor: '#999',
            color: '#666',
            '&:hover': {
              borderColor: '#666',
              bgcolor: '#F5F5F5',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          variant='contained'
          startIcon={<Save />}
          disabled={isSubmitting}
          sx={{
            bgcolor: '#0E9A9A',
            '&:hover': {
              bgcolor: '#0A7070',
            },
          }}
        >
          {isSubmitting
            ? 'Guardando...'
            : isEditing
            ? 'Actualizar'
            : 'Crear Usuario'}
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioUsuario;
