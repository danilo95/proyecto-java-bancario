
const API_ENDPOINTS = {

  
  // Autenticacion 
  

  AUTH: {
    
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me'
  },

  
  // (Tabla: Usuario)
  // Campos según diagrama: id, nombre, apellido, dui, email, password, telefono, direccion, 
  //                        fecha_nacimiento, rol, sucursal_id, estado, fecha_creacion
  // Relaciones: FK sucursal_id -> Sucursal
  
  USUARIOS: {


    LIST: '/usuarios',
    
    

    CREATE: '/usuarios',
    
    GET_BY_ID: (id) => `/usuarios/${id}`,
    
    UPDATE: (id) => `/usuarios/${id}`,
    
    DELETE: (id) => `/usuarios/${id}`,
    
    

    SEARCH_BY_DUI: '/usuarios/buscar',
    
    CHANGE_PASSWORD: '/usuarios/cambiar-password'
  },

  
  // (Tabla: Sucursal)
  // Campos: id, nombre, direccion, telefono, ciudad, estado, fecha_apertura
  
  SUCURSALES: {
    LIST: '/sucursales',
    CREATE: '/sucursales',
    GET_BY_ID: (id) => `/sucursales/${id}`,
    UPDATE: (id) => `/sucursales/${id}`,
    DELETE: (id) => `/sucursales/${id}`
  },

  
  // (Tabla: Cuenta)
  // Campos: id, numero_cuenta, usuario_id, tipo, saldo, estado, fecha_apertura, sucursal_id
  // Relaciones: FK usuario_id -> Usuario, FK sucursal_id -> Sucursal
  // 
  CUENTAS: {

    

    LIST: '/cuentas',
    
    

    CREATE: '/cuentas',
    
    GET_BY_ID: (id) => `/cuentas/${id}`,
    UPDATE: (id) => `/cuentas/${id}`,
    DELETE: (id) => `/cuentas/${id}`,
    
    

    BY_USUARIO: (usuarioId) => `/cuentas/usuario/${usuarioId}`,
    
    SEARCH: '/cuentas/buscar'
  },

  
  //  (Tabla: Prestamo)
  // Campos: id, usuario_id, monto, tasa_interes, plazo_meses, cuota_mensual, 
  //         estado, fecha_solicitud, fecha_aprobacion, empleado_id
  // Relaciones: FK usuario_id -> Usuario, FK empleado_id -> Usuario
  
  PRESTAMOS: {
    LIST: '/prestamos',
    CREATE: '/prestamos',
    GET_BY_ID: (id) => `/prestamos/${id}`,
    UPDATE: (id) => `/prestamos/${id}`,
    DELETE: (id) => `/prestamos/${id}`,
    APROBAR: (id) => `/prestamos/${id}/aprobar`,
    RECHAZAR: (id) => `/prestamos/${id}/rechazar`,
    BY_USUARIO: (usuarioId) => `/prestamos/usuario/${usuarioId}`
  },

  
  //  (Tabla: Movimiento)
  // Campos: id, cuenta_id, tipo, monto, saldo_anterior, saldo_nuevo, 
  // descripcion, fecha, empleado_id
  // Relaciones: FK cuenta_id -> Cuenta, FK empleado_id -> Usuario
  
  MOVIMIENTOS: {
    LIST: '/movimientos',
    CREATE: '/movimientos',
    GET_BY_ID: (id) => `/movimientos/${id}`,
    BY_CUENTA: (cuentaId) => `/movimientos/cuenta/${cuentaId}`,
    BY_FECHA: '/movimientos/fecha'
  },

  
  //  (Tabla: Transferencia)
  // Campos: id, cuenta_origen_id, cuenta_destino_id, monto, descripcion, fecha, tipo
  // Relaciones: FK cuenta_origen_id -> Cuenta, FK cuenta_destino_id -> Cuenta
 
  TRANSFERENCIAS: {
    LIST: '/transferencias',
    CREATE: '/transferencias',
    CREATE_EXPRESS: '/transferencias/express',
    GET_BY_ID: (id) => `/transferencias/${id}`,
    HISTORIAL: '/transferencias/historial',
    BY_CUENTA: (cuentaId) => `/transferencias/cuenta/${cuentaId}`
  },

  
  // (Tabla: Dependiente)
  // Campos: id, usuario_id, nombre, apellido, parentesco, fecha_nacimiento
  // Relaciones: FK usuario_id -> Usuario
  
  DEPENDIENTES: {
    LIST: '/dependientes',
    CREATE: '/dependientes',
    GET_BY_ID: (id) => `/dependientes/${id}`,
    UPDATE: (id) => `/dependientes/${id}`,
    DELETE: (id) => `/dependientes/${id}`,
    BY_USUARIO: (usuarioId) => `/dependientes/usuario/${usuarioId}`
  },

  
  // Reportes y Dashboards
  
  REPORTES: {
    DASHBOARD: '/reportes/dashboard',
    ESTADISTICAS: '/reportes/estadisticas',
    EXPORT: '/reportes/export'
  }
};

export default API_ENDPOINTS;
