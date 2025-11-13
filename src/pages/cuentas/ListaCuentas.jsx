import { useState } from "react";
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
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Visibility, Lock, LockOpen, Close } from "@mui/icons-material";

import useCuentas from "../../api/hooks/useCuentas";
import FormularioCuenta from "./FormularioCuenta";
import { formatCurrency, formatDate } from "@utils/formatters";
import Movimientos from "../movimientos/Movimientos";

const ListaCuentas = () => {
  const { cuentas, loading, actualizarEstadoCuenta } = useCuentas();
  const [openFormDialog, setOpenFormDialog] = useState(false);

  // mostrar movimientos

  const [openMovDialog, setOpenMovDialog] = useState(false);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);

  // gestion de movimientos

  const handleCreate = () => setOpenFormDialog(true);
  const handleCloseFormDialog = () => setOpenFormDialog(false);

  const handleOpenMovDialog = (cuenta) => {
    setCuentaSeleccionada(cuenta);
    setOpenMovDialog(true);
  };
  const handleCloseMovDialog = () => {
    setOpenMovDialog(false);
    setCuentaSeleccionada(null);
  };

  // cambiar estado

  const handleUpdateState = (id, estado) => {
    const nuevoEstado = estado === "ACTIVA" ? "CONGELADA" : "ACTIVA";
    actualizarEstadoCuenta(id, nuevoEstado);
  };

  const getEstadoColor = (estado) => {
    return estado === "ACTIVA" ? "success" : "default";
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: "white" }}>
          Mis Cuentas Bancarias
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreate}
          sx={{ bgcolor: "white", color: "#0E9A9A" }}
        >
          Solicitar Cuenta
        </Button>
      </Box>

      {/* mostrar tabla de cuentas */}

      <TableContainer component={Paper} sx={{ bgcolor: "white" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#F5F5F5" }}>
            <TableRow>
              <TableCell>
                <strong>N° de Cuenta</strong>
              </TableCell>
              <TableCell>
                <strong>Tipo</strong>
              </TableCell>
              <TableCell>
                <strong>Saldo Disponible</strong>
              </TableCell>
              <TableCell>
                <strong>Estado</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha Apertura</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Cargando...
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              cuentas.map((cuenta) => (
                <TableRow key={cuenta.id} hover>
                  <TableCell sx={{ fontFamily: "monospace" }}>
                    {cuenta.numeroCuenta}
                  </TableCell>
                  <TableCell>{cuenta.tipo}</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">
                      {formatCurrency(cuenta.saldo)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cuenta.estado}
                      color={getEstadoColor(cuenta.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(cuenta.fechaApertura)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Ver Movimientos">
                      <IconButton
                        size="small"
                        sx={{ color: "#0E9A9A" }}
                        onClick={() => handleOpenMovDialog(cuenta)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>

                    {/* contenido para roles Admin/Empleado/gerentes */}

                    <Tooltip
                      title={
                        cuenta.estado === "ACTIVA" ? "Congelar" : "Activar"
                      }
                    >
                      <IconButton
                        size="small"
                        color={cuenta.estado === "ACTIVA" ? "error" : "success"}
                        onClick={() =>
                          handleUpdateState(cuenta.id, cuenta.estado)
                        }
                      >
                        {cuenta.estado === "ACTIVA" ? <Lock /> : <LockOpen />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* mensaje para crear */}

      <Dialog
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "#0E9A9A", color: "white" }}>
          Solicitar Nueva Cuenta
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <FormularioCuenta onClose={handleCloseFormDialog} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openMovDialog}
        onClose={handleCloseMovDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            bgcolor: "#0E9A9A",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Detalle de Cuenta: {cuentaSeleccionada?.numeroCuenta}
          <IconButton onClick={handleCloseMovDialog} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: 3, bgcolor: "#F9F9F9" }}>

          {/* componente de movimientos solo si hay una cuenta */}

          {cuentaSeleccionada && (
            <Movimientos
              idCuenta={cuentaSeleccionada.id}
              saldoActual={cuentaSeleccionada.saldo}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseMovDialog}
            color="primary"
            variant="outlined"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListaCuentas;
