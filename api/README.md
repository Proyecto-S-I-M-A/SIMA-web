# API de FarmaTicAPI

API REST encargada de la lógica central de la plataforma de recetas electrónicas y dispensación de medicamentos. Esta carpeta contiene el backend ya completado del proyecto.

## Descripción

La API administra autenticación, pacientes, doctores, recetas, historiales, inventario, dosis y la información asociada a la máquina expendedora. También expone rutas públicas para iniciar sesión y consultar recetas por cédula.

## Tecnologías utilizadas

- Node.js
- Express 5
- TypeScript
- Sequelize
- PostgreSQL
- Supabase Auth
- JWT
- bcrypt
- express-validator
- CORS

## Estado actual

- Backend completado.
- Rutas principales funcionales.
- Integración con frontends aún dependiente del desarrollo de la web y la app móvil.

## Requisitos

- Node.js 18 o superior.
- npm 9 o superior.
- PostgreSQL.
- Variables de entorno configuradas.

## Instalación

```bash
cd api
npm install
```

## Variables de entorno

Crear un archivo `.env` dentro de `api/` con valores similares a estos:

```env
PORT=3000
NODE_ENV=development
CROSS_ORIGIN=http://localhost:5173
DB_URL=postgres://usuario:contraseña@localhost:5432/farmatica
PROJECT_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_clave_anon_publica
```

## Scripts

- `npm run dev`: compila TypeScript y levanta el servidor con nodemon.
- `npm run build`: compila el proyecto.
- `npm run start`: ejecuta la versión compilada.
- `npm run test`: ejecuta pruebas con Jest.
- `npm run lint`: valida el código con ESLint.
- `npm run types`: ejecuta TypeScript en modo sin salida.

## Autenticación

La mayoría de rutas de negocio requieren un token Bearer válido obtenido desde Supabase.

Flujo general:

1. Iniciar sesión con `POST /api/v0/auth/login`.
2. Usar el `access_token` en el encabezado `Authorization: Bearer <token>`.
3. Refrescar sesión con `POST /api/v0/auth/refresh-token` usando el `refresh_token`.

## Rutas públicas

### `POST /api/v0/auth/login`

Inicia sesión con Supabase y devuelve `access_token` y `refresh_token`.

Body:

```json
{
	"email": "doctor@correo.com",
	"password": "Password123"
}
```

### `POST /api/v0/auth/signup`

Crea una cuenta de autenticación en Supabase.

Body:

```json
{
	"email": "doctor@correo.com",
	"password": "Password123"
}
```

### `POST /api/v0/auth/refresh-token`

Renueva la sesión usando el token de refresco.

Body:

```json
{
	"refresh_token": "eyJhbGciOi..."
}
```

### `GET /api/v0/recetas/cliente/:cedula`

Busca la receta asociada a la cédula del cliente. Es un endpoint público para consulta rápida desde la app o la máquina.

## Rutas principales protegidas

### Accesos

Modelo base: [Acceso](src/models/Acceso.ts)

#### `POST /api/v0/accesos`

Registra un acceso o sesión interna.

Body:

```json
{
	"id": "supabase-user-id",
	"usuario": "Dr. Juan Pérez",
	"correo": "doctor@correo.com",
	"tipo": "doctor",
	"ultimo_acceso": "2026-05-02T12:00:00Z",
	"activo": true
}
```

#### `GET /api/v0/accesos/:id`

Consulta un acceso por su identificador string.

#### `PUT /api/v0/accesos/:id`

Actualiza los datos del acceso.

#### `DELETE /api/v0/accesos/:id`

Elimina un acceso por `id`.

### Clientes

Modelo base: [Cliente](src/models/Cliente.ts)

#### `POST /api/v0/clientes`

Crea un paciente para el flujo de recetas.

Body:

```json
{
	"nombre": "Juan",
	"apellido": "Pérez",
	"cedula": "1234567890",
	"correo": "juan.perez@email.com",
	"asegurado": true,
	"verificado": false,
	"sexo": "M"
}
```

#### `GET /api/v0/clientes/:id`

Consulta un cliente por `id`.

#### `PUT /api/v0/clientes/:id`

Actualiza nombre, apellido, cédula, correo, asegurado, verificado y sexo.

#### `DELETE /api/v0/clientes/:id`

Elimina un cliente por `id`.

### Usuarios

Modelo base: [Usuario](src/models/Usuario.ts)

#### `POST /api/v0/usuarios`

Registra un usuario interno, normalmente un doctor o administrador.

Body:

```json
{
	"nombre": "Juan",
	"apellido": "Pérez",
	"rol": "doctor",
	"ruc_doctor": "1701234567001",
	"especialidades": "Medicina general",
	"activo": true
}
```

#### `GET /api/v0/usuarios/:id`

Consulta un usuario por `id`.

#### `PUT /api/v0/usuarios/:id`

Actualiza nombre, apellido, rol, RUC y especialidades.

#### `DELETE /api/v0/usuarios/:id`

Elimina un usuario por `id`.

### Fichas médicas

Modelo base: [FichaMedica](src/models/FichaMedica.ts)

#### `POST /api/v0/fichas-medicas`

Guarda la ficha clínica básica del cliente.

Body:

```json
{
	"tipo_sanguineo": "O+",
	"alergenos": "Penicilina",
	"enfermedad_cronica": "Hipertension"
}
```

#### `GET /api/v0/fichas-medicas/:id`

Consulta una ficha por `id`.

#### `PUT /api/v0/fichas-medicas/:id`

Actualiza tipo sanguíneo, alérgenos o enfermedad crónica.

#### `DELETE /api/v0/fichas-medicas/:id`

Elimina una ficha por `id`.

### Historiales médicos

Modelo base: [HistorialMedico](src/models/HistorialMedico.ts)

#### `POST /api/v0/historiales-medicos`

Registra una consulta médica y sus signos vitales.

Body:

```json
{
	"fecha_consulta": "2026-05-02T10:30:00Z",
	"motivo_consulta": "Fiebre y dolor de garganta",
	"diagnostico": "Faringitis",
	"tratamiento": "Reposo e hidratacion",
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

#### `GET /api/v0/historiales-medicos/:id`

Consulta un historial por `id`.

#### `PUT /api/v0/historiales-medicos/:id`

Actualiza la consulta médica registrada.

#### `DELETE /api/v0/historiales-medicos/:id`

Elimina un historial por `id`.

### Recetas

Modelo base: [Receta](src/models/Receta.ts)

#### `POST /api/v0/recetas/cedula/:cedula`

Crea una receta asociando el cliente por su cédula.

Body:

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

#### `POST /api/v0/recetas`

Registra una receta usando el `id_cliente` en el body.

#### `GET /api/v0/recetas/:id`

Consulta una receta por `id`.

#### `PUT /api/v0/recetas/:id`

Actualiza los datos de la receta.

#### `DELETE /api/v0/recetas/:id`

Elimina una receta por `id`.

### Dosis

Modelo base: [Dosis](src/models/Dosis.ts)

#### `POST /api/v0/dosis`

Define la pauta de administración de un medicamento.

Body:

```json
{
	"id_medicamento": 1,
	"cantidad": 2,
	"instrucciones": "Tomar una tableta cada 8 horas"
}
```

#### `GET /api/v0/dosis/:id`

Consulta una dosis por `id`.

#### `PUT /api/v0/dosis/:id`

Actualiza el medicamento, cantidad o instrucciones.

#### `DELETE /api/v0/dosis/:id`

Elimina una dosis por `id`.

### Inventario

Modelo base: [Inventario](src/models/Inventario.ts)

#### `POST /api/v0/inventario`

Registra un medicamento disponible para dispensación.

Body:

```json
{
	"nombre_medicamento": "Paracetamol 500 mg",
	"marca": "Genfar",
	"precio": 2.5,
	"cantidad": 100,
	"resetado": false
}
```

#### `GET /api/v0/inventario/:id`

Consulta un medicamento por `id`.

#### `PUT /api/v0/inventario/:id`

Actualiza nombre, marca, precio, cantidad o estado de reseteo.

#### `DELETE /api/v0/inventario/:id`

Elimina un registro del inventario.

### Máquinas

Modelo base: [Maquina](src/models/Maquina.ts)

#### `POST /api/v0/maquinas`

Registra una máquina expendedora dentro de la red del sistema.

Body:

```json
{
	"ubicacion": "Hospital Central - Planta baja",
	"activo": true,
	"latitud": -0.1807,
	"longitud": -78.4678
}
```

#### `GET /api/v0/maquinas/:id`

Consulta una máquina por `id`.

#### `PUT /api/v0/maquinas/:id`

Actualiza la ubicación, estado o coordenadas de la máquina.

#### `DELETE /api/v0/maquinas/:id`

Elimina una máquina por `id`.

## Referencia de modelos

- [Acceso](src/models/Acceso.ts): acceso, usuario, correo, tipo, ultimo_acceso, activo.
- [Cliente](src/models/Cliente.ts): nombre, apellido, cédula, correo, asegurado, verificado y sexo.
- [Usuario](src/models/Usuario.ts): nombre, apellido, rol, ruc_doctor, especialidades y activo.
- [FichaMedica](src/models/FichaMedica.ts): tipo_sanguineo, alergenos y enfermedad_cronica.
- [HistorialMedico](src/models/HistorialMedico.ts): consulta, diagnóstico, tratamiento y signos vitales.
- [Receta](src/models/Receta.ts): doctor_remitente, ruc_doctor_remitente, hospital_remitente, telefono_hospital, correo, codigo y fecha.
- [Dosis](src/models/Dosis.ts): id_medicamento, cantidad e instrucciones.
- [Inventario](src/models/Inventario.ts): nombre_medicamento, marca, precio, cantidad y resetado.
- [Maquina](src/models/Maquina.ts): ubicacion, activo, latitud y longitud.

## Estructura

```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── types/
├── app.ts
└── server.ts
```

## Observación

Las rutas están organizadas bajo el prefijo `/api/v0`.