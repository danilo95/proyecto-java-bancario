
# README.md

#  Banco de Agricultura - Sistema Bancario Frontend

Sistema de gestión bancaria desarrollado con React + Vite + Material UI.

##  Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Backend Java Spring Boot corriendo en `http://localhost:8080`

##  Instalación

\`\`\`bash
# Clonar repositorio
git clone <repo-url>
cd banco-agricultura-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Iniciar servidor de desarrollo
npm run dev
\`\`\`

El proyecto estará disponible en `http://localhost:3000`

##  Estructura del Proyecto

\`\`\`
src/
├── api/              # Configuración Axios y Custom Hooks
├── app/              # Routing y ProtectedRoute
├── components/       # Componentes reutilizables
│   ├── common/       # Componentes comunes
│   ├── forms/        # Componentes de formularios
│   └── layout/       # Layout principal
├── context/          # Context API (Auth, Theme)
├── pages/            # Páginas de la aplicación
│   ├── auth/         # Login
│   ├── dashboard/    # Dashboard
│   ├── cuentas/      # Gestión de cuentas
│   ├── prestamos/    # Gestión de préstamos
│   └── movimientos/  # Transacciones
├── theme/            # Tema Material UI
├── utils/            # Funciones de utilidad
├── App.jsx           # Componente raíz
└── main.jsx          # Punto de entrada
\`\`\`

##  Tecnologías

- **React 18.3.1** - Librería UI
- **Vite 5.4** - Build tool
- **Material UI v6** - Framework de componentes
- **React Router 6.26** - Routing
- **Axios 1.6** - Cliente HTTP
- **React Hook Form 7.53** - Manejo de formularios
- **Zod 3.23** - Validación de esquemas

##  Credenciales de Prueba

\`\`\`
Admin:
  Email: admin@banco.com
  Password: admin123

Empleado:
  Email: empleado@banco.com
  Password: emp123

Cliente:
  Email: cliente@banco.com
  Password: cli123
\`\`\`

##  Integración con Backend

### Endpoints Requeridos

El backend debe implementar los siguientes endpoints:

#### Autenticación
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuario actual

#### Cuentas
- `GET /api/cuentas` - Listar cuentas
- `POST /api/cuentas` - Crear cuenta
- `PUT /api/cuentas/:id` - Actualizar cuenta
- `DELETE /api/cuentas/:id` - Eliminar cuenta

#### Préstamos
- `GET /api/prestamos` - Listar préstamos
- `POST /api/prestamos` - Crear préstamo
- `POST /api/prestamos/:id/aprobar` - Aprobar préstamo
- `POST /api/prestamos/:id/rechazar` - Rechazar préstamo

#### Movimientos
- `GET /api/movimientos` - Listar movimientos
- `POST /api/movimientos` - Crear movimiento

#### Reportes
- `GET /api/reportes/dashboard` - Estadísticas dashboard

### Formato de Response Esperado

\`\`\`json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... }
}
\`\`\`

### Headers Requeridos

\`\`\`
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
\`\`\`

##  Scripts Disponibles

\`\`\`bash
npm run dev       # Iniciar servidor de desarrollo
npm run build     # Construir para producción
npm run preview   # Vista previa de producción
npm run lint      # Ejecutar ESLint
\`\`\`

##  Funcionalidades Principales

### Autenticación
- Login con JWT
- Persistencia de sesión
- Logout
- Protección de rutas

### Dashboard
- Estadísticas generales
- Tarjetas de resumen
- Saludo personalizado

### Gestión de Cuentas
- Listar cuentas
- Crear nueva cuenta
- Editar cuenta
- Eliminar cuenta
- Búsqueda por número/cliente

### Gestión de Préstamos
- Listar préstamos
- Crear préstamo
- Aprobar/Rechazar préstamos
- Filtros por estado

### Movimientos
- Historial de transacciones
- Filtros por fecha
- Indicadores visuales (depósito/retiro)

##  Sistema de Roles

- **ADMIN**: Acceso completo al sistema
- **EMPLEADO**: Gestión de cuentas, préstamos y clientes
- **CLIENTE**: Solo consulta de sus propios datos

##  Personalización

### Cambiar Colores del Tema

Editar `src/theme/theme.js`:

\`\`\`javascript
primary: {
  main: '#2E7D32', // Verde del banco
  light: '#60AD5E',
  dark: '#005005'
},
secondary: {
  main: '#FFA726', // Naranja
  light: '#FFD95B',
  dark: '#C77800'
}
\`\`\`

##  Responsive Design

La aplicación está optimizada para:
-  Mobile (< 600px)
-  Tablet (600px - 960px)
-  Desktop (> 960px)

##  Solución de Problemas

### Error de CORS
Verificar que el backend tenga CORS habilitado para `http://localhost:3000`

### Token Expirado
El sistema redirige automáticamente al login cuando el token expira (error 401)

### Proxy no funciona
Verificar configuración en `vite.config.js` y que el backend esté corriendo en puerto 8080

##  Recursos

- [React Docs](https://react.dev)
- [Material UI](https://mui.com)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)
- [React Hook Form](https://react-hook-form.com)

##  Equipo

Desarrollado para facilitar la integración con el backend Java Spring Boot.


---

**Nota para el equipo de Backend:**
Todos los endpoints están documentados en `src/api/endpoints.js`. Los formatos de request/response esperados están comentados en cada custom hook (`src/api/hooks/`).
=======
#  Banco de Agricultura - Sistema Bancario Frontend

Sistema de gestion bancaria desarrollado con React + Vite + Material UI 

##  Información del Proyecto

- **País:** El Salvador 🇸🇻
- **Documento de Identidad:** DUI (Documento Único de Identidad)
- **Moneda:** Dólares estadounidenses (USD)
- **Stack:** React 18.3.1 + Vite 5.4 + Material UI v6
- **Estado:** Prototipo funcional con datos simulados (mock)

---

##  Requisitos Previos

- **Node.js 18+** o superior
- **npm** o **yarn**
- **Backend Java Spring Boot** (opcional - el frontend funciona con datos mock simulados)

---

##  Instalación Rápida

\`\`\`bash
# 1. Clonar o descargar el proyecto
cd banco-agricultura-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Iniciar servidor de desarrollo
npm run dev
\`\`\`

El proyecto estará disponible en: **http://localhost:3000**

---

##  Paleta de Colores

- **Color Principal:** `#0E9A9A` (Turquesa)
- **Color Secundario:** `#FFA726` (Naranja)
- **Fondo General:** `#0E9A9A` (Turquesa)
- **Tarjetas/Contenido:** `#FFFFFF` (Blanco)
- **Texto sobre fondo turquesa:** `#FFFFFF` (Blanco)

---

##  Estructura del Proyecto

\`\`\`
banco-agricultura-frontend/
├── public/              # Archivos estáticos (logos, imágenes)
├── src/
│   ├── api/            # Configuración de API y llamadas al backend
│   │   ├── axios.config.js      # Configuración base de Axios
│   │   ├── endpoints.js         # Todos los endpoints del backend
│   │   └── hooks/              # Custom Hooks para cada módulo
│   │       ├── useUsuarios.js   # ✅ Hook de usuarios (COMPLETO)
│   │       ├── useSucursales.js # 🔌 Pendiente
│   │       ├── useCuentas.js    # 🔌 Pendiente
│   │       ├── usePrestamos.js  # 🔌 Pendiente
│   │       └── useTransferencias.js # 🔌 Pendiente
│   │
│   ├── pages/          # Páginas de la aplicación
│   │   ├── usuarios/
│   │   │   ├── ListaUsuarios.jsx       # ✅ COMPLETO
│   │   │   └── FormularioUsuario.jsx   # ✅ COMPLETO
│   │   ├── sucursales/    #  Pendiente
│   │   ├── cuentas/       #  Pendiente
│   │   ├── prestamos/     #  Pendiente
│   │   ├── transferencias/ #  Pendiente
│   │   └── dependientes/  #  Pendiente
│   │
│   ├── utils/          # Funciones de utilidad
│   │   └── formatters.js    # Formateo de fechas, moneda, DUI, teléfono
│   │
│   ├── App.jsx         # Componente principal con routing
│   └── main.jsx        # Punto de entrada
│
├── vite.config.js      # Configuración de Vite
├── package.json        # Dependencias del proyecto
└── README.md           # Este archivo
\`\`\`

---

##  Tecnologías y Librerías

### **Core**
- **React 18.3.1** - Librería de UI
- **Vite 5.4** - Build tool y dev server
- **Material UI v6** - Framework de componentes

### **Formularios y Validación**
- **React Hook Form 7.53** - Manejo de formularios
- **Zod 3.23** - Validación de esquemas
- **@hookform/resolvers** - Integración Zod + React Hook Form

### **HTTP y Estado**
- **Axios 1.6** - Cliente HTTP
- **Context API** - Manejo de estado global (sin Redux)

### **Estilos**
- **@emotion/react** - CSS-in-JS
- **@emotion/styled** - Styled components

---

##  Credenciales de Prueba

\`\`\`
 Administrador:
  Email: admin@banco.com
  Password: admin123

 Empleado:
  Email: empleado@banco.com
  Password: emp123

 Cliente:
  Email: cliente@banco.com
  Password: cli123
\`\`\`

---

##  Módulos del Sistema

### ** Módulos Implementados**

#### **1. Autenticación**
- ✅ Login con validación
- ✅ Manejo de sesión
- ✅ Logout
- ✅ Protección de rutas

#### **2. Dashboard**
- ✅ Menu desplegable
- ✅ Navegacion entre modulos
- ✅ Diseño responsivo

#### **3. Gestión de Usuarios**  COMPLETO
- ✅ Lista de usuarios con busqueda
- ✅ Crear nuevo usuario
- ✅ Editar usuario existente
- ✅ Eliminar usuario
- ✅ Validación de DUI (formato salvadoreño)
- ✅ Validación de teléfono (formato salvadoreño)
- ✅ Filtros por rol (Admin, Empleado, Cliente)
- ✅ Indicadores visuales de estado

**Campos del formulario:**
- Nombre y Apellido
- DUI (formato: 12345678-9)
- Email
- Teléfono (formato: 7123-4567)
- Dirección
- Fecha de Nacimiento
- Rol (Admin, Empleado, Cliente)
- Sucursal asignada
- Contraseña (solo al crear)

---

### ** Módulos Pendientes (con estructura preparada)**

#### **4. Gestión de Sucursales**
- Lista de sucursales
- Crear/Editar sucursal
- Campos: Nombre, Dirección, Teléfono, Ciudad, Estado

#### **5. Servicios - Cuentas**
- Lista de cuentas bancarias
- Crear cuenta (Ahorro/Corriente)
- Consultar saldo
- Cambiar estado (Activa/Inactiva/Bloqueada)

#### **6. Servicios - Préstamos**
- Lista de préstamos
- Solicitud de préstamo
- Aprobación/Rechazo (solo empleados/admin)
- Cálculo de cuota mensual

#### **7. Servicios - Transferencias**
- Transferencias normales
- Transferencias express
- Historial de transferencias

#### **8. Dependientes**
- Consultar dependientes
- Agregar dependiente
- Lista de dependientes por usuario

#### **9. Gestiones**
- Gestionar cuentas (reportes, estados)
- Gestionar préstamos (análisis, aprobaciones masivas)

---

##  Integración con Backend

### **Estado Actual: FRONTEND INDEPENDIENTE**

El proyecto actualmente funciona con **datos simulados (mock)** y NO requiere backend para ejecutarse.

### **Cuando el Backend esté listo:**

Todos los custom hooks están preparados para conectarse automáticamente. Solo necesitas:

1. Asegurarte de que el backend esté corriendo en `http://localhost:8080`
2. En cada custom hook (`src/api/hooks/*.js`), **descomentar** las líneas marcadas  ``
3. **Comentar** las líneas de datos mock

**Ejemplo en `useUsuarios.js`:**

\`\`\`javascript
// DESCOMENTAR ESTO:
const response = await axiosInstance.get(API_ENDPOINTS.USUARIOS.LIST);
setUsuarios(response.data.data || response.data);

// COMENTAR ESTO:
// setUsuarios(MOCK_USUARIOS);
\`\`\`

---

### **Endpoints del Backend (Todos documentados en src/api/endpoints.js)**

#### **Autenticación**
- `POST /api/auth/login` - Login con email/password
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Usuario autenticado actual

#### **Usuarios**
- `GET /api/usuarios` - Listar todos
- `POST /api/usuarios` - Crear usuario
- `GET /api/usuarios/:id` - Obtener por ID
- `PUT /api/usuarios/:id` - Actualizar
- `DELETE /api/usuarios/:id` - Eliminar
- `GET /api/usuarios/buscar?dui=12345678-9` - Buscar por DUI
- `POST /api/usuarios/cambiar-password` - Cambiar contraseña

#### **Sucursales**
- `GET /api/sucursales` - Listar todas
- `POST /api/sucursales` - Crear
- `PUT /api/sucursales/:id` - Actualizar
- `DELETE /api/sucursales/:id` - Eliminar

#### **Cuentas**
- `GET /api/cuentas` - Listar todas
- `POST /api/cuentas` - Crear
- `GET /api/cuentas/usuario/:usuarioId` - Cuentas de un usuario
- `PUT /api/cuentas/:id` - Actualizar
- `DELETE /api/cuentas/:id` - Eliminar

#### **Préstamos**
- `GET /api/prestamos` - Listar todos
- `POST /api/prestamos` - Solicitar
- `POST /api/prestamos/:id/aprobar` - Aprobar
- `POST /api/prestamos/:id/rechazar` - Rechazar
- `GET /api/prestamos/usuario/:usuarioId` - Préstamos de un usuario

#### **Transferencias**
- `GET /api/transferencias` - Listar todas
- `POST /api/transferencias` - Crear transferencia
- `POST /api/transferencias/express` - Transferencia express
- `GET /api/transferencias/historial` - Historial completo

#### **Dependientes**
- `GET /api/dependientes` - Listar todos
- `POST /api/dependientes` - Agregar
- `GET /api/dependientes/usuario/:usuarioId` - Dependientes de un usuario
- `PUT /api/dependientes/:id` - Actualizar
- `DELETE /api/dependientes/:id` - Eliminar

#### **Reportes**
- `GET /api/reportes/dashboard` - Estadísticas generales

---

### **Formato de Respuesta Estándar**

Todas las respuestas del backend deben seguir este formato:

\`\`\`json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "banne",
    "email": "banne@banco.com"
  },
  "message": "Operacion exitosa"
}
\`\`\`

Para errores:

\`\`\`json
{
  "success": false,
  "data": null,
  "message": "Error al procesar la solicitud",
  "errors": {
    "email": ["El email ya esta registrado"],
    "dui": ["Formato de DUI inválido"]
  }
}
\`\`\`

---

### **Headers Requeridos**

\`\`\`http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
Accept: application/json
\`\`\`

---

##  Scripts Disponibles

\`\`\`bash
npm run dev       # Iniciar servidor de desarrollo (puerto 3000)
npm run build     # Construir para producción
npm run preview   # Vista previa de build de producción
npm run lint      # Ejecutar ESLint
\`\`\`

---

##  Sistema de Roles y Permisos

### **Roles del Sistema**
