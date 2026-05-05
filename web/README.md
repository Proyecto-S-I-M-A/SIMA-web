# Web de S.I.M.A.

Interfaz web pensada para el uso exclusivo de doctores. Desde aquí se gestiona la consulta y creación de recetas electrónicas, así como el acceso a la información necesaria para operar el sistema de dispensación de S.I.M.A.

## Descripción

Esta aplicación web funciona como panel médico del Sistema Inteligente de Máquina Automatizada. Su foco es la gestión de recetas, la consulta de datos del paciente y la interacción con los flujos que alimentan la máquina expendedora de medicamentos.

## Tecnologías utilizadas

- React 19
- React Router 7
- Vite
- TypeScript
- Material UI
- Emotion
- Tailwind CSS 4
- React Hook Form
- React Query
- Zod

## Estado actual

- Base del frontend creada.
- Interfaz orientada a doctores.
- Integración con la API en progreso.
- Proyecto general con backend completado.

## Funcionalidades previstas

- Inicio de sesión de doctores.
- Gestión de recetas electrónicas.
- Consulta de datos del paciente.
- Vistas administrativas y de detalle.

## Instalación

```bash
cd web
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación se ejecuta en `http://localhost:5173`.

## Build de producción

```bash
npm run build
```

## Estructura general

```text
app/
├── components/
├── config/
├── lib/
├── pages/
├── routes/
├── types/
├── root.tsx
└── routes.ts
```

## Descripción de carpetas

### `app/components/`
Componentes reutilizables de la interfaz, como botones, selectores y paneles visuales compartidos entre pantallas.

### `app/config/`
Configuración central de la aplicación, como URLs de API, constantes y valores de entorno.

### `app/lib/`
Funciones de apoyo para el consumo de la API, manejo de cookies, sesión, consultas y refresco de datos.

### `app/pages/`
Pantallas principales del frontend organizadas por contexto funcional.

- `admin/`: vistas administrativas para control interno.
- `autenticacion/`: flujo de autenticación y acceso.
- `dashboard/`: panel principal del doctor.
- `detalles/`: vistas de detalle de pacientes, recetas o registros.
- `login/`: pantalla de inicio de sesión.

### `app/routes/`
Definición de rutas de React Router y manejo de navegación de la aplicación.

### `app/types/`
Tipos de TypeScript compartidos entre componentes, páginas y utilidades.

### `app/root.tsx`
Componente raíz de la aplicación, donde se define la estructura global y los proveedores principales.

### `app/routes.ts`
Mapa o configuración central de rutas de la aplicación.

### `app/app.css`
Estilos globales de la interfaz.

### `app/theme.ts`
Definición del tema visual utilizado por Material UI y la consistencia de estilos.

## Integrantes

| Nombre | Rol | Correo | GitHub |
| --- | --- | --- | --- |
| Nombre integrante 1 | --- | --- | --- |
| Nombre integrante 2 | --- | --- | --- |
| Nombre integrante 3 | --- | --- | --- |

## Nota

La app móvil del cliente está contemplada aparte y se desarrollará con Expo y React Native.
