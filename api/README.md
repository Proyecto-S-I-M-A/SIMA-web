# API de S.I.M.A.

**Documentación completa de la API REST** para Sisteam Inteligente Medicación Asistida de recetas electrónicas y dispensación de medicamentos. 

**Versión**: 1.0.0  
**Prefijo Base**: `/api/v1`  
**Ambiente**: Production-ready

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripcion-general)
2. [Tecnologías y Dependencias](#tecnologias-y-dependencias)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación](#instalacion)
5. [Configuración (Variables de Entorno)](#configuracion-variables-de-entorno)
6. [Scripts Disponibles](#scripts-disponibles)
7. [Autenticación](#autenticacion)
8. [Documentación de Endpoints](#documentacion-de-endpoints)
9. [Ejemplos de Modelos](#ejemplos-de-modelos)
10. [Estructura del Proyecto](#estructura-del-proyecto)
11. [Relaciones de Base de Datos](#relaciones-de-base-de-datos)
12. [Validación de Inputs](#validación-de-inputs)
13. [Deploy (API)](#deploy-api)

---

<a id="descripcion-general"></a>
## 🎯 Descripción General

API de S.I.M.A. es una REST API desarrollada con **Express.js** y **TypeScript** que gestiona:

- 🔐 **Autenticación**: Integración con Supabase Auth (JWT)
- 👥 **Gestión de Usuarios**: Pacientes, médicos y administradores
- 📋 **Recetas Médicas**: Creación, consulta y asociación con pacientes
- 💊 **Medicamentos**: Gestión de dosis e inventario
- 📊 **Historiales Médicos**: Fichas clínicas y consultas
- 🤖 **Máquinas Dispensadoras**: Control de ubicación y estado
- 🔑 **Control de Acceso**: Auditoría de sesiones

---

<a id="tecnologias-y-dependencias"></a>
## 🛠 Tecnologías y Dependencias

### Core
- **Node.js** 18+
- **Express.js** 5.2.1 — Framework HTTP
- **TypeScript** 6.0.2 — Tipado estático
- **Sequelize** 6.37.8 — ORM para PostgreSQL

### Autenticación y Seguridad
- **Supabase Auth** 2.103.0 — Autenticación con JWT
- **bcrypt** 6.0.0 — Haseo de contraseñas
- **jsonwebtoken** 9.0.3 — Manejo de JWT
- **express-rate-limit** 8.3.2 — Rate limiting

### Validación
- **express-validator** 7.3.2 — Validación de datos

### Base de Datos
- **PostgreSQL** (cliente: pg 8.20.0)
- **postgres** 3.4.9 — Driver alternativo

### Desarrollo
- **nodemon** 3.1.14 — Recarga automática
- **jest** 30.3.0 — Testing
- **prettier** 3.8.1 — Formateo de código
- **ts-node** 10.9.2 — Ejecución de TS

---

<a id="requisitos-previos"></a>
## ✅ Requisitos Previos

Antes de instalar, asegúrate de tener:

- **Node.js** 18 o superior
- **npm** 9 o superior (o yarn 3+)
- **PostgreSQL** 12 o superior (localmente o servidor remoto)
- **Supabase**: Cuenta en [supabase.com](https://supabase.com)
- **Git** (opcional)

Verifica versiones:
```bash
node --version
npm --version
psql --version
```

---

<a id="instalacion"></a>
## 📦 Instalación

### 1. Clonar o descargar el repositorio

```bash
cd api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` (o crea uno nuevo):

```bash
cp .env.example .env
```

Edita `.env` con tus valores reales (ver sección de configuración).

### 4. Iniciar la base de datos

Asegúrate que PostgreSQL esté corriendo y luego ejecuta las migraciones:

```bash
npm run migrate
```

### 5. Iniciar el servidor

En **desarrollo**:
```bash
npm run dev
```

En **producción**:
```bash
npm run build
npm run start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado).

---

<a id="configuracion-variables-de-entorno"></a>
## 🔑 Configuración (Variables de Entorno)

### .env Ejemplo Completo

```env
# === SERVIDOR ===
PORT=3000
NODE_ENV=development

# === BASE DE DATOS ===
# Formato: postgres://usuario:contraseña@host:puerto/base_datos
DB_URL=postgres://farmatica_user:SecurePassword123@localhost:5432/farmatica

# === SUPABASE ===
# Tu proyecto de Supabase (obtén estos valores en supabase.com)
PROJECT_URL=https://ustqwihkmsumgrcintxl.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# === CORS ===
# URL del frontend que puede hacer requests a esta API
CROSS_ORIGIN=http://localhost:5173

# === JWT ===
# Usado por express-validator y Supabase
JWT_SECRET=your_jwt_secret_key_here_min_32_chars

# === RATE LIMITING ===
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# === LOGS ===
LOG_LEVEL=debug
```

### Descripción de Variables

| Variable | Valor Ejemplo | Descripción |
|----------|--------------|-------------|
| `PORT` | `3000` | Puerto en que escucha el servidor |
| `NODE_ENV` | `development` o `production` | Ambiente de ejecución |
| `DB_URL` | `postgres://...` | Conexión a PostgreSQL (incluye credenciales) |
| `PROJECT_URL` | `https://...supabase.co` | URL de tu proyecto Supabase |
| `SUPABASE_KEY` | `eyJ...` | Clave pública anónima de Supabase |
| `CROSS_ORIGIN` | `http://localhost:5173` | Origen permitido para CORS |
| `JWT_SECRET` | (mínimo 32 chars) | Clave para firmar JWT (si no usa Supabase) |

---

<a id="scripts-disponibles"></a>
## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Compila TS y levanta con nodemon (recarga automática)

# Build
npm run build            # Compila TypeScript a JavaScript

# Producción
npm run start            # Ejecuta el servidor compilado

# Base de datos
npm run migrate          # Ejecuta migraciones de Sequelize

# Testing
npm run test             # Corre tests con Jest (detiene con --forceExit)

# Calidad de código
npm run lint             # Valida código con ESLint
npm run prettier         # Formatea código con Prettier
npm run types            # Verifica tipos sin emitir código

# Supabase (genera tipos)
npm run gen-types        # Genera types/database.types.ts desde Supabase
```

---

<a id="autenticacion"></a>
## 🔐 Autenticación

### Flujo Estándar

1. **Registro / Login** → Obtén `access_token` y `refresh_token`
2. **Requests** → Incluye `Authorization: Bearer <access_token>` en headers
3. **Token Expirado** → Usa `refresh_token` para obtener uno nuevo

### Headers Requeridos (Rutas Protegidas)

Todas las rutas protegidas requieren:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### Rutas Públicas (Sin Autenticación)

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/refresh-token`

> Todas las demás rutas bajo `/api/v1` están protegidas por el middleware `requireSupabaseAuth`.

### Códigos de Error de Autenticación

| Código | Mensaje | Solución |
|--------|---------|----------|
| 401 | Credenciales inválidas | Verifica email y contraseña |
| 401 | Token inválido o expirado | Usa `refresh-token` para obtener uno nuevo |
| 400 | Email y contraseña requeridos | Incluye ambos campos en el body |
| 403 | Acceso prohibido | Tienes rol insuficiente |

---

<a id="documentacion-de-endpoints"></a>
## 📚 Documentación de Endpoints

### Resumen de Endpoints y Controladores

**Rutas públicas**
- `POST /auth/login` → `SessionControll.Login`
- `POST /auth/signup` → `SessionControll.SingUp`
- `POST /auth/refresh-token` → `SessionControll.RefreshToken`

**Rutas protegidas (Bearer token requerido)**
- **Accesos** (`CRUD_Acceso`): `POST /accesos`, `GET /accesos/:id`, `PUT /accesos/:id`, `DELETE /accesos/:id`
- **Clientes** (`CRUD_Cliente`): `POST /clientes`, `GET /clientes/:id`, `GET /clientes/cedula/:cedula`, `PUT /clientes/:id`, `DELETE /clientes/:id`
- **Usuarios** (`CRUD_Usuario`): `POST /usuarios`, `GET /usuarios/:id`, `GET /usuarios/acceso/:id_acceso`, `PUT /usuarios/:id`, `DELETE /usuarios/:id`
- **Ficha Medica** (`CRUD_FichaMedica`): `POST /fichas-medicas`, `GET /fichas-medicas/:id`, `PUT /fichas-medicas/:id`, `DELETE /fichas-medicas/:id`
- **Historial Medico** (`CRUD_HistorialMedico`): `POST /historiales-medicos`, `GET /historiales-medicos/:id`, `PUT /historiales-medicos/:id`, `DELETE /historiales-medicos/:id`
- **Recetas** (`CRUD_Receta`): `POST /recetas`, `GET /recetas/:id`, `PUT /recetas/:id`, `DELETE /recetas/:id`
- **Recetas (especiales)**: `GET /recetas/cliente/:cedula` (`GetRecetaByCedula`), `GET /recetas/dosis/cliente/:cedula` (`GetRecetasyDosis`), `POST /recetas/cedula/:cedula` (`PostRecetaByCedula`), `POST /recetas/dosis` (`PostRecetasYDosis`)
- **Dosis** (`CRUD_Dosis`): `POST /dosis`, `GET /dosis/:id`, `GET /dosis/receta/:id_receta`, `PUT /dosis/:id`, `DELETE /dosis/:id`
- **Inventario** (`CRUD_Inventario`): `POST /inventario`, `GET /inventario/:id`, `PUT /inventario/:id`, `DELETE /inventario/:id`
- **Maquinas** (`CRUD_Maquina`): `POST /maquinas`, `GET /maquinas/:id`, `PUT /maquinas/:id`, `DELETE /maquinas/:id`
- **Maquina-Inventario** (`CRUD_MaquinaInventario`):
  - `POST /maquina-inventario`
  - `GET /maquina-inventario`, `GET /maquina-inventario/:id`
  - `GET /maquina-inventario/maquina/:id_maquina`
  - `GET /maquina-inventario/inventario/:id_inventario`
  - `GET /maquina-inventario/inventario-maquina/:id_maquina`
  - `PUT /maquina-inventario/:id`
  - `DELETE /maquina-inventario/:id`
- **Recetas con Dosis** (especial): `GET /recetas/dosis/cliente/:cedula` (`GetRecetasYDosis`)

### Autenticación (Rutas Públicas)

#### POST /api/v1/auth/login
**Inicia sesión con Supabase y devuelve tokens.**

- **Auth**: No requerida (pública)
- **Body (requerido)**:
  ```json
  {
    "email": "doctor@correo.com",
    "password": "Password123"
  }
  ```

**Request Completo**:
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@correo.com",
    "password": "Password123"
  }'
```

**Response 200 OK**:
```json
{
  "message": "Inicio de sesión exitoso",
  "session": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "doctor@correo.com"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response 401 Unauthorized**:
```json
{
  "error": "Credenciales inválidas"
}
```

**Response 400 Bad Request**:
```json
{
  "error": "Email y contraseña son requeridos"
}
```

---

#### POST /api/v1/auth/signup
**Crea una nueva cuenta de usuario en Supabase.**

- **Auth**: No requerida (pública)
- **Body (requerido)**:
  ```json
  {
    "email": "newuser@correo.com",
    "password": "SecurePass123"
  }
  ```

**Request Completo**:
```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@correo.com",
    "password": "SecurePass123"
  }'
```

**Response 201 Created**:
```json
{
  "message": "Cuenta creada exitosamente",
  "session": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "email": "newuser@correo.com"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response 400 Bad Request**:
```json
{
  "error": "Error al crear la cuenta",
  "details": "User already registered"
}
```

---

#### POST /api/v1/auth/refresh-token
**Renueva los tokens usando el refresh_token.**

- **Auth**: No requerida (pública)
- **Body (requerido)**:
  ```json
  {
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

**Request Completo**:
```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

**Response 200 OK**:
```json
{
  "message": "Token actualizado exitosamente",
  "session": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "doctor@correo.com"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response 401 Unauthorized**:
```json
{
  "error": "Token inválido o expirado"
}
```

---

### Accesos (Protegidas)

#### POST /api/v1/accesos
**Crea un registro de acceso (auditoría de sesiones).**

- **Auth**: Bearer token requerido
- **Body (requerido)**:
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "usuario": "Dr. Juan Pérez",
    "correo": "doctor@correo.com",
    "tipo": "doctor",
    "ultimo_acceso": "2026-05-02T12:00:00Z",
    "activo": true
  }
  ```

**Request Completo**:
```bash
curl -X POST http://localhost:3000/api/v1/accesos \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "usuario": "Dr. Juan Pérez",
    "correo": "doctor@correo.com",
    "tipo": "doctor",
    "activo": true
  }'
```

**Response 201 Created**:
```json
{
  "message": "Acceso creado exitosamente"
}
```

---

#### GET /api/v1/accesos/:id
**Obtiene un acceso por su identificador (UUID).**

- **Auth**: Bearer token requerido
- **Parámetros**:
  - `:id` (path, string, requerido): UUID del acceso

**Request Completo**:
```bash
curl -X GET http://localhost:3000/api/v1/accesos/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response 200 OK**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "usuario": "Dr. Juan Pérez",
  "correo": "doctor@correo.com",
  "tipo": "doctor",
  "ultimo_acceso": "2026-05-02T12:00:00Z",
  "activo": true,
  "updatedAt": "2026-05-02T12:00:00Z"
}
```

---

#### PUT /api/v1/accesos/:id
**Actualiza un acceso existente.**

- **Auth**: Bearer token requerido
- **Parámetros**: `:id` (path, string, requerido)
- **Body (parcial)**:
  ```json
  {
    "usuario": "Dr. Juan Pérez (Actualizado)",
    "ultimo_acceso": "2026-05-02T14:30:00Z"
  }
  ```

**Response 200 OK**:
```json
{
  "message": "Acceso actualizado exitosamente"
}
```

---

#### DELETE /api/v1/accesos/:id
**Elimina un acceso (soft delete: marca como inactivo).**

- **Auth**: Bearer token requerido
- **Efecto**: Desactiva el acceso y todos los clientes relacionados

**Response 200 OK**:
```json
{
  "message": "Acceso eliminado exitosamente"
}
```

---

### Clientes (Protegidas)

#### POST /api/v1/clientes
**Crea un nuevo cliente (paciente).**

- **Auth**: Bearer token requerido
- **Body (requerido)**:
  ```json
  {
    "nombre": "Juan",
    "apellido": "Pérez",
    "cedula": "1234567890",
    "correo": "juan.perez@email.com",
    "asegurado": true,
    "verificado": false,
    "sexo": "M",
    "id_acceso": 1
  }
  ```

**Request Completo**:
```bash
curl -X POST http://localhost:3000/api/v1/clientes \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "cedula": "1234567890",
    "correo": "juan.perez@email.com",
    "asegurado": true,
    "sexo": "M",
    "id_acceso": 1
  }'
```

**Response 201 Created**:
```json
{
  "message": "Cliente creado exitosamente"
}
```

**Response 409 Conflict**:
```json
{
  "error": "El correo ya está registrado"
}
```

---

#### GET /api/v1/clientes/:id
**Obtiene un cliente por ID o todos si no especifica ID.**

- **Auth**: Bearer token requerido
- **Parámetros**: `:id` (path, integer, opcional)

**Request (un cliente)**:
```bash
curl -X GET http://localhost:3000/api/v1/clientes/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response 200 OK**:
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "cedula": "1234567890",
  "correo": "juan.perez@email.com",
  "asegurado": true,
  "verificado": false,
  "sexo": "M",
  "id_acceso": 1,
  "createdAt": "2026-05-02T10:00:00Z",
  "updatedAt": "2026-05-02T10:00:00Z"
}
```

---

#### PUT /api/v1/clientes/:id
**Actualiza un cliente.**

- **Auth**: Bearer token requerido
- **Body (parcial)**:
  ```json
  {
    "nombre": "Juan Carlos",
    "verificado": true
  }
  ```

**Response 200 OK**:
```json
{
  "message": "Cliente actualizado exitosamente"
}
```

---

#### DELETE /api/v1/clientes/:id
**Elimina un cliente (soft delete).**

- **Auth**: Bearer token requerido

**Response 200 OK**:
```json
{
  "message": "Cliente eliminado exitosamente"
}
```

---

### Usuarios (Protegidas)

#### POST /api/v1/usuarios
**Crea un nuevo usuario (doctor, admin).**

- **Auth**: Bearer token requerido
- **Body (requerido)**:
  ```json
  {
    "nombre": "María",
    "apellido": "Gómez",
    "rol": "doctor",
    "ruc_doctor": "1701234567001",
    "especialidades": "Medicina General",
    "activo": true
  }
  ```

**Request Completo**:
```bash
curl -X POST http://localhost:3000/api/v1/usuarios \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María",
    "apellido": "Gómez",
    "rol": "doctor",
    "ruc_doctor": "1701234567001",
    "especialidades": "Medicina General",
    "activo": true
  }'
```

**Response 201 Created**:
```json
{
  "message": "Usuario creado exitosamente"
}
```

---

#### GET /api/v1/usuarios/:id
**Obtiene un usuario por ID.**

- **Auth**: Bearer token requerido

**Response 200 OK**:
```json
{
  "id": 1,
  "nombre": "María",
  "apellido": "Gómez",
  "rol": "doctor",
  "ruc_doctor": "1701234567001",
  "especialidades": "Medicina General",
  "activo": true
}
```

---

#### PUT /api/v1/usuarios/:id
**Actualiza un usuario.**

**Response 200 OK**:
```json
{
  "message": "Usuario actualizado exitosamente"
}
```

---

#### DELETE /api/v1/usuarios/:id
**Elimina un usuario (soft delete).**

**Response 200 OK**:
```json
{
  "message": "Usuario eliminado exitosamente"
}
```

---

### Fichas Médicas (Protegidas)

#### POST /api/v1/fichas-medicas
**Crea una ficha médica de un cliente.**

- **Auth**: Bearer token requerido
- **Body (requerido)**:
  ```json
  {
    "id_cliente": 1,
    "tipo_sanguineo": "O+",
    "alergenos": "Penicilina, Amoxicilina",
    "enfermedad_cronica": "Hipertensión"
  }
  ```

**Response 201 Created**:
```json
{
  "message": "Ficha médica creada exitosamente"
}
```

---

#### GET /api/v1/fichas-medicas/:id
**Obtiene una ficha médica por ID.**

**Response 200 OK**:
```json
{
  "id": 1,
  "id_cliente": 1,
  "tipo_sanguineo": "O+",
  "alergenos": "Penicilina, Amoxicilina",
  "enfermedad_cronica": "Hipertensión"
}
```

---

#### PUT /api/v1/fichas-medicas/:id
**Actualiza una ficha médica.**

**Response 200 OK**:
```json
{
  "message": "Ficha médica actualizada exitosamente"
}
```

---

#### DELETE /api/v1/fichas-medicas/:id
**Elimina una ficha médica (hard delete).**

**Response 200 OK**:
```json
{
  "message": "Ficha médica eliminada exitosamente"
}
```

---

### Historiales Médicos (Protegidas)

#### POST /api/v1/historiales-medicos
**Registra una consulta médica con signos vitales.**

- **Auth**: Bearer token requerido
- **Body (requerido)**:
  ```json
  {
    "id_cliente": 1,
    "fecha_consulta": "2026-05-02T10:30:00Z",
    "motivo_consulta": "Fiebre y dolor de garganta",
    "diagnostico": "Faringitis",
    "tratamiento": "Reposo e hidratación",
    "observaciones": "Control en 48 horas",
    "presion_arterial": "120/80",
    "temperatura": 37.5,
    "peso": 70,
    "altura": 1.72,
    "frecuencia_cardiaca": 82,
    "medico": "Dr. Juan Pérez",
    "fecha_registro": "2026-05-02T10:35:00Z"
  }
  ```

**Response 201 Created**:
```json
{
  "message": "Historial médico creado exitosamente"
}
```

---

#### GET /api/v1/historiales-medicos/:id
**Obtiene un historial médico por ID.**

**Response 200 OK**:
```json
{
  "id": 1,
  "id_cliente": 1,
  "fecha_consulta": "2026-05-02T10:30:00Z",
  "motivo_consulta": "Fiebre y dolor de garganta",
  "diagnostico": "Faringitis",
  "tratamiento": "Reposo e hidratación",
  "presion_arterial": "120/80",
  "temperatura": 37.5,
  "peso": 70,
  "altura": 1.72,
  "frecuencia_cardiaca": 82,
  "medico": "Dr. Juan Pérez"
}
```

---

#### PUT /api/v1/historiales-medicos/:id
**Actualiza un historial médico.**

**Response 200 OK**:
```json
{
  "message": "Historial médico actualizado exitosamente"
}
```

---

#### DELETE /api/v1/historiales-medicos/:id
**Elimina un historial médico (hard delete).**

**Response 200 OK**:
```json
{
  "message": "Historial médico eliminado exitosamente"
}
```

---

### Recetas

#### POST /api/v1/recetas
**Crea una receta para un cliente (usando id_cliente en body).**

- **Auth**: Bearer token requerido
- **Body (requerido)**:
  ```json
  {
    "id_cliente": 1,
    "doctor_remitente": "Dr. Juan Pérez",
    "ruc_doctor_remitente": "1701234567001",
    "hospital_remitente": "Hospital Central",
    "telefono_hospital": "+593-2-1234567",
    "correo": "hospital@example.com",
    "codigo": 12345,
    "fecha": "2026-05-02T10:30:00Z"
  }
  ```

**Response 201 Created**:
```json
{
  "message": "Receta creada exitosamente"
}
```

---

#### POST /api/v1/recetas/cedula/:cedula
**Crea una receta buscando el cliente por cédula.**

- **Auth**: Bearer token requerido
- **Parámetros**: `:cedula` (path, string, requerido)
- **Body**:
  ```json
  {
    "doctor_remitente": "Dr. Juan Pérez",
    "ruc_doctor_remitente": "1701234567001",
    "hospital_remitente": "Hospital Central",
    "telefono_hospital": "+593-2-1234567",
    "correo": "hospital@example.com",
    "codigo": 12345,
    "fecha": "2026-05-02T10:30:00Z"
  }
  ```

**Request Completo**:
```bash
curl -X POST http://localhost:3000/api/v1/recetas/cedula/1234567890 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "doctor_remitente": "Dr. Juan Pérez",
    "ruc_doctor_remitente": "1701234567001",
    "hospital_remitente": "Hospital Central",
    "telefono_hospital": "+593-2-1234567",
    "correo": "hospital@example.com",
    "codigo": 12345,
    "fecha": "2026-05-02T10:30:00Z"
  }'
```

**Response 201 Created**:
```json
{
  "message": "Receta creada exitosamente"
}
```

**Response 404 Not Found**:
```json
{
  "message": "Cliente no encontrado"
}
```

---

#### POST /api/v1/recetas/dosis
**Crea una receta con múltiples dosis en una sola operación.**

- **Auth**: Bearer token requerido
- **Body**:
  ```json
  {
    "id_cliente": 1,
    "doctor_remitente": "Dr. Juan Pérez",
    "dosis": [
      {
        "id_medicamento": 1,
        "cantidad": 2,
        "instrucciones": "Tomar una tableta cada 8 horas"
      },
      {
        "id_medicamento": 2,
        "cantidad": 1,
        "instrucciones": "Una vez al día por la noche"
      }
    ]
  }
  ```

**Response 201 Created**:
```json
{
  "message": "Receta con dosis creada exitosamente"
}
```

---

#### GET /api/v1/recetas/:id
**Obtiene una receta por ID.**

- **Auth**: Bearer token requerido

**Response 200 OK**:
```json
{
  "id": 1,
  "id_cliente": 1,
  "doctor_remitente": "Dr. Juan Pérez",
  "ruc_doctor_remitente": "1701234567001",
  "hospital_remitente": "Hospital Central",
  "telefono_hospital": "+593-2-1234567",
  "correo": "hospital@example.com",
  "codigo": 12345,
  "fecha": "2026-05-02T10:30:00Z"
}
```

---

#### GET /api/v1/recetas/cliente/:cedula
**Obtiene todas las recetas de un cliente por cédula.**

- **Auth**: Bearer token requerido
- **Parámetros**: `:cedula` (path, string, requerido)

**Request Completo**:
```bash
curl -X GET http://localhost:3000/api/v1/recetas/cliente/1234567890
```

**Response 200 OK**:
```json
[
  {
    "id": 1,
    "id_cliente": 1,
    "doctor_remitente": "Dr. Juan Pérez",
    "codigo": 12345,
    "fecha": "2026-05-02T10:30:00Z"
  },
  {
    "id": 2,
    "id_cliente": 1,
    "doctor_remitente": "Dra. María Gómez",
    "codigo": 12346,
    "fecha": "2026-04-30T14:00:00Z"
  }
]
```

---

#### PUT /api/v1/recetas/:id
**Actualiza una receta.**

- **Auth**: Bearer token requerido

**Response 200 OK**:
```json
{
  "message": "Receta actualizada exitosamente"
}
```

---

#### DELETE /api/v1/recetas/:id
**Elimina una receta (hard delete).**

- **Auth**: Bearer token requerido

**Response 200 OK**:
```json
{
  "message": "Receta eliminada exitosamente"
}
```

---

#### GET /api/v1/recetas/dosis/cliente/:cedula
**Obtiene todas las recetas de un cliente con sus dosis e información del medicamento.**

- **Auth**: Bearer token requerido
- **Parámetros**: `:cedula` (path, string, requerido)

**Request Completo**:
```bash
curl -X GET http://localhost:3000/api/v1/recetas/dosis/cliente/1234567890 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response 200 OK**:
```json
[
  {
    "id": 1,
    "id_cliente": 1,
    "doctor_remitente": "Dr. Juan Pérez",
    "ruc_doctor_remitente": "1701234567001",
    "hospital_remitente": "Hospital Central",
    "telefono_hospital": "+593-2-1234567",
    "correo": "hospital@example.com",
    "codigo": 12345,
    "fecha": "2026-05-02T10:30:00Z",
    "dosis": [
      {
        "id": 1,
        "id_receta": 1,
        "id_medicamento": 1,
        "cantidad": 2,
        "instrucciones": "Tomar una tableta cada 8 horas",
        "inventario": {
          "id": 1,
          "nombre_medicamento": "Paracetamol 500 mg",
          "marca": "Genfar",
          "precio": 2.5,
          "codigo": "MED-001",
          "resetado": false
        }
      }
    ]
  }
]
```

**Response 404 Not Found**:
```json
{
  "error": "Cliente no encontrado"
}
```

---

### Dosis (Protegidas)

#### POST /api/v1/dosis
**Crea una dosis de medicamento para una receta.**

- **Auth**: Bearer token requerido
- **Body (requerido)**:
  ```json
  {
    "id_receta": 1,
    "id_medicamento": 1,
    "cantidad": 2,
    "instrucciones": "Tomar una tableta cada 8 horas"
  }
  ```

**Response 201 Created**:
```json
{
  "message": "Dosis creada exitosamente"
}
```

---

#### GET /api/v1/dosis/:id
**Obtiene una dosis por ID.**

**Response 200 OK**:
```json
{
  "id": 1,
  "id_receta": 1,
  "id_medicamento": 1,
  "cantidad": 2,
  "instrucciones": "Tomar una tableta cada 8 horas"
}
```

---

#### PUT /api/v1/dosis/:id
**Actualiza una dosis.**

**Response 200 OK**:
```json
{
  "message": "Dosis actualizada exitosamente"
}
```

---

#### DELETE /api/v1/dosis/:id
**Elimina una dosis (hard delete).**

**Response 200 OK**:
```json
{
  "message": "Dosis eliminada exitosamente"
}
```

---

### Inventario (Protegidas)

#### POST /api/v1/inventario
**Registra un medicamento en el inventario global del sistema.**

- **Auth**: Bearer token requerido
- **Body (requerido)**:
  ```json
  {
    "nombre_medicamento": "Paracetamol 500 mg",
    "marca": "Genfar",
    "precio": 2.5,
    "codigo": "MED-001",
    "resetado": false
  }
  ```

**Response 201 Created**:
```json
{
  "message": "Producto de inventario creado exitosamente"
}
```

---

#### GET /api/v1/inventario/:id
**Obtiene un producto del inventario por ID.**

**Response 200 OK**:
```json
{
  "id": 1,
  "nombre_medicamento": "Paracetamol 500 mg",
  "marca": "Genfar",
  "precio": 2.5,
  "codigo": "MED-001",
  "resetado": false,
  "createdAt": "2026-05-02T10:00:00Z",
  "updatedAt": "2026-05-02T10:00:00Z"
}
```

---

#### PUT /api/v1/inventario/:id
**Actualiza un producto del inventario.**

**Response 200 OK**:
```json
{
  "message": "Producto actualizado exitosamente"
}
```

---

#### DELETE /api/v1/inventario/:id
**Elimina un producto del inventario (hard delete).**

**Response 200 OK**:
```json
{
  "message": "Producto eliminado exitosamente"
}
```

---

### Máquinas (Protegidas)

#### POST /api/v1/maquinas
**Registra una máquina dispensadora en el sistema.**

- **Auth**: Bearer token requerido
- **Body (requerido)**:
  ```json
  {
    "ubicacion": "Hospital Central - Planta baja",
    "activo": true,
    "latitud": -0.1807,
    "longitud": -78.4678
  }
  ```

**Response 201 Created**:
```json
{
  "message": "Máquina creada exitosamente"
}
```

---

#### GET /api/v1/maquinas/:id
**Obtiene una máquina por ID.**

**Response 200 OK**:
```json
{
  "id": 1,
  "ubicacion": "Hospital Central - Planta baja",
  "activo": true,
  "latitud": -0.1807,
  "longitud": -78.4678
}
```

---

#### PUT /api/v1/maquinas/:id
**Actualiza una máquina (ubicación, estado, coordenadas).**

**Response 200 OK**:
```json
{
  "message": "Máquina actualizada exitosamente"
}
```

---

#### DELETE /api/v1/maquinas/:id
**Elimina una máquina (soft delete).**

**Response 200 OK**:
```json
{
  "message": "Máquina eliminada exitosamente"
}
```

---

### Máquina-Inventario (Protegidas)

#### POST /api/v1/maquina-inventario
**Asocia un medicamento del inventario a una máquina con su cantidad disponible.**

- **Auth**: Bearer token requerido
- **Body (requerido)**:
  ```json
  {
    "id_maquina": 1,
    "codigo_maquina": "M-001",
    "id_inventario": 3,
    "cantidad": 50
  }
  ```

**Request Completo**:
```bash
curl -X POST http://localhost:3000/api/v1/maquina-inventario \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "id_maquina": 1,
    "codigo_maquina": "M-001",
    "id_inventario": 3,
    "cantidad": 50
  }'
```

**Response 201 Created**:
```json
{
  "id": 10,
  "id_maquina": 1,
  "codigo_maquina": "M-001",
  "id_inventario": 3,
  "cantidad": 50,
  "createdAt": "2026-05-02T10:00:00Z",
  "updatedAt": "2026-05-02T10:00:00Z"
}
```

---

#### GET /api/v1/maquina-inventario
**Lista todos los registros de Máquina-Inventario.**

- **Auth**: Bearer token requerido

**Response 200 OK**: Array de registros MaquinaInventario.

---

#### GET /api/v1/maquina-inventario/:id
**Filtra registros de Máquina-Inventario por `id_maquina`.**

- **Auth**: Bearer token requerido
- **Parámetros**: `:id` (path, integer) — se interpreta como `id_maquina`

**Response 200 OK**: Array de registros de esa máquina.

---

#### GET /api/v1/maquina-inventario/maquina/:id_maquina
**Obtiene todos los registros de una máquina específica.**

- **Auth**: Bearer token requerido
- **Parámetros**: `:id_maquina` (path, integer, requerido)

**Request Completo**:
```bash
curl -X GET http://localhost:3000/api/v1/maquina-inventario/maquina/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response 200 OK**:
```json
[
  {
    "id": 10,
    "id_maquina": 1,
    "codigo_maquina": "M-001",
    "id_inventario": 3,
    "cantidad": 50
  }
]
```

---

#### GET /api/v1/maquina-inventario/inventario/:id_inventario
**Obtiene todos los registros asociados a un medicamento del inventario.**

- **Auth**: Bearer token requerido
- **Parámetros**: `:id_inventario` (path, integer, requerido)

**Response 200 OK**: Array de registros MaquinaInventario para ese inventario.

---

#### GET /api/v1/maquina-inventario/inventario-maquina/:id_maquina
**Obtiene el inventario completo cargado en una máquina (join con Inventario).**

- **Auth**: Bearer token requerido
- **Parámetros**: `:id_maquina` (path, integer, requerido)

**Request Completo**:
```bash
curl -X GET http://localhost:3000/api/v1/maquina-inventario/inventario-maquina/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response 200 OK**:
```json
[
  {
    "id": 10,
    "id_maquina": 1,
    "codigo_maquina": "M-001",
    "id_inventario": 3,
    "cantidad": 50,
    "Inventario": {
      "id": 3,
      "nombre_medicamento": "Paracetamol 500 mg",
      "marca": "Genfar",
      "precio": 2.5,
      "codigo": "MED-001",
      "resetado": false
    }
  }
]
```

---

#### PUT /api/v1/maquina-inventario/:id
**Actualiza un registro Máquina-Inventario (ej. ajustar cantidad disponible).**

- **Auth**: Bearer token requerido
- **Body (parcial)**:
  ```json
  {
    "cantidad": 35
  }
  ```

**Response 200 OK**: Número de registros actualizados.

---

#### DELETE /api/v1/maquina-inventario/:id
**Elimina un registro Máquina-Inventario.**

- **Auth**: Bearer token requerido

**Response 200 OK**:
```json
{
  "message": "Registro de relación MaquinaInventario eliminado",
  "data": 1
}
```

---

<a id="ejemplos-de-modelos"></a>
## 📊 Ejemplos de Modelos

### Completo: Acceso
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "usuario": "Dr. Juan Pérez",
  "correo": "doctor@correo.com",
  "tipo": "doctor",
  "ultimo_acceso": "2026-05-02T12:00:00Z",
  "activo": true,
  "updatedAt": "2026-05-02T12:00:00Z"
}
```

### Completo: Cliente
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "cedula": "1234567890",
  "correo": "juan.perez@example.com",
  "asegurado": true,
  "verificado": false,
  "sexo": "M",
  "id_acceso": 1,
  "createdAt": "2026-05-02T10:00:00Z",
  "updatedAt": "2026-05-02T10:00:00Z"
}
```

### Completo: Usuario
```json
{
  "id": 1,
  "nombre": "María",
  "apellido": "Gómez",
  "rol": "doctor",
  "ruc_doctor": "1701234567001",
  "especialidades": "Medicina General, Cardiología",
  "activo": true
}
```

### Completo: FichaMedica
```json
{
  "id": 1,
  "id_cliente": 1,
  "tipo_sanguineo": "O+",
  "alergenos": "Penicilina, Amoxicilina",
  "enfermedad_cronica": "Hipertensión"
}
```

### Completo: HistorialMedico
```json
{
  "id": 1,
  "id_cliente": 1,
  "fecha_consulta": "2026-05-02T10:30:00Z",
  "motivo_consulta": "Fiebre y dolor de garganta",
  "diagnostico": "Faringitis",
  "tratamiento": "Reposo e hidratación",
  "observaciones": "Control en 48 horas",
  "presion_arterial": "120/80",
  "temperatura": 37.5,
  "peso": 70,
  "altura": 1.72,
  "frecuencia_cardiaca": 82,
  "medico": "Dr. Juan Pérez",
  "fecha_registro": "2026-05-02T10:35:00Z"
}
```

### Completo: Receta
```json
{
  "id": 1,
  "id_cliente": 1,
  "doctor_remitente": "Dr. Juan Pérez",
  "ruc_doctor_remitente": "1701234567001",
  "hospital_remitente": "Hospital Central",
  "telefono_hospital": "+593-2-1234567",
  "correo": "hospital@example.com",
  "codigo": 12345,
  "fecha": "2026-05-02T10:30:00Z"
}
```

### Completo: Dosis
```json
{
  "id": 1,
  "id_receta": 1,
  "id_medicamento": 1,
  "cantidad": 2,
  "instrucciones": "Tomar una tableta cada 8 horas por 7 días"
}
```

### Completo: Inventario
```json
{
  "id": 1,
  "nombre_medicamento": "Paracetamol 500 mg",
  "marca": "Genfar",
  "precio": 2.5,
  "codigo": "MED-001",
  "resetado": false,
  "createdAt": "2026-05-02T10:00:00Z",
  "updatedAt": "2026-05-02T10:00:00Z"
}
```

### Completo: Maquina
```json
{
  "id": 1,
  "id_maquina": "M-001",
  "ubicacion": "Hospital Central - Piso 2",
  "activo": true,
  "latitud": -0.2101,
  "longitud": -78.4932
}
```

### Completo: MaquinaInventario
```json
{
  "id": 10,
  "codigo_maquina": "M-001",
  "id_maquina": 1,
  "id_inventario": 3,
  "cantidad": 50
}
```

### Completo: Maquina
```json
{
  "id": 1,
  "ubicacion": "Hospital Central - Planta baja",
  "activo": true,
  "latitud": -0.1807,
  "longitud": -78.4678
}
```

---

<a id="estructura-del-proyecto"></a>
## 📁 Estructura del Proyecto

```
api/
├── src/
│   ├── config/
│   │   ├── database.ts          # Configuración de base de datos
│   │   ├── sequelize.ts         # Inicialización de Sequelize
│   │   └── supabase.ts          # Cliente Supabase
│   ├── controllers/
│   │   ├── CRUD_Acceso.ts       # Operaciones CRUD: Acceso
│   │   ├── CRUD_Cliente.ts      # Operaciones CRUD: Cliente
│   │   ├── CRUD_Dosis.ts        # Operaciones CRUD: Dosis
│   │   ├── CRUD_FichaMedica.ts  # Operaciones CRUD: FichaMedica
│   │   ├── CRUD_HistorialMedico.ts
│   │   ├── CRUD_Inventario.ts
│   │   ├── CRUD_Maquina.ts
│   │   ├── CRUD_Receta.ts
│   │   ├── CRUD_Usuario.ts
│   │   ├── SessionControll.ts   # Login, SignUp, RefreshToken
│   │   ├── GetRecetaByCedula.ts # GET: Receta por cédula
│   │   ├── PostRecetaByCedula.ts # POST: Receta por cédula
│   │   └── PostRecetasYDosis.ts # POST: Receta con dosis
│   ├── middleware/
│   │   ├── requireSupabaseAuth.ts  # Validación de token Supabase
│   │   ├── validateAcceso.ts
│   │   ├── validateCliente.ts
│   │   ├── validateDosis.ts
│   │   ├── validateFichaMedica.ts
│   │   ├── validateHistorialMedico.ts
│   │   ├── validateInventario.ts
│   │   ├── validateMaquina.ts
│   │   ├── validateReceta.ts
│   │   └── validateUsuario.ts
│   ├── models/
│   │   ├── Acceso.ts
│   │   ├── Cliente.ts
│   │   ├── Dosis.ts
│   │   ├── FichaMedica.ts
│   │   ├── HistorialMedico.ts
│   │   ├── Inventario.ts
│   │   ├── Maquina.ts
│   │   ├── Receta.ts
│   │   ├── Usuario.ts
│   │   └── index.ts
│   ├── routes/
│   │   ├── Route_Acceso.ts
│   │   ├── Route_Cliente.ts
│   │   ├── Route_Dosis.ts
│   │   ├── Route_FichaMedica.ts
│   │   ├── Route_HistorialMedico.ts
│   │   ├── Route_Inventario.ts
│   │   ├── Route_Maquina.ts
│   │   ├── Route_Receta.ts
│   │   ├── Route_Session.ts
│   │   ├── Route_Usuario.ts
│   │   └── Route-GetRecetaByCedula.ts
│   ├── services/
│   │   ├── Decode.ts
│   │   ├── Encode.ts
│   │   └── Salt.ts
│   ├── types/
│   │   ├── Acceso.ts
│   │   ├── Cliente.ts
│   │   ├── Dosis.ts
│   │   ├── FichaMedica.ts
│   │   ├── HistorialMedico.ts
│   │   ├── Inventario.ts
│   │   ├── Login.ts
│   │   ├── Maquina.ts
│   │   ├── Receta.ts
│   │   ├── Usuario.ts
│   │   ├── database.types.ts
│   │   └── index.ts
│   ├── app.ts                  # Instancia de Express
│   └── server.ts               # Punto de entrada
├── supabase/
│   └── config.toml             # Configuración local de Supabase
├── httpTest/                   # Archivos .http para testing
│   ├── Acceso.http
│   ├── Cliente.http
│   ├── Dosis.http
│   ├── FichaMedica.http
│   ├── HistorialMedico.http
│   ├── Inventario.http
│   ├── Maquina.http
│   ├── Receta.http
│   └── Session.http
├── .env.example                # Template de variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

<a id="relaciones-de-base-de-datos"></a>
## 🗄️ Relaciones de Base de Datos

### Diagrama Conceptual

<img width="1615" height="829" alt="Diagrama DB" src="https://github.com/user-attachments/assets/bff01c4e-53e5-48ea-b74a-ecb4199bf5f4" />


### Foreign Keys

| Tabla | Campo | Referencia | Cascada |
|-------|-------|-----------|---------|
| `Cliente` | `id_acceso` | `Acceso.id` | ON DELETE SET NULL |
| `FichaMedica` | `id_cliente` | `Cliente.id` | ON DELETE CASCADE |
| `HistorialMedico` | `id_cliente` | `Cliente.id` | ON DELETE CASCADE |
| `Receta` | `id_cliente` | `Cliente.id` | ON DELETE CASCADE |
| `Dosis` | `id_receta` | `Receta.id` | ON DELETE CASCADE |
| `MaquinaInventario` | `id_maquina` | `Maquina.id` | ON DELETE CASCADE |
| `MaquinaInventario` | `id_inventario` | `Inventario.id` | ON DELETE CASCADE |

---

## 🚀 Deploy (API)

1. Configura variables de entorno de produccion en `.env` (ver seccion de configuracion).
2. Instala dependencias:
  ```bash
  npm install
  ```
3. Compila TypeScript:
  ```bash
  npm run build
  ```
4. Ejecuta migraciones de base de datos:
  ```bash
  npm run migrate
  ```
5. Inicia el servidor:
  ```bash
  npm run start
  ```

**Notas de despliegue**
- Configura `CROSS_ORIGIN` con el dominio de la web.
- Asegura `PROJECT_URL` y `SUPABASE_KEY` validos para Supabase Auth.
- Usa un process manager (PM2, systemd, Docker) para procesos persistentes.

## 🤝 Contribuciones

Para reportar problemas o sugerir mejoras, contacta al equipo de desarrollo.

---

## 📝 Licencia

ISC — Ver `LICENSE` en el repositorio.

---

**Última actualización**: 16 de junio de 2026  
**Versión API**: 1.0.0  
**Versión Node.js soportada**: 18+
