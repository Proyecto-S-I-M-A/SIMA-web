---
name: sima-backend-api
description: 'Implementa y modifica endpoints en la API de SIMA con Express, TypeScript, Sequelize y Supabase Auth. Usar para CRUD, validaciones, middleware y pruebas HTTP.'
argument-hint: 'Que endpoint o flujo backend quieres construir o ajustar?'
user-invocable: true
disable-model-invocation: false
---

# Backend API para SIMA

## Cuando usar
- Crear o ajustar endpoints en `api/src/routes` y `api/src/controllers`.
- Agregar validaciones en `api/src/middleware`.
- Extender modelos y tipos en `api/src/models` y `api/src/types`.
- Integrar autenticacion/autorizacion con Supabase.

## Flujo de trabajo
1. Definir contrato del endpoint.
2. Revisar impacto en modelo, tipo y validacion.
3. Implementar controlador y ruta.
4. Conectar middleware de auth/validacion.
5. Probar con archivos HTTP y validaciones tecnicas.

## Procedimiento
1. Especifica el endpoint.
Incluye:
- Metodo HTTP y ruta con prefijo `/api/v0`.
- Payload esperado (body/query/params).
- Respuestas de exito y error con codigos HTTP.

2. Decide si es recurso nuevo o existente.
Decision:
- Si es recurso existente, modifica `CRUD_*` y su `Route_*` asociado.
- Si es recurso nuevo, crea trio completo: modelo + controlador + ruta + middleware de validacion.

3. Alinea tipos y modelo de datos.
Detalles:
- Actualiza interfaces en `api/src/types`.
- Verifica modelo Sequelize en `api/src/models` y relaciones en `api/src/models/index.ts` si aplica.

4. Implementa validaciones de entrada.
Detalles:
- Usa `express-validator` en `api/src/middleware/validate*.ts`.
- Define mensajes claros y consistentes para errores `400`.

5. Implementa o ajusta controlador.
Detalles:
- Mantiene la logica de negocio en controladores y evita duplicacion.
- Estandariza respuestas JSON y manejo de excepciones.

6. Protege rutas cuando sea necesario.
Decision:
- Si la ruta es privada, agrega middleware `requireSupabaseAuth`.
- Si es publica, documenta razon y limita superficie de datos expuestos.

7. Registra la ruta en la aplicacion.
Detalles:
- Conecta el archivo de rutas en el bootstrap correspondiente (`app.ts`/`server.ts`).

8. Valida funcionamiento.
Detalles:
- Ejecuta pruebas manuales con `api/httpTest/*.http`.
- Corre checks de tipos/lint/tests segun impacto.

## Criterios de calidad
- Contrato del endpoint consistente con el resto de la API.
- Validacion de entrada completa (body, query o params segun aplique).
- Manejo correcto de auth y roles si corresponde.
- Respuestas y codigos HTTP previsibles.
- Tipos TypeScript sincronizados con modelos y controladores.

## Checklist de cierre
- Ruta registrada y accesible.
- Validadores conectados.
- Errores de compilacion/lint resueltos.
- Casos de exito/error probados desde archivo `.http`.
