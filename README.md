# S.I.M.A.

**Sisteam Inteligente Medicación Asistida** - Plataforma completa para una máquina expendedora de medicamentos con recetas electrónicas. El proyecto contempla tres frentes: una API para la lógica de negocio, una web para doctores, una app móvil para clientes y un panel para el retiro de medicamentos en la máquina.

## Descripción

S.I.M.A. es un sistema integral que permite a los doctores gestionar recetas electrónicas desde la web, a los clientes consultar su información desde la app móvil y a la máquina validar y dispensar medicamentos según la receta aprobada. La arquitectura separa claramente el backend, el frontend web y el cliente móvil para facilitar mantenimiento, escalabilidad y evolución del sistema.

## Tecnologías utilizadas

- Backend: Node.js, Express, TypeScript, Sequelize, PostgreSQL, Supabase Auth, JWT, bcrypt, express-validator y CORS.
- Web: React 19, React Router 7, Vite, TypeScript, Material UI, Emotion, Tailwind CSS, React Hook Form, React Query y Zod.
- App móvil: Expo, React Native y TypeScript.
- Infraestructura y soporte: Supabase, Docker y pruebas HTTP manuales.

## Estado actual del proyecto

- Backend: completado (API REST con todos los endpoints documentados).
- Web para doctores: en desarrollo (dashboard, recetas, historial y admin operativos).
- App móvil para clientes: en desarrollo (Expo + React Native).
- Panel de la máquina: pendiente de integración o desarrollo.

## Integrantes

| Nombre | Rol | Correo | GitHub |
| --- | --- | --- | --- |
| Nombre integrante 1 | --- | --- | --- |
| Nombre integrante 2 | --- | --- | --- |
| Nombre integrante 3 | --- | --- | --- |

## Documentación por módulo

- [API (prefijo /api/v1)](api/README.md)
- [Web](web/README.md)

## Estructura general

- `api/`: servicio backend y reglas de negocio.
- `web/`: panel web para doctores.
- `app móvil`: cliente para clientes, basado en Expo React Native.
- `panel de la máquina`: módulo para el retiro de medicamentos.

## Flujo general

1. El doctor inicia sesión desde la web.
2. Crea o consulta recetas electrónicas.
3. El cliente revisa su receta desde la app móvil.
4. La máquina valida la receta y entrega el medicamento autorizado.

## Notas

Este repositorio contiene actualmente el backend completo y la base del frontend web. La app móvil y el panel de la máquina forman parte del alcance funcional del sistema y pueden documentarse o implementarse como módulos separados.

