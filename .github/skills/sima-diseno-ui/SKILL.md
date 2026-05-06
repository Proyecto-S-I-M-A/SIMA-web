---
name: sima-diseno-ui
description: 'Disena interfaces para SIMA Web con foco medico. Usar para crear pantallas, componentes y sistemas visuales coherentes con React Router 7, MUI y Tailwind.'
argument-hint: 'Que pantalla o flujo medico quieres disenar?'
user-invocable: true
disable-model-invocation: false
---

# Diseno UI para SIMA

## Cuando usar
- Diseno de nuevas pantallas para doctores (login, dashboard, detalles, recetas).
- Rediseno visual de componentes existentes en `web/app/components`.
- Definicion de identidad visual consistente en `web/app/theme.ts` y `web/app/app.css`.

## Flujo de trabajo
1. Definir objetivo de la pantalla.
2. Delimitar el contexto clinico.
3. Elegir estructura de layout.
4. Disenar jerarquia de contenido.
5. Definir sistema visual y estados.
6. Traducir diseno a componentes reutilizables.
7. Validar accesibilidad y responsive.

## Procedimiento
1. Levanta requisitos funcionales.
Detalles:
- Identifica que accion debe completar el doctor (crear receta, buscar paciente, validar datos).
- Enumera campos obligatorios, tablas y acciones primarias/secundarias.

2. Decide complejidad de la pantalla.
Decision:
- Si tiene un unico objetivo, usa estructura de una columna con CTA principal.
- Si mezcla datos y acciones, usa layout de dos zonas: resumen + formulario/tabla.

3. Define componentes base.
Detalles:
- Revisa reutilizacion en `web/app/components` antes de crear componentes nuevos.
- Si falta un patron comun, crea componente compartido en lugar de duplicar UI en paginas.

4. Establece tokens visuales.
Detalles:
- Centraliza colores, tipografia, espaciado y elevacion en `web/app/theme.ts`.
- Deja estilos globales minimos en `web/app/app.css` y evita reglas locales repetitivas.

5. Disena estados de interfaz.
Incluye siempre:
- Cargando
- Vacio
- Error
- Exito
- Deshabilitado

6. Asegura consistencia de formularios.
Detalles:
- Mantiene patrones de validacion compatibles con React Hook Form y Zod.
- Ubica mensajes de error junto al campo y resumen arriba si hay multiples errores.

7. Verifica experiencia responsive.
Decision:
- En escritorio: prioriza productividad (mas densidad informativa).
- En movil: prioriza legibilidad y acciones secuenciales.

## Criterios de calidad
- La pantalla permite completar la tarea medica sin ambiguedad.
- El CTA principal es evidente y unico por vista.
- Todos los estados clave (loading, vacio, error, exito) estan definidos.
- No hay duplicacion de componentes o estilos sin justificacion.
- El diseno se alinea con el tema global del proyecto.

## Entregables
- Estructura visual descrita por secciones.
- Lista de componentes a reutilizar/crear.
- Reglas de estilos y estados a implementar.
- Checklist de validacion UX y responsive.
