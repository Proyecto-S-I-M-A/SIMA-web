---
name: actualizar-documentacion
description: "Usar cuando: actualizar documentacion de README para API y Web, incluyendo endpoints, modelos, controladores, autenticacion, validaciones, tecnologias, componentes globales, libs utiles, query helpers y guias de deploy. Invocacion: actualizar documentacion."
argument-hint: "Que seccion del README quieres actualizar (api, web, o ambas) y que cambios especificos deseas?"
user-invocable: true
---

# Actualizar Documentacion (README)

## Objetivo
Actualizar la documentacion de los README del proyecto para API y Web, siguiendo la estructura existente y cubriendo:
- API: endpoints, modelos relacionados, controladores, autenticacion y validacion de inputs.
- Web: tecnologias usadas, componentes globales utiles, libs utiles y query helpers.
- Deploy: guia de despliegue para API y para Web.

## Cuando usar
- Cuando el usuario pida "actualizar documentacion" o mencione cambios en README.
- Cuando se agreguen endpoints, modelos, controladores o validaciones en API.
- Cuando se agreguen componentes globales, libs o helpers en Web.
- Cuando se necesite incluir o ajustar instrucciones de deploy.

## Flujo de trabajo
1. Identificar el/los README objetivo.
2. Revisar fuentes en el codigo (rutas, controladores, modelos, middleware, lib, componentes).
3. Redactar secciones claras, concisas y consistentes con el estilo actual.
4. Incluir ejemplos de uso cuando existan (.http, curl, o payloads tipicos).
5. Verificar que la guia de deploy este completa y separada para API y Web.

## Checklist de contenido
### API
- Lista de endpoints por recurso (ruta, metodo, descripcion, parametros principales).
- Modelos relacionados y relaciones relevantes (por ejemplo, many-to-many).
- Controladores asociados a cada recurso.
- Autenticacion (Supabase, headers requeridos, rutas protegidas).
- Validacion de inputs (middleware y reglas principales).
- Referencias a archivos de pruebas HTTP si existen.

### Web
- Tecnologias principales (React, React Router, MUI, React Query, Zod, etc.).
- Componentes globales utiles (ubicacion y proposito).
- Librerias y utilidades clave en lib (api client, helpers, etc.).
- Query helpers (ubicacion, nombres, patrones de uso).

### Deploy
- API: requisitos, variables de entorno, build, run, puertos, servicios externos.
- Web: requisitos, build, hosting estatico, variables, comandos.
- Diferenciar desarrollo vs produccion si aplica.

## Estilo
- Mantener el idioma y formato existente del README.
- Usar listas y tablas solo si ya se usan en el proyecto.
- Evitar duplicar contenido entre API y Web.
- Ser especifico y verificable (paths reales, comandos reales).

## Salida esperada
- README de API actualizado con endpoints, modelos, controladores, auth y validaciones.
- README de Web actualizado con tecnologias, componentes y libs utiles.
- Guia de deploy clara para ambos (API y Web).
