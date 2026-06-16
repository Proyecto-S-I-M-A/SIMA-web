# Web de S.I.M.A.

Panel web exclusivo para doctores que permite gestionar recetas electrónicas y consultar información de pacientes dentro del sistema de dispensación S.I.M.A.

## Herramientas utilizadas

| Herramienta | Versión | Función |
|-------------|---------|---------|
| React | 19 | Librería de UI |
| React Router | 7.14 | Enrutamiento y SSR |
| Vite | 8 | Bundler y servidor de desarrollo |
| TypeScript | 5.9 | Tipado estático |
| Material UI (MUI) | 9 | Componentes de interfaz |
| Emotion | 11 | CSS-in-JS (requerido por MUI) |
| Tailwind CSS | 4 | Utilidades de estilos |
| React Hook Form | 7 | Manejo de formularios |
| TanStack React Query | 5 | Estado del servidor y caché |
| Zod | 4 | Validación de esquemas |
| Font Awesome | 7 | Iconos |

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- API de S.I.M.A. corriendo (ver [api/README.md](../api/README.md))

## Inicialización

### 1. Instalar dependencias

```bash
cd web
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con los valores correspondientes:

```env
VITE_API_URL=http://localhost:3000
```

| Variable | Valor por defecto | Descripción |
|----------|------------------|-------------|
| `VITE_API_URL` | `http://localhost:3000` | URL base de la API |

### 3. Iniciar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Scripts disponibles

```bash
npm run dev        # Inicia el servidor de desarrollo con hot reload
npm run build      # Compila para producción
npm run start      # Sirve el build de producción
npm run typecheck  # Verifica tipos y genera tipos de React Router
```

## Rutas

### Rutas públicas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | `routes/index.tsx` | Redirige a `/login` |
| `/login` | `pages/login/` | Pantalla de inicio de sesión para doctores |
| `/autenticacion` | `pages/autenticacion/` | Verificación OTP tras el login |
| `/no-autorizado` | `pages/unauthorized/` | Acceso denegado |

### Rutas protegidas (requieren sesión activa)

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/home` | `pages/dashboard/` | Dashboard principal: tabla de pacientes y estadísticas |
| `/home/historial` | `pages/historial/` | Historial de recetas del doctor |
| `/home/nueva-receta` | `pages/nueva-receta/` | Formulario para crear una receta electrónica |
| `/home/paciente/:cedula` | `pages/detalles/` | Detalle de un paciente por cédula |
| `/admin` | `pages/admin/` | Panel CRUD completo de todas las entidades |

### Ruta comodín

| Ruta | Descripción |
|------|-------------|
| `/*` | `routes/catch-all.tsx` — Captura rutas no definidas |

## Estructura del proyecto

```text
app/
├── components/          # Componentes reutilizables globales
├── config/              # URLs de API y constantes de entorno
├── lib/                 # Hooks, cliente HTTP, helpers de sesión y queries
│   └── api/             # Hooks de React Query por recurso
├── pages/
│   ├── admin/           # Panel administrativo con CRUD de entidades
│   │   └── components/  # Formularios y tablas por entidad (Acceso, Cliente, Receta…)
│   ├── autenticacion/   # Flujo de verificación OTP
│   ├── dashboard/       # Panel principal del doctor
│   │   ├── components/  # Navbar, tabla de pacientes, tarjetas de estadísticas
│   │   └── hooks/       # Lógica de la tabla de pacientes
│   ├── detalles/        # Vista de detalle de paciente
│   ├── historial/       # Historial de recetas con dosis
│   ├── login/           # Inicio de sesión
│   ├── nueva-receta/    # Creación de receta con secciones y medicamentos
│   └── unauthorized/    # Página de acceso denegado
├── routes/              # Rutas de React Router
├── types/               # Tipos TypeScript compartidos
├── root.tsx             # Componente raíz y proveedores globales
├── routes.ts            # Mapa de rutas de la aplicación
├── app.css              # Estilos globales
└── theme.ts             # Tema de Material UI
```

## Componentes globales

- **ButtonVariant** — Botón reutilizable con variantes y tamaños.
- **CustomeSelectQuery** — Select conectado a endpoints con `useQueryAll`.
- **CustomeTabPanel** — Paneles reutilizables para tabs administrativas.
- **ProtectedRoute** — Wrapper de rutas protegidas que valida sesión activa.

## Utilidades (lib)

- **apiClient** — Cliente HTTP con soporte de auth y manejo de errores.
- **GetCookie / GetSession** — Helpers para leer tokens y sesión del navegador.
- **useProtectedRoute** — Hook para proteger pantallas privadas.
- **RefreshQuery** — Helper de invalidación de caché en React Query.

## Deploy

1. Configura variables de entorno de producción en `.env`.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Compila para producción:
   ```bash
   npm run build
   ```
4. Sirve el build (SSR) o publica `dist/` en tu hosting estático:
   ```bash
   npm run start
   ```

**Notas**
- En local, `VITE_API_URL` apunta a `http://localhost:3000`.
- Ajusta `CROSS_ORIGIN` en la API para permitir el dominio del frontend en producción.

## Integrantes

| Nombre | Rol | Correo | GitHub |
| --- | --- | --- | --- |
| Nombre integrante 1 | --- | --- | --- |
| Nombre integrante 2 | --- | --- | --- |
| Nombre integrante 3 | --- | --- | --- |

## Nota

La app móvil del cliente está contemplada aparte y se desarrollará con Expo y React Native.
