import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  Visibility,
  PersonAdd
} from '@mui/icons-material';

import useUsuarios from '../../api/hooks/useUsuarios'; 
import FormularioUsuario from './FormularioUsuario';
import { formatDate } from '@utils/formatters';
import { Crown, Briefcase, User, HelpCircle } from "lucide-react";

/**
    Que hara Lista de Usuarios?
  ============================================
  
   Ver todos los usuarios en tabla
   Buscar por nombre DUI o email
   Crear nuevo usuario
   Editar usuario existente
   Eliminar usuario
   Filtrar por rol
   Indicadores de estado
  
  ============================================
 */

const ListaUsuarios = () => {
  const { usuarios, loading, deleteUsuario, searchByDUI } = useUsuarios(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);

  // busqueda filtrada de usuarios

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.dui?.includes(searchTerm) ||
    usuario.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // crear nuevo usuario

  const handleCreate = () => {
    setSelectedUsuario(null);
    setOpenDialog(true);
  };

  // editar usuario

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setOpenDialog(true);
  };

  // abrir dialogo de confirmacion de eliminacion

  const handleDeleteClick = (usuario) => {
    setUsuarioToDelete(usuario);
    setDeleteDialogOpen(true);
  };

  // confirmar eliminacion

  const handleDeleteConfirm = async () => {
    if (usuarioToDelete) {
      const result = await deleteUsuario(usuarioToDelete.id);
      if (result.success) {
        console.log('Usuario eliminado exitosamente');
      }
      setDeleteDialogOpen(false);
      setUsuarioToDelete(null);
    }
  };

  // cierre del modal

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUsuario(null);
  };

  // color segun el rol (falta agregar mas roles)

  const getRolColor = (rol) => {
    switch (rol) {
      case 'ADMIN':
        return 'error';
      case 'EMPLEADO':
        return 'primary';
      case 'CLIENTE':
        return 'success';
      default:
        return 'default';
    }
  };

  // icono segun el rol

  const getRolIcon = (rol) => {
    switch (rol) {
      case 'ADMIN':
        return <Crown size={20} color="#FFD700" />;
      case 'EMPLEADO':
        return <Briefcase size={20} color="#4A5568" />;
      case 'CLIENTE':
        return <User size={20} color="#3182CE" />;
      default:
        return <HelpCircle size={20} color="gray" />;
    }
  };

  if (loading && usuarios.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Cargando usuarios...</Typography>
      </Box>
    );
  }

  return (
    <Box>

      {/* encabezado */}

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
            Gestion de Usuarios
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Administra los usuarios del sistema bancario
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={handleCreate}
          sx={{
            bgcolor: 'white',
            color: '#0E9A9A',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)'
            }
          }}
        >
          Nuevo Usuario
        </Button>
      </Box>

      {/* Buscador y filtros */}

      <Paper sx={{ p: 2, mb: 3, bgcolor: 'white' }}>
        <TextField
          fullWidth
          placeholder="Buscar por nombre, apellido, DUI o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#0E9A9A' }} />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#0E9A9A'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0E9A9A'
              }
            }
          }}
        />
      </Paper>

      {/* mostrar resultados */}

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Mostrando {filteredUsuarios.length} de {usuarios.length} usuarios
        </Typography>
      </Box>

      {/* tabla de usuarios */}

      {filteredUsuarios.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'white' }}>
          <Search sx={{ fontSize: 60, color: '#CCC', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No se encontraron usuarios
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Prueba otro tipo de busqueda
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ bgcolor: 'white' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#F5F5F5' }}>
              <TableRow>
                <TableCell><strong>Nombre Completo</strong></TableCell>
                <TableCell><strong>DUI</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Teléfono</strong></TableCell>
                <TableCell><strong>Rol</strong></TableCell>
                <TableCell><strong>Sucursal</strong></TableCell>
                <TableCell><strong>Estado</strong></TableCell>
                <TableCell align="center"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsuarios.map((usuario) => (
                <TableRow 
                  key={usuario.id} 
                  hover
                  sx={{ '&:hover': { bgcolor: '#F9F9F9' } }}
                >
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {usuario.nombre} {usuario.apellido}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Registrado: {formatDate(usuario.fechaCreacion)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {usuario.dui}
                    </Typography>
                  </TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.telefono}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${getRolIcon(usuario.rol)} ${usuario.rol}`}
                      color={getRolColor(usuario.rol)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{usuario.sucursal}</TableCell>
                  <TableCell>
                    <Chip
                      label={usuario.estado ? 'ACTIVO' : 'INACTIVO'}
                      color={usuario.estado ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Ver detalles">
                      <IconButton size="small" sx={{ color: '#0E9A9A' }}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton 
                        size="small" 
                        sx={{ color: '#FFA726' }}
                        onClick={() => handleEdit(usuario)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(usuario)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* formulario crear editar */}

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#0E9A9A', color: 'white' }}>
          {selectedUsuario ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <FormularioUsuario
            usuario={selectedUsuario}
            onClose={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      {/* mensaje confirmacion eliminacion de usuario */}

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ color: '#0E9A9A' }}>
          Confirmar Eliminacion
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Esta accion no se puede deshacer
          </Alert>
          <Typography>
            ¿Estas seguro de eliminar al usuario <strong>{usuarioToDelete?.nombre} {usuarioToDelete?.apellido}</strong>?
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            DUI: {usuarioToDelete?.dui}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListaUsuarios;