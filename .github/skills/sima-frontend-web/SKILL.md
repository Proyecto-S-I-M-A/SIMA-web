---
name: sima-frontend-web
description: 'Construye funcionalidades en la web de SIMA con React 19, React Router 7, TypeScript, MUI, React Query y Zod. Usar para pantallas, formularios, rutas y consumo de API.'
argument-hint: 'Que flujo frontend quieres implementar en la web de doctores?'
user-invocable: true
disable-model-invocation: false
---

# Frontend Web para SIMA

## Cuando usar
- Crear o ajustar pantallas en `web/app/pages`.
- Definir navegacion y proteccion de rutas en `web/app/routes` y `web/app/routes.ts`.
- Integrar llamadas API con utilidades en `web/app/lib`.
- Implementar formularios tipados con validacion.

## Flujo de trabajo
1. Definir caso de uso medico.
2. Disenar contrato de datos con backend.
3. Estructurar pagina y rutas.
4. Implementar consulta/mutacion y estado UI.
5. Validar formulario y sesion.
6. Ajustar responsive y consistencia visual.

## Procedimiento
1. Describe objetivo y criterios de exito.
Incluye:
- Rol (doctor/admin) y accion esperada.
- Datos minimos para completar la tarea.

2. Revisa contratos de API antes de codificar.
Decision:
- Si ya existe endpoint, consume desde cliente API.
- Si falta endpoint o campos, registra dependencia con backend antes de finalizar UI.

3. Ubica cada pieza en su carpeta correcta.
Mapa sugerido:
- Vista principal en `web/app/pages`.
- Componente reutilizable en `web/app/components`.
- Tipos de dominio en `web/app/types`.
- Cliente HTTP/queries en `web/app/lib`.

4. Implementa manejo de datos.
Detalles:
- Usa React Query para cache, loading y reintentos.
- Encapsula acceso HTTP en `web/app/lib/apiClient.ts` y helpers de `web/app/lib`.

5. Implementa formularios robustos.
Detalles:
- Usa React Hook Form + Zod para validacion declarativa.
- Muestra errores de forma contextual y bloquea envio invalido.

6. Aplica autenticacion/sesion.
Decision:
- Si la ruta es privada, valida sesion/cookie antes de renderizar datos sensibles.
- Si la ruta es publica, evita exponer informacion clinica.

7. Homologa estilo y experiencia.
Detalles:
- Reutiliza tema global definido en `web/app/theme.ts`.
- Evita estilos ad-hoc repetidos cuando ya existe patron compartido.

8. Verifica resultados.
Checklist minimo:
- Carga inicial.
- Estado vacio.
- Error de API.
- Exito y feedback al usuario.
- Comportamiento en movil y escritorio.

## Criterios de calidad
- Flujo funcional de punta a punta para el caso de uso definido.
- Manejo explicito de loading/error/empty/success.
- Sincronizacion correcta con API y tipos.
- Navegacion clara y segura segun autenticacion.
- Coherencia visual con el resto del panel.

## Salida esperada
- Componentes y pagina implementados.
- Tipos y llamadas API alineados.
- Ruta conectada y navegable.
- Validaciones y estados de UX completos.
