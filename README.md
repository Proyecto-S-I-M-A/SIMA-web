# FarmaTicAPI

Una **API REST** ubicada en `api/`, construida con **Node.js**, **Express**, **PostgreSQL** y **Supabase Auth**, siguiendo el patrón **MVC** con validación de entrada completa.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Autenticación](#autenticación)
- [Variables de Entorno](#variables-de-entorno)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints](#endpoints)
  - [Accesos](#accesos)
  - [Clientes](#clientes)
  - [Usuarios](#usuarios)
  - [Fichas Médicas](#fichas-médicas)
  - [Historiales Médicos](#historiales-médicos)
  - [Recetas](#recetas)
  - [Dosis](#dosis)
  - [Inventario](#inventario)
  - [Máquinas](#máquinas)
- [Scripts](#scripts)

---

## 📦 Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **PostgreSQL** >= 12.0
- Git

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/N0oCh1/FarmaTicAPI.git
cd FarmaTicAPI
cd api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
# Crear archivo .env dentro de api/
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de PostgreSQL, la URL del proyecto Supabase y la clave anonima (ver [Variables de Entorno](#variables-de-entorno)).

### 4. Inicializar la base de datos

```bash
# Inicia el servidor; Sequelize autentica y sincroniza el schema public al arrancar
npm run dev
```

En los logs deberías ver:
```
✓ Database connection authenticated
✓ Database synchronized on schema: public
Server running on port 3000 [development]
```

### 5. Verificar el arranque

Abre un cliente HTTP o una colección de pruebas y confirma que el servidor responda en `http://localhost:3000/api/v0`.

Si necesitas ejecutar pruebas manuales, revisa primero [api/httpTest/Session.http](api/httpTest/Session.http) para obtener un access token válido.

---

## Autenticación

Este proyecto protege las rutas de negocio con `requireSupabaseAuth`. Eso significa que cualquier consulta a clientes, usuarios, fichas médicas, historiales, recetas, dosis, inventario, máquinas y accesos requiere un token Bearer válido.

Flujo básico:

1. Inicia sesión con `POST /api/v0/auth/login`.
2. Copia el `access_token` devuelto por la respuesta de Supabase.
3. Usa ese token en el encabezado `Authorization: Bearer <token>`.
4. Para refrescar sesión, envía el `refresh_token` a `POST /api/v0/auth/refresh-token`.

Rutas públicas adicionales:

1. `POST /api/v0/auth/signup`
2. `GET /api/v0/recetas/cliente/:cedula`

Ejemplo de encabezado:

```http
Authorization: Bearer eyJhbGciOi...
```

Sin ese token, la API responde con `401`.

---

## 🔐 Variables de Entorno

Crea un archivo `.env` dentro de `api/` con el siguiente contenido:

```env
# Puerto del servidor
PORT=3000
NODE_ENV=development

# Base de datos PostgreSQL
DB_URL=postgres://usuario:contraseña@localhost:5432/farmatica

# Supabase
PROJECT_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_clave_anon_publica
```

### Detalles de conexión a PostgreSQL

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `usuario` | Usuario de PostgreSQL | `postgres` |
| `contraseña` | Contraseña del usuario | `tu_password` |
| `localhost` | Host del servidor PostgreSQL | `localhost` o `127.0.0.1` |
| `5432` | Puerto por defecto de PostgreSQL | `5432` |
| `farmatica` | Nombre de la base de datos | `farmatica` |

### Detalles de Supabase

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PROJECT_URL` | URL del proyecto Supabase | `https://xxxx.supabase.co` |
| `SUPABASE_KEY` | Clave anon pública del proyecto | `eyJhbGciOi...` |

**Formato alternativo:**
```env
DB_URL=postgresql://usuario:contraseña@host:puerto/base_datos
```

---

## 📁 Estructura del Proyecto

```
api/
├── httpTest/
├── src/
├── config/
│   ├── database.ts          # Configuración de conexión a PostgreSQL
│   ├── sequelize.ts         # Configuración de Sequelize ORM
│   └── supabase.ts          # Cliente de Supabase Auth
├── controllers/
│   ├── CRUD_Cliente.ts      # Controlador de Clientes
│   ├── CRUD_Usuario.ts      # Controlador de Usuarios
│   ├── CRUD_FichaMedica.ts  # Controlador de Fichas Médicas
│   ├── CRUD_HistorialMedico.ts
│   ├── CRUD_Receta.ts
│   ├── CRUD_Dosis.ts
│   ├── CRUD_Inventario.ts
│   ├── CRUD_Maquina.ts
│   ├── CRUD_Acceso.ts
│   ├── GetRecetaByCedula.ts
│   └── PostRecetaByCedula.ts
├── middleware/
│   ├── requireSupabaseAuth.ts
│   ├── validateCliente.ts
│   ├── validateUsuario.ts
│   ├── validateFichaMedica.ts
│   ├── validateHistorialMedico.ts
│   ├── validateReceta.ts
│   ├── validateDosis.ts
│   ├── validateInventario.ts
│   └── validateMaquina.ts
├── models/
│   ├── Cliente.ts
│   ├── Usuario.ts
│   ├── FichaMedica.ts
│   ├── HistorialMedico.ts
│   ├── Receta.ts
│   ├── Dosis.ts
│   ├── Inventario.ts
│   ├── Maquina.ts
│   ├── Usuario.ts
│   └── index.ts
├── routes/
│   ├── Route_Acceso.ts
│   ├── Route_Cliente.ts
│   ├── Route_Usuario.ts
│   ├── Route_FichaMedica.ts
│   ├── Route_HistorialMedico.ts
│   ├── Route_Receta.ts
│   ├── Route_Dosis.ts
│   ├── Route_Inventario.ts
│   ├── Route_Maquina.ts
│   ├── Route_Session.ts
│   └── Route-GetRecetaByCedula.ts
├── types/
│   └── ... (interfaces TypeScript para cada modelo)
├── app.ts                   # Configuración de Express
└── server.ts                # Punto de entrada
```

---

## 🔌 Endpoints

> Todas las rutas de este bloque requieren autenticación Bearer, excepto las rutas de sesión (`/auth/login`, `/auth/signup` y `/auth/refresh-token`).

### Clientes

#### POST `/api/v0/clientes` - Crear cliente

**Body:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez García",
  "cedula": "12345678901",
  "correo": "juan.perez@example.com",
  "password": "MiPassword123",
  "sexo": "M",
  "asegurado": true,
  "verificado": false
}
```

**Response (201):**
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez García",
  "cedula": "12345678901",
  "correo": "juan.perez@example.com",
  "password": "MiPassword123",
  "sexo": "M",
  "asegurado": true,
  "verificado": false,
  "createdAt": "2024-04-11T10:30:00.000Z",
  "updatedAt": "2024-04-11T10:30:00.000Z"
}
```

#### GET `/api/v0/clientes` - Obtener todos los clientes

**Response (200):**
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez García",
    ...
  }
]
```

#### GET `/api/v0/clientes/:id` - Obtener cliente por ID

**Response (200):**
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    ...
  }
]
```

#### PUT `/api/v0/clientes/:id` - Actualizar cliente

**Body:** (cualquier campo que desees actualizar)
```json
{
  "nombre": "Juan Carlos",
  "asegurado": false
}
```

**Response (200):** Cliente actualizado

#### DELETE `/api/v0/clientes/:id` - Eliminar cliente

**Response (200):**
```json
{
  "message": "Cliente eliminado",
  "data": { ... }
}
```

---

### Usuarios

#### POST `/api/v0/usuarios` - Crear usuario

**Body:**
```json
{
  "usuario": "jperez_admin",
  "nombre": "Juan",
  "apellido": "Pérez",
  "password": "ContraseñaSegura123",
  "rol": "admin",
  "ruc_doctor": "1701234567001",
  "especialidades": "Cardiología"
}
```

**Response (201):** Usuario creado

#### GET `/api/v0/usuarios` - Obtener todos los usuarios

#### GET `/api/v0/usuarios/:id` - Obtener usuario por ID

#### PUT `/api/v0/usuarios/:id` - Actualizar usuario

#### DELETE `/api/v0/usuarios/:id` - Eliminar usuario

---

### Fichas Médicas

#### POST `/api/v0/fichas-medicas` - Crear ficha médica

**Body:**
```json
{
  "id_cliente": 1,
  "tipo_sanguineo": "O+",
  "alergenos": "Penicilina, Paracetamol",
  "enfermedad_cronica": "Diabetes tipo 2"
}
```

**Response (201):** Ficha médica creada

#### GET `/api/v0/fichas-medicas` - Obtener todas las fichas

#### GET `/api/v0/fichas-medicas/:id` - Obtener ficha por ID

#### PUT `/api/v0/fichas-medicas/:id` - Actualizar ficha

#### DELETE `/api/v0/fichas-medicas/:id` - Eliminar ficha

---

### Historiales Médicos

#### POST `/api/v0/historiales-medicos` - Crear historial

**Body:**
```json
{
  "id_cliente": 1,
  "fecha_consulta": "2024-04-11T10:30:00Z",
  "motivo_consulta": "Control de presión arterial",
  "diagnostico": "Hipertensión leve",
  "tratamiento": "Medicación y dieta",
  "observaciones": "Paciente en buen estado general",
  "presion_arterial": "140/90",
  "temperatura": 36.5,
  "peso": 75.5,
  "altura": 1.75,
  "frecuencia_cardiaca": 72,
  "medico": "Dr. Carlos López",
  "fecha_registro": "2024-04-11T10:30:00Z"
}
```

**Response (201):** Historial creado

#### GET `/api/v0/historiales-medicos` - Obtener todos

#### GET `/api/v0/historiales-medicos/:id` - Obtener por ID

#### PUT `/api/v0/historiales-medicos/:id` - Actualizar

#### DELETE `/api/v0/historiales-medicos/:id` - Eliminar

---

### Recetas

#### POST `/api/v0/recetas` - Crear receta

**Body:**
```json
{
  "id_cliente": 1,
  "doctor_remitente": "Dr. López",
  "ruc_doctor_remitente": "1701234567001",
  "hospital_remitente": "Hospital Central",
  "telefono_hospital": "+593-2-1234567",
  "correo": "hospital@example.com",
  "codigo": 12345,
  "fecha": "2024-04-11T10:30:00Z"
}
```

**Response (201):** Receta creada

#### GET `/api/v0/recetas` - Obtener todas

#### GET `/api/v0/recetas/:id` - Obtener por ID

#### PUT `/api/v0/recetas/:id` - Actualizar

#### DELETE `/api/v0/recetas/:id` - Eliminar

---

### Dosis

#### POST `/api/v0/dosis` - Crear dosis

**Body:**
```json
{
  "id_receta": 1,
  "id_medicamento": 5,
  "cantidad": 30,
  "instrucciones": "Tomar 1 comprimido cada 8 horas después de las comidas"
}
```

**Response (201):** Dosis creada

#### GET `/api/v0/dosis` - Obtener todas

#### GET `/api/v0/dosis/:id` - Obtener por ID

#### PUT `/api/v0/dosis/:id` - Actualizar

#### DELETE `/api/v0/dosis/:id` - Eliminar

---

### Inventario

#### POST `/api/v0/inventario` - Crear registro

**Body:**
```json
{
  "id_maquina": 1,
  "nombre_medicamento": "Amoxicilina",
  "marca": "Amoxor",
  "precio": 15.50,
  "cantidad": 100,
  "resetado": false
}
```

**Response (201):** Registro creado

#### GET `/api/v0/inventario` - Obtener todos

#### GET `/api/v0/inventario/:id` - Obtener por ID

#### PUT `/api/v0/inventario/:id` - Actualizar

#### DELETE `/api/v0/inventario/:id` - Eliminar

---

### Máquinas

#### POST `/api/v0/maquinas` - Crear máquina

**Body:**
```json
{
  "ubicacion": "Farmacia Centro, Calle Principal 123",
  "activo": true,
  "latitud": -0.2184,
  "longitud": -78.5158
}
```

**Response (201):** Máquina creada

#### GET `/api/v0/maquinas` - Obtener todas

#### GET `/api/v0/maquinas/:id` - Obtener por ID

#### PUT `/api/v0/maquinas/:id` - Actualizar

#### DELETE `/api/v0/maquinas/:id` - Eliminar

---

## ✅ Validaciones

Todos los endpoints POST y PUT incluyen validación automática:

- **Campos requeridos:** Se validan según el modelo
- **Formatos:** Email, fechas, números, etc.
- **Longitudes:** Min/max de caracteres
- **Enumeraciones:** Valores permitidos (ej: rol, sexo, tipo de sangre)

**Respuesta de Error (400):**
```json
{
  "error": "Errores de validación",
  "details": [
    {
      "field": "correo",
      "message": "El correo debe ser un email válido"
    }
  ]
}
```

---

## 🎯 Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en desarrollo (con auto-reload) |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Inicia el servidor compilado |
| `npm test` | Ejecuta los tests |
| `npm run lint` | Valida el código con ESLint |
| `npm run prettier` | Formatea el código con Prettier |
| `npm run types` | Verifica tipos de TypeScript |

---

## 🐛 Resolución de Problemas

### PostgreSQL no está corriendo

```powershell
# Windows - iniciar el servicio PostgreSQL
net start PostgreSQL15
```

### Error: "relation 'clientes' does not exist"

La base de datos se sincroniza automáticamente al iniciar. Si ves este error:

1. Limpia las tablas:
```sql
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
-- ... etc
```

2. Reinicia el servidor:
```bash
npm run build
npm run dev
```

### Error de conexión a BD

Verifica tu `.env`:
```env
# Formato correcto
DB_URL=postgres://usuario:contraseña@localhost:5432/farmatica
```

---

## 📝 Notas

- Todos los timestamps incluyen `createdAt` y `updatedAt` automáticamente
- Los IDs son auto-incrementales de tipo BIGINT
- Las respuestas de error incluyen detalles para debugging
- El schema utilizado es `public`

---

**Versión:** 1.0.0  
**Última actualización:** 2024-04-11

