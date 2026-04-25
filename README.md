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
4. Para refrescar sesión, envía el `refresh_token` en `Authorization: Bearer <refresh_token>` a `POST /api/v0/auth/refresh-token`.

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
│   ├── config/
│   │   ├── database.ts
│   │   ├── sequelize.ts
│   │   └── supabase.ts
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── app.ts               # Configuración de Express
│   └── server.ts            # Punto de entrada
├── package.json
├── tsconfig.json
└── jest.config.js
```

---

## 🔌 Endpoints

> Todas las rutas de este bloque requieren autenticación Bearer, excepto:
>
> - `POST /api/v0/auth/login`
> - `POST /api/v0/auth/signup`
> - `POST /api/v0/auth/refresh-token`
> - `GET /api/v0/recetas/cliente/:cedula`

### Sesión (públicas)

#### POST `/api/v0/auth/login`

Body requerido:
```json
{
  "email": "usuario@dominio.com",
  "password": "Password123"
}
```

#### POST `/api/v0/auth/signup`

Body requerido:
```json
{
  "email": "usuario@dominio.com",
  "password": "Password123"
}
```

#### POST `/api/v0/auth/refresh-token`

No usa body. Requiere header:

```http
Authorization: Bearer <refresh_token>
```

### Recetas por cédula

#### GET `/api/v0/recetas/cliente/:cedula` (pública)

Busca la receta del cliente usando la cédula.

#### POST `/api/v0/recetas/cedula/:cedula` (protegida)

Crea receta tomando `id_cliente` desde la cédula de la URL.

Body recomendado:
```json
{
  "doctor_remitente": "Dr. López",
  "ruc_doctor_remitente": "1701234567001",
  "hospital_remitente": "Hospital Central",
  "telefono_hospital": "+593-2-1234567",
  "correo": "hospital@example.com",
  "codigo": 12345,
  "fecha": "2024-04-11T10:30:00Z"
}
```

### CRUD protegidos actuales

Actualmente las rutas CRUD implementadas están orientadas a operaciones por `:id`:

#### Accesos
- `POST /api/v0/accesos`
- `GET /api/v0/accesos/:id`
- `PUT /api/v0/accesos/:id`
- `DELETE /api/v0/accesos/:id`

#### Clientes
- `POST /api/v0/clientes`
- `GET /api/v0/clientes/:id`
- `PUT /api/v0/clientes/:id`
- `DELETE /api/v0/clientes/:id`

#### Usuarios
- `POST /api/v0/usuarios`
- `GET /api/v0/usuarios/:id`
- `PUT /api/v0/usuarios/:id`
- `DELETE /api/v0/usuarios/:id`

#### Fichas médicas
- `POST /api/v0/fichas-medicas`
- `GET /api/v0/fichas-medicas/:id`
- `PUT /api/v0/fichas-medicas/:id`
- `DELETE /api/v0/fichas-medicas/:id`

#### Historiales médicos
- `POST /api/v0/historiales-medicos`
- `GET /api/v0/historiales-medicos/:id`
- `PUT /api/v0/historiales-medicos/:id`
- `DELETE /api/v0/historiales-medicos/:id`

#### Recetas
- `POST /api/v0/recetas`
- `GET /api/v0/recetas/:id`
- `PUT /api/v0/recetas/:id`
- `DELETE /api/v0/recetas/:id`

#### Dosis
- `POST /api/v0/dosis`
- `GET /api/v0/dosis/:id`
- `PUT /api/v0/dosis/:id`
- `DELETE /api/v0/dosis/:id`

#### Inventario
- `POST /api/v0/inventario`
- `GET /api/v0/inventario/:id`
- `PUT /api/v0/inventario/:id`
- `DELETE /api/v0/inventario/:id`

#### Máquinas
- `POST /api/v0/maquinas`
- `GET /api/v0/maquinas/:id`
- `PUT /api/v0/maquinas/:id`
- `DELETE /api/v0/maquinas/:id`

### Ejemplos de body actualizados

#### Cliente (POST `/api/v0/clientes`)
```json
{
  "nombre": "Juan",
  "apellido": "Pérez García",
  "cedula": "12345678901",
  "correo": "juan.perez@example.com",
  "sexo": "M",
  "asegurado": true,
  "verificado": false,
  "id_acceso": 1
}
```

#### Usuario (POST `/api/v0/usuarios`)
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": "admin",
  "ruc_doctor": "1701234567001",
  "especialidades": "Cardiologia"
}
```

#### Receta (POST `/api/v0/recetas`)
```json
{
  "id_cliente": 1,
  "doctor_remitente": "Dr. Lopez",
  "ruc_doctor_remitente": "1701234567001",
  "hospital_remitente": "Hospital Central",
  "telefono_hospital": "+593-2-1234567",
  "correo": "hospital@example.com",
  "codigo": 12345,
  "fecha": "2024-04-11T10:30:00Z"
}
```

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
- La mayoría de IDs son numéricos auto-incrementales; valida cada recurso según su middleware
- Las respuestas de error incluyen detalles para debugging
- El schema utilizado es `public`

---

**Versión:** 1.1.0  
**Última actualización:** 2026-04-21

