

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
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
  DialogContent
} from '@mui/material';
import { Add, CheckCircle, Cancel, HourglassEmpty } from '@mui/icons-material';

import usePrestamos from '../../api/hooks/usePrestamos';
import FormularioPrestamo from './FormularioPrestamo'; // importamos el form
import { formatCurrency } from '@utils/formatters'; // usamos el formatter

const ListaPrestamos = () => {
  const { prestamos, loading, actualizarEstadoPrestamo } = usePrestamos();
  const [openDialog, setOpenDialog] = useState(false);

  // modal para crear

  const handleCreate = () => {
    setOpenDialog(true);
  };

  // cerrar modal

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // manejar aprobaciones/rechazo

  const handleUpdateState = (id, estado) => {
    console.log(`Cambiando ${id} a ${estado}`);
    actualizarEstadoPrestamo(id, estado);
  };
  
  // colores y iconos para el estado

  const getEstadoStyle = (estado) => {
    switch (estado) {
      case 'APROBADO':
        return { color: 'success', icon: <CheckCircle /> };
      case 'RECHAZADO':
        return { color: 'error', icon: <Cancel /> };
      case 'EN_ESPERA':
        return { color: 'warning', icon: <HourglassEmpty /> };
      default:
        return { color: 'default', icon: <></> };
    }
  };

  return (
    <Box>

      {/* encabezado */}

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3
      }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
          Gestion de Prestamos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreate}
          sx={{ bgcolor: 'white', color: '#0E9A9A' }}
        >
          Solicitar Prestamo
        </Button>
      </Box>

      {/* mostrar tabla de prestamos */}

      <TableContainer component={Paper} sx={{ bgcolor: 'white' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F5F5F5' }}>
            <TableRow>
              <TableCell><strong>Nombre Cliente</strong></TableCell>
              <TableCell><strong>Monto Solicitado</strong></TableCell>
              <TableCell><strong>Años Plazo</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} align="center">Cargando...</TableCell>
              </TableRow>
            )}
            {!loading && prestamos.map((prestamo) => {
              const { color, icon } = getEstadoStyle(prestamo.estado);
              return (
                <TableRow key={prestamo.id} hover>
                  <TableCell>{prestamo.nombreCliente}</TableCell>
                  <TableCell>{formatCurrency(prestamo.monto)}</TableCell>
                  <TableCell>{prestamo.plazoAnios} años</TableCell>
                  <TableCell>
                    <Chip
                      icon={icon}
                      label={prestamo.estado}
                      color={color}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">

                    {/*  botones solo si esta en espera */}

                    {prestamo.estado === 'EN_ESPERA' ? (
                      <>
                        <Tooltip title="Aprobar">
                          <Button
                            size="small"
                            color="success"
                            variant="outlined"
                            onClick={() => handleUpdateState(prestamo.id, 'APROBADO')}
                            sx={{ mr: 1 }}
                          >
                            Aprobar
                          </Button>
                        </Tooltip>
                        <Tooltip title="Rechazar">
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => handleUpdateState(prestamo.id, 'RECHAZADO')}
                          >
                            Rechazar
                          </Button>
                        </Tooltip>
                      </>
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        Gestionado
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* mensaje para crear */}

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#0E9A9A', color: 'white' }}>
          Nueva Solicitud de Prestamo
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <FormularioPrestamo onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ListaPrestamos;