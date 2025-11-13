import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TrendingDown, TrendingUp } from "@mui/icons-material";

import useMovimientos from "../../api/hooks/useMovimientos";
import { formatCurrency, formatDate } from "@utils/formatters";

// componente que espera recibir el ID de la cuenta

const Movimientos = ({ idCuenta, saldoActual }) => {
  const { movimientos, loading } = useMovimientos(idCuenta);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Historial de Movimientos
      </Typography>
      <Typography variant="body1" gutterBottom>
        Saldo Actual:
        <strong style={{ color: "#0E9A9A" }}>
          {" "}
          {formatCurrency(saldoActual)}
        </strong>
      </Typography>

      {/* mostrar tabla de movimientos */}

      <TableContainer component={Paper} sx={{ mt: 2, bgcolor: "white" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#F5F5F5" }}>
            <TableRow>
              <TableCell>
                <strong>Fecha</strong>
              </TableCell>
              <TableCell>
                <strong>Descripción</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Monto</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Balance</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Cargando historial...
                </TableCell>
              </TableRow>
            )}
            {!loading && movimientos.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay movimientos en esta cuenta
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              movimientos.map((mov) => (
                <TableRow key={mov.id} hover>
                  <TableCell>{formatDate(mov.fecha, true)}</TableCell>
                  <TableCell>{mov.descripcion}</TableCell>

                  {/* celda de monto con diferenciador de color */}

                  <TableCell align="right">
                    <Box
                      sx={{
                        color:
                          mov.tipo === "RETIRO" ? "error.main" : "success.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        fontWeight: "bold",
                      }}
                    >
                      {mov.tipo === "RETIRO" ? (
                        <TrendingDown sx={{ mr: 0.5, fontSize: "1rem" }} />
                      ) : (
                        <TrendingUp sx={{ mr: 0.5, fontSize: "1rem" }} />
                      )}
                      {mov.tipo === "RETIRO" ? "-" : "+"}
                      {formatCurrency(mov.monto)}
                    </Box>
                  </TableCell>

                  {/* Saldo despues de la transaccion */}

                  <TableCell align="right">
                    {formatCurrency(mov.saldoNuevo)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Movimientos;
