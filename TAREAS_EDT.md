# FarmaTicAPI - Tareas EDT

## Guía de Uso

Cada tarea incluye:
- **ID**: Identificador único (Módulo.Función)
- **Título**: Nombre descriptivo de la tarea
- **Descripción**: Detalles de qué hacer
- **Criterios de Aceptación**: Requisitos que deben cumplirse para dar la tarea por completa
- **Prioridad**: Alta / Media / Baja
- **Módulo**: Web / Móvil / Backend / Máquina

---

# MÓDULO 1: WEB (Panel para Doctores / Admin)

## Submódulo 1.1: Gestión de Recetas

### TAREA WEB-1.1.1
**Título:** Crear nueva receta desde panel web

**Descripción:**
Implementar formulario en la interfaz web que permita a doctores crear nuevas recetas. El formulario debe incluir campos para datos del doctor, hospital, paciente y medicamentos con dosis.

**Criterios de Aceptación:**
- [ ] Formulario con validación de campos requeridos (doctor, hospital, cédula paciente, medicamentos)
- [ ] Integración con API endpoint POST `/api/v0/receta`
- [ ] Respuesta exitosa muestra mensaje de confirmación
- [ ] Manejo de errores (doctor inválido, hospital inválido, paciente no existe)
- [ ] Guardado exitoso y redirección a listado de recetas

**Prioridad:** Alta  
**Módulo:** Web

---

### TAREA WEB-1.1.2
**Título:** Editar receta existente

**Descripción:**
Permitir a doctores actualizar datos de una receta ya creada (cambiar medicamentos, dosis, instrucciones). Solo el doctor creador o admin pueden editar.

**Criterios de Aceptación:**
- [ ] Búsqueda y carga de receta por ID o código
- [ ] Formulario pre-poblado con datos actuales
- [ ] Validación de cambios
- [ ] Integración con API endpoint PUT `/api/v0/receta/:id`
- [ ] Registro de auditoría (quién modificó y cuándo)
- [ ] Mensaje de confirmación de actualización

**Prioridad:** Alta  
**Módulo:** Web

---

### TAREA WEB-1.1.3
**Título:** Buscar receta por cédula o ID

**Descripción:**
Implementar barra de búsqueda que permita buscar recetas por cédula del paciente o ID de receta. Mostrar resultados en tabla con detalles básicos.

**Criterios de Aceptación:**
- [ ] Campo de búsqueda con validación (cédula o ID)
- [ ] Integración con API endpoint GET `/api/v0/receta/cedula/:cedula` o `/api/v0/receta/:id`
- [ ] Tabla de resultados con columnas: ID, Paciente, Doctor, Fecha, Estado
- [ ] Opción de ver detalle, editar o eliminar desde cada fila
- [ ] Manejo de "sin resultados"

**Prioridad:** Alta  
**Módulo:** Web

---

### TAREA WEB-1.1.4
**Título:** Validar datos del doctor y hospital

**Descripción:**
Implementar validaciones en formulario de receta para garantizar que doctor y hospital existen en sistema. Mostrar sugerencias/autocomplete mientras se escribe.

**Criterios de Aceptación:**
- [ ] Validación de RUC del doctor contra datos de Usuario
- [ ] Autocomplete con listado de doctores disponibles
- [ ] Validación de hospital / institución sanitaria
- [ ] Validación de correo y teléfono
- [ ] Mensaje de error claro si datos no son válidos
- [ ] Caching de datos para mejorar performance

**Prioridad:** Media  
**Módulo:** Web

---

## Submódulo 1.2: Gestión de Pacientes

### TAREA WEB-1.2.1
**Título:** Crear/editar cliente desde panel admin

**Descripción:**
Formulario para crear nuevos clientes (pacientes) o actualizar datos existentes. Incluye nombre, apellido, cédula, correo, sexo, estado de verificación y aseguradora.

**Criterios de Aceptación:**
- [ ] Formulario con validación (cédula única, correo válido)
- [ ] Integración con API POST `/api/v0/cliente` (crear) y PUT `/api/v0/cliente/:id` (editar)
- [ ] Validación de cédula (formato y unicidad)
- [ ] Campos opcionales: teléfono, dirección, aseguradora
- [ ] Feedback de éxito o error
- [ ] Redirección a detalle de cliente tras crear/editar

**Prioridad:** Alta  
**Módulo:** Web

---

### TAREA WEB-1.2.2
**Título:** Consultar cliente por ID o cédula

**Descripción:**
Búsqueda rápida de clientes con vista de perfil detallado incluyendo recetas asociadas, datos de contacto y estado de verificación.

**Criterios de Aceptación:**
- [ ] Búsqueda por cédula o ID de cliente
- [ ] Integración con API GET `/api/v0/cliente/:id` o `/api/v0/cliente/cedula/:cedula`
- [ ] Visualización de perfil: datos básicos, recetas activas, historial
- [ ] Opción de editar perfil desde esta vista
- [ ] Botón para ver recetas detalladas
- [ ] Sin resultados manejado correctamente

**Prioridad:** Alta  
**Módulo:** Web

---

### TAREA WEB-1.2.3
**Título:** Marcar cliente como verificado

**Descripción:**
Admin puede cambiar estado de cliente a "verificado" cuando se confirma identidad o datos críticos. Esto habilita ciertos permisos en la app móvil.

**Criterios de Aceptación:**
- [ ] Toggle o botón "Marcar como Verificado" en vista de cliente
- [ ] Integración con API PUT `/api/v0/cliente/:id` (campo `verificado: true`)
- [ ] Confirmación de acción antes de ejecutar
- [ ] Registro de auditoría (admin que verificó, fecha/hora)
- [ ] Notificación a cliente móvil de cambio de estado
- [ ] Mensaje de éxito

**Prioridad:** Media  
**Módulo:** Web

---

## Submódulo 1.3: Administración e Inventario

### TAREA WEB-1.3.1
**Título:** Ver stock y movimientos de medicamentos

**Descripción:**
Dashboard que muestra inventario total por medicamento, detalles de marca/precio, cantidad disponible y alertas de stock bajo.

**Criterios de Aceptación:**
- [ ] Tabla de inventario: Medicamento, Marca, Precio, Cantidad Total, Stock Bajo (< 5 unidades)
- [ ] Integración con API GET `/api/v0/inventario`
- [ ] Filtros por máquina, medicamento o estado
- [ ] Historial de movimientos (entrada/salida) expandible por medicamento
- [ ] Alerta visual (color) para stock bajo
- [ ] Opción de descargar reporte en CSV

**Prioridad:** Media  
**Módulo:** Web

---

### TAREA WEB-1.3.2
**Título:** Asignar inventario a máquinas expendedoras

**Descripción:**
Interface para asignar medicamentos (cantidad) a máquinas específicas. Permite distribución manual de stock desde almacén central a máquinas.

**Criterios de Aceptación:**
- [ ] Selector de medicamento y cantidad a asignar
- [ ] Selector de máquina destino
- [ ] Validación: cantidad no supere stock disponible
- [ ] Integración con API POST/PUT para actualizar Inventario ligado a Maquina
- [ ] Registro de auditoría (quién asigna, cuándo, cantidad)
- [ ] Confirmación de operación
- [ ] Mensaje de éxito y actualización en tiempo real del inventario

**Prioridad:** Media  
**Módulo:** Web

---

### TAREA WEB-1.3.3
**Título:** Generar reportes e indicadores básicos

**Descripción:**
Reportes de medicamentos más dispensados, máquinas con menor/mayor actividad, recetas por período, y estado general del sistema.

**Criterios de Aceptación:**
- [ ] Gráficos de medicamentos más dispensados (barras/pie)
- [ ] Actividad de máquinas (recetas validadas, dispensaciones exitosas)
- [ ] Período filtrable (día, semana, mes, personalizado)
- [ ] Exportar a PDF o CSV
- [ ] KPIs: Total recetas, total dispensaciones, tasa de éxito
- [ ] Responsivos en dispositivos móviles/tablets
- [ ] Carga optimizada (no bloquear UI)

**Prioridad:** Baja  
**Módulo:** Web

---

## Submódulo 1.4: Autenticación y Roles

### TAREA WEB-1.4.1
**Título:** Login y Logout en panel web

**Descripción:**
Implementar sistema de login seguro para doctores/admin usando Supabase Auth. Gestionar sesión, token JWT y logout.

**Criterios de Aceptación:**
- [ ] Pantalla de login con campos: correo/usuario y contraseña
- [ ] Validación de credenciales contra Supabase Auth
- [ ] Generación y almacenamiento seguro de JWT
- [ ] Redirección a dashboard tras login exitoso
- [ ] Botón Logout que limpia sesión y token
- [ ] Manejo de errores: credenciales inválidas, usuario no existe, cuenta desactivada
- [ ] Opción "Recordarme" (opcional, con seguridad)

**Prioridad:** Alta  
**Módulo:** Web

---

### TAREA WEB-1.4.2
**Título:** Gestión de roles y permisos

**Descripción:**
Sistema de roles (Admin, Doctor, Farmacéutico) que restringe acceso a funciones según permisos. Admin puede crear/revocar roles.

**Criterios de Aceptación:**
- [ ] Roles definidos: Admin (acceso total), Doctor (crear/editar recetas), Farmacéutico (ver inventario)
- [ ] Middleware en frontend para verificar rol antes de mostrar opciones
- [ ] Integración con API para validar permisos en backend
- [ ] Protección de rutas según rol
- [ ] Admin panel para asignar roles a usuarios
- [ ] Auditoría de cambios de rol
- [ ] Manejo de usuario sin permisos (redireccionamiento)

**Prioridad:** Alta  
**Módulo:** Web

---

# MÓDULO 2: MÓVIL (App para Clientes)

## Submódulo 2.1: Recetas y Notificaciones

### TAREA MOV-2.1.1
**Título:** Ver recetas activas en app móvil

**Descripción:**
Pantalla principal que lista todas las recetas activas del cliente (ordenadas por fecha, con estado). Incluye información básica: medicamentos, doctor, fecha creación.

**Criterios de Aceptación:**
- [ ] Integración con API GET `/api/v0/receta/cedula/:cedula`
- [ ] Lista con tarjetas mostrando: medicamentos, doctor, fecha, estado (vigente/vencida)
- [ ] Indicador visual de recetas vencidas (color rojo)
- [ ] Ordenamiento por fecha (más reciente primero)
- [ ] Pull-to-refresh para actualizar
- [ ] Loading spinner mientras se cargan datos
- [ ] Mensaje si no hay recetas

**Prioridad:** Alta  
**Módulo:** Móvil

---

### TAREA MOV-2.1.2
**Título:** Consultar detalle de receta y dosis

**Descripción:**
Vista expandida de una receta mostrando todos los detalles: medicamentos, dosis, instrucciones, doctor, hospital, datos de contacto.

**Criterios de Aceptación:**
- [ ] Tap en receta abre detalle completo
- [ ] Información: medicamento(s), cantidad, instrucciones, doctor, hospital, teléfono
- [ ] Botón "Usar Receta" que lleva a selector de máquinas
- [ ] Opción compartir receta (SMS/email)
- [ ] Botón atrás o gesto de deslizar atrás
- [ ] Scroll si contenido es largo
- [ ] Información legible (fuentes grandes, contraste)

**Prioridad:** Alta  
**Módulo:** Móvil

---

### TAREA MOV-2.1.3
**Título:** Recepción de notificaciones push

**Descripción:**
Sistema que envía notificaciones push al cliente cuando doctor crea nueva receta o máquina dispensa medicamento.

**Criterios de Aceptación:**
- [ ] Configuración de permisos de notificación en primer inicio
- [ ] Backend integrado con servicio de push (FCM o similar)
- [ ] Notificación al crear receta: "Nueva receta creada por Dr. X"
- [ ] Notificación al dispensar: "Medicamento dispensado. Úsalo en máquina Y"
- [ ] App abierta al tap en notificación
- [ ] Centro de notificaciones (historial)
- [ ] Opción de mutearse/desactivar

**Prioridad:** Media  
**Módulo:** Móvil

---

## Submódulo 2.2: Localización de Máquinas

### TAREA MOV-2.2.1
**Título:** Listado y mapa de máquinas disponibles

**Descripción:**
Vista de todas las máquinas expendedoras con ubicación, estado (activa/inactiva) y distancia desde ubicación actual del cliente.

**Criterios de Aceptación:**
- [ ] Integración con API GET `/api/v0/maquina`
- [ ] Listado con tarjetas: ubicación, estado, distancia estimada
- [ ] Mapa interactivo con markers de máquinas
- [ ] Solicitar permisos de geolocalización (con fallback)
- [ ] Filtro por estado (activa/inactiva)
- [ ] Tap en máquina muestra dirección completa y opciones
- [ ] Actualizar ubicación manual o automático cada 30s
- [ ] Indicador visual de máquinas cercanas (< 1 km)

**Prioridad:** Alta  
**Módulo:** Móvil

---

### TAREA MOV-2.2.2
**Título:** Indicaciones y ruta a máquina

**Descripción:**
Integración con maps (Google Maps / Apple Maps) para mostrar ruta desde ubicación actual del cliente a máquina seleccionada.

**Criterios de Aceptación:**
- [ ] Tap en "Ir a máquina" abre maps con ruta
- [ ] Selección de medio: a pie, auto, transporte
- [ ] Estimación de tiempo y distancia
- [ ] Opción de compartir ubicación de máquina
- [ ] Retorno a app tras inicio de navegación
- [ ] Fallback: mostrar dirección si maps no disponible
- [ ] Funciona offline (mostrar dirección al menos)

**Prioridad:** Media  
**Módulo:** Móvil

---

## Submódulo 2.3: Perfil y Sesiones

### TAREA MOV-2.3.1
**Título:** Ver y editar perfil de cliente

**Descripción:**
Pantalla de perfil que muestra datos personales del cliente y permite actualización de información de contacto.

**Criterios de Aceptación:**
- [ ] Datos mostrados: nombre, apellido, cédula, correo, teléfono, sexo, estado verificado
- [ ] Edición de: teléfono, correo, dirección
- [ ] Validación de datos antes de guardar
- [ ] Integración con API PUT `/api/v0/cliente/:id`
- [ ] Mensaje de confirmación de cambios
- [ ] Foto de perfil (opcional)
- [ ] Botón para cambiar contraseña (si aplica)

**Prioridad:** Media  
**Módulo:** Móvil

---

### TAREA MOV-2.3.2
**Título:** Gestión de sesiones (logout, renovar token)

**Descripción:**
Manejo de autenticación y sesión: renovación automática de token, logout manual y manejo de sesión expirada.

**Criterios de Aceptación:**
- [ ] Token se renueva automáticamente antes de vencer
- [ ] Integración con API POST `/api/v0/session/refresh`
- [ ] Botón Logout limpia token y sesión local
- [ ] Si token vence, mostrar pantalla de login nuevamente
- [ ] Indicador de estado de sesión (conectado/desconectado)
- [ ] Opción "Cerrar todas las sesiones" (logout de otros dispositivos)
- [ ] Almacenamiento seguro de token (no localStorage)

**Prioridad:** Alta  
**Módulo:** Móvil

---

# MÓDULO 3: BACK-END (API REST)

## Submódulo 3.1: Autenticación y Seguridad

### TAREA BACK-3.1.1
**Título:** Registro e inicio de sesión

**Descripción:**
Endpoints de autenticación para registro de nuevas cuentas y login. Validar credenciales, hashear contraseñas y generar JWT.

**Criterios de Aceptación:**
- [ ] Endpoint POST `/api/v0/auth/signup` con validación de datos
- [ ] Endpoint POST `/api/v0/auth/login` con credenciales
- [ ] Hash de contraseña con bcrypt
- [ ] Generación de JWT con datos de usuario
- [ ] Validación de email único (si es campo único)
- [ ] Manejo de errores: email duplicado, contraseña débil, usuario no existe
- [ ] Respuesta incluye token y datos de usuario básicos
- [ ] Tests unitarios de seguridad de contraseña

**Prioridad:** Alta  
**Módulo:** Backend

---

### TAREA BACK-3.1.2
**Título:** Renovación de token (refresh)

**Descripción:**
Endpoint para renovar JWT cuando el actual está próximo a vencer, sin requerir credenciales nuevamente.

**Criterios de Aceptación:**
- [ ] Endpoint POST `/api/v0/session/refresh` o GET (según diseño)
- [ ] Validar que refresh token sea válido
- [ ] Generar nuevo JWT con tiempo de expiración extendido
- [ ] Manejo de refresh token expirado (devolver 401)
- [ ] Rotación de refresh tokens (opcional pero recomendado)
- [ ] Tests de expiración y renovación

**Prioridad:** Alta  
**Módulo:** Backend

---

### TAREA BACK-3.1.3
**Título:** Middlewares de autorización y validación

**Descripción:**
Implementar middlewares que validen JWT en peticiones, verifiquen roles y protejan endpoints según permisos.

**Criterios de Aceptación:**
- [ ] Middleware `requireSupabaseAuth` (ya existe) verificando JWT
- [ ] Middleware de roles (admin, doctor, paciente)
- [ ] Validación de parámetros en rutas (ej: ID pertenece al usuario)
- [ ] Middleware de validación de datos (req.body contra schemas)
- [ ] Respuestas estándar: 401 Unauthorized, 403 Forbidden, 400 Bad Request
- [ ] Logging de accesos rechazados
- [ ] Protección CSRF (si aplica)

**Prioridad:** Alta  
**Módulo:** Backend

---

## Submódulo 3.2: Gestión de Entidades

### TAREA BACK-3.2.1
**Título:** CRUD Clientes (completo)

**Descripción:**
Implementar operaciones Create, Read, Update, Delete para la entidad Cliente con validaciones y permisos.

**Criterios de Aceptación:**
- [ ] POST `/api/v0/cliente` - Crear cliente (admin o doctor)
- [ ] GET `/api/v0/cliente/:id` - Obtener cliente por ID
- [ ] GET `/api/v0/cliente/cedula/:cedula` - Obtener por cédula
- [ ] PUT `/api/v0/cliente/:id` - Actualizar cliente
- [ ] DELETE `/api/v0/cliente/:id` - Eliminar cliente (soft delete recomendado)
- [ ] Validación: cédula única, correo válido
- [ ] Permisos: solo admin, doctor o el mismo cliente pueden acceder
- [ ] Tests de cada operación

**Prioridad:** Alta  
**Módulo:** Backend

---

### TAREA BACK-3.2.2
**Título:** CRUD Usuarios (completo)

**Descripción:**
Operaciones CRUD para usuarios (doctores, admin, farmacéuticos) incluyendo roles, especialidades y datos profesionales.

**Criterios de Aceptación:**
- [ ] POST `/api/v0/usuario` - Crear usuario (admin)
- [ ] GET `/api/v0/usuario/:id` - Obtener usuario
- [ ] GET `/api/v0/usuario` - Listar usuarios (con paginación)
- [ ] PUT `/api/v0/usuario/:id` - Actualizar usuario
- [ ] DELETE `/api/v0/usuario/:id` - Desactivar usuario
- [ ] Validación: RUC único (para doctores), rol válido
- [ ] Manejo de roles y especialidades
- [ ] Permisos: solo admin puede crear/eliminar
- [ ] Tests completos

**Prioridad:** Alta  
**Módulo:** Backend

---

### TAREA BACK-3.2.3
**Título:** CRUD Recetas y Dosis (completo)

**Descripción:**
Operaciones CRUD para recetas incluyendo manejo de dosis asociadas, validación de doctor/hospital y relaciones.

**Criterios de Aceptación:**
- [ ] POST `/api/v0/receta` - Crear receta con dosis
- [ ] GET `/api/v0/receta/:id` - Obtener receta
- [ ] GET `/api/v0/receta/cedula/:cedula` - Obtener recetas por cédula paciente
- [ ] PUT `/api/v0/receta/:id` - Actualizar receta
- [ ] DELETE `/api/v0/receta/:id` - Eliminar receta
- [ ] POST `/api/v0/dosis` - Crear dosis
- [ ] PUT `/api/v0/dosis/:id` - Actualizar dosis
- [ ] DELETE `/api/v0/dosis/:id` - Eliminar dosis
- [ ] Validación: doctor existe, paciente existe, dosis válidas
- [ ] Manejo de transacciones (crear receta + dosis)
- [ ] Tests incluyendo casos de error

**Prioridad:** Alta  
**Módulo:** Backend

---

### TAREA BACK-3.2.4
**Título:** CRUD Inventario y Máquinas (completo)

**Descripción:**
Operaciones CRUD para máquinas expendedoras e inventario de medicamentos asociado, incluyendo ubicación y estado.

**Criterios de Aceptación:**
- [ ] POST `/api/v0/maquina` - Crear máquina
- [ ] GET `/api/v0/maquina` - Listar máquinas (con ubicación)
- [ ] GET `/api/v0/maquina/:id` - Obtener máquina
- [ ] PUT `/api/v0/maquina/:id` - Actualizar ubicación/estado
- [ ] DELETE `/api/v0/maquina/:id` - Desactivar máquina
- [ ] POST `/api/v0/inventario` - Asignar medicamento a máquina
- [ ] GET `/api/v0/inventario` - Listar stock
- [ ] PUT `/api/v0/inventario/:id` - Actualizar cantidad
- [ ] Validación: ubicación válida, cantidad positiva
- [ ] Relación correcta Maquina ↔ Inventario
- [ ] Tests completos

**Prioridad:** Alta  
**Módulo:** Backend

---

## Submódulo 3.3: Integración con Máquina

### TAREA BACK-3.3.1
**Título:** Endpoint de validación de receta

**Descripción:**
Endpoint que valida si una receta existe, es válida y está disponible para dispensación. Máquina lo llama antes de dispensar.

**Criterios de Aceptación:**
- [ ] Endpoint POST `/api/v0/maquina/validar-receta`
- [ ] Parámetros: código_receta o id_receta
- [ ] Respuesta: { válida: bool, cliente: {...}, medicamentos: [...], mensaje: string }
- [ ] Validaciones: receta existe, no expirada, no ya dispensada, cliente existe
- [ ] Respuesta 200 si válida, 404 si no existe, 400 si expirada
- [ ] Logging de intentos de validación (auditoría)
- [ ] Tests de casos: válida, expirada, no existe, cliente bloqueado

**Prioridad:** Alta  
**Módulo:** Backend

---

### TAREA BACK-3.3.2
**Título:** Endpoint de solicitud de dispensación

**Descripción:**
Endpoint que registra la dispensación de medicamento. Máquina lo llama tras dispensar físicamente.

**Criterios de Aceptación:**
- [ ] Endpoint POST `/api/v0/maquina/dispensar`
- [ ] Parámetros: id_receta, id_medicamento, id_maquina
- [ ] Registro en base de datos: fecha/hora, maquina, cliente, medicamento
- [ ] Descuento de inventario (cantidad -= 1)
- [ ] Respuesta: { éxito: bool, mensaje: string }
- [ ] Validaciones: receta válida, medicamento existe en máquina, inventario disponible
- [ ] Manejo de errores: out of stock, receta no válida
- [ ] Tests y validación de integridad

**Prioridad:** Alta  
**Módulo:** Backend

---

### TAREA BACK-3.3.3
**Título:** Confirmación/ack de entrega (webhook o cola)

**Descripción:**
Mecanismo para confirmar entrega exitosa de medicamento o notificar al backend ante fallos. Puede ser webhook desde máquina o cola de mensajes.

**Criterios de Aceptación:**
- [ ] Endpoint POST `/api/v0/maquina/confirmar-entrega` o POST `/api/v0/maquina/fallo-dispensacion`
- [ ] Parámetros: id_receta, id_dispensacion, timestamp, estado (éxito/fallo)
- [ ] Cambio de estado de receta: dispensada, fallida, etc.
- [ ] Notificación a cliente (push o evento)
- [ ] Logging completo de transacciones
- [ ] Reintentos automáticos si fallo temporal
- [ ] Tests de confirmación y notificación

**Prioridad:** Media  
**Módulo:** Backend

---

## Submódulo 3.4: Auditoría y Reportes

### TAREA BACK-3.4.1
**Título:** Logs de acceso y dispensación

**Descripción:**
Sistema de logging que registra todos los accesos de usuarios, intentos de acceso fallidos y cada dispensación de medicamento.

**Criterios de Aceptación:**
- [ ] Tabla/colección de logs: usuario, acción, timestamp, resultado, IP (si aplica)
- [ ] Registro automático en cada endpoint importante
- [ ] Logs incluyen: login, logout, crear receta, dispensar, editar cliente
- [ ] Logs almacenados en base de datos o archivo (configurable)
- [ ] Protección de logs (solo admin puede ver)
- [ ] Rotación de logs antiguos (retención: 90 días)
- [ ] Exportación de logs para auditoría

**Prioridad:** Media  
**Módulo:** Backend

---

### TAREA BACK-3.4.2
**Título:** Endpoints para exportar reportes

**Descripción:**
Endpoints que generan reportes en CSV o PDF: dispensaciones por período, medicamentos más usados, actividad por máquina, ingresos.

**Criterios de Aceptación:**
- [ ] Endpoint GET `/api/v0/reportes/dispensaciones` - CSV de dispensaciones en rango de fechas
- [ ] Endpoint GET `/api/v0/reportes/medicamentos` - Top medicamentos dispensados
- [ ] Endpoint GET `/api/v0/reportes/maquinas` - Actividad por máquina
- [ ] Endpoint GET `/api/v0/reportes/clientes` - Clientes más activos
- [ ] Filtros: fecha_inicio, fecha_fin, maquina_id, medicamento_id
- [ ] Formatos: CSV, PDF (librería como pdfkit o similar)
- [ ] Permisos: solo admin
- [ ] Tests de generación de reportes

**Prioridad:** Baja  
**Módulo:** Backend

---

# MÓDULO 4: MÁQUINA (Hardware / Panel de Máquina)

## Submódulo 4.1: Controlador de Dispensación

### TAREA MAQ-4.1.1
**Título:** Lectura de receta (QR/código)

**Descripción:**
Implementar captura de código QR o escaneo de código de receta mediante cámara de máquina o entrada manual.

**Criterios de Aceptación:**
- [ ] Interfaz de escaneo QR con visual feedback
- [ ] Decodificación de QR para obtener id_receta o código_receta
- [ ] Opción de entrada manual si QR falla (teclado numérico)
- [ ] Validación de formato de código antes de enviar a API
- [ ] Manejo de errores: QR inválido, cámara no disponible
- [ ] Sonido/vibración al escaneo exitoso
- [ ] Timeout: reintentar si usuario no escanea tras 30s

**Prioridad:** Alta  
**Módulo:** Máquina

---

### TAREA MAQ-4.1.2
**Título:** Validación de receta contra API

**Descripción:**
Comunicación con backend para validar si receta existe, es válida y paciente puede dispensar. Mostrar medicamentos disponibles.

**Criterios de Aceptación:**
- [ ] Llamada a POST `/api/v0/maquina/validar-receta`
- [ ] Espera respuesta: medicamentos, dosis, instrucciones
- [ ] Muestra medicamentos disponibles en máquina
- [ ] Manejo de errores: receta no existe, expirada, cliente no verificado
- [ ] Reintentos automáticos si conexión falla
- [ ] Timeout: si backend no responde en 5s, opción de reintentar
- [ ] Almacenamiento temporal de validación (cache 10 min)

**Prioridad:** Alta  
**Módulo:** Máquina

---

### TAREA MAQ-4.1.3
**Título:** Dispensar medicamento (mecanismo)

**Descripción:**
Activar mecanismo físico (motores, servos, dispensadores) para liberar medicamento correspondiente de forma segura.

**Criterios de Aceptación:**
- [ ] Control de GPIO/PWM para motores o actuadores
- [ ] Selección de medicamento a dispensar (por posición en máquina)
- [ ] Mecanismo activa de forma controlada (evitar jamming)
- [ ] Sensor de dispensación: verificar que medicamento fue entregado
- [ ] Timeout: si medicamento no cae en 10s, error
- [ ] Retry automático (1 reintento) si falla
- [ ] Sonido/luz de éxito o error
- [ ] Logs del estado de dispensación

**Prioridad:** Alta  
**Módulo:** Máquina

---

### TAREA MAQ-4.1.4
**Título:** Confirmar entrega y notificar al backend

**Descripción:**
Tras dispensación exitosa, comunicar al backend para registrar la transacción y actualizar estado de receta y cliente.

**Criterios de Aceptación:**
- [ ] Llamada POST `/api/v0/maquina/dispensar` con datos de dispensación
- [ ] Datos: id_receta, id_medicamento, id_maquina, timestamp
- [ ] Espera confirmación del backend
- [ ] Si éxito: mensaje "Medicamento dispensado" en pantalla
- [ ] Si fallo backend: almacenar en queue local para reintentar
- [ ] Reintentos automáticos cada 30s si conexión perdida
- [ ] Notificación a cliente (push) tras confirmación
- [ ] Tests de confirmación y manejo de fallos

**Prioridad:** Alta  
**Módulo:** Máquina

---

## Submódulo 4.2: Gestión de Inventario Local

### TAREA MAQ-4.2.1
**Título:** Sincronizar stock con API

**Descripción:**
Comunicación regular con backend para mantener inventario local sincronizado. Obtener cantidades de medicamentos disponibles.

**Criterios de Aceptación:**
- [ ] Sincronización al inicio de máquina (bootup)
- [ ] Sincronización cada hora (o configurable)
- [ ] Llamada GET `/api/v0/inventario` con id_maquina
- [ ] Actualización local de cantidades
- [ ] Manejo de desconexiones: si falla, usar último stock conocido
- [ ] Detectar cambios significativos (stock aumentó/disminuyó inesperadamente)
- [ ] Logging de sincronizaciones
- [ ] Opción manual: botón "Actualizar inventario"

**Prioridad:** Alta  
**Módulo:** Máquina

---

### TAREA MAQ-4.2.2
**Título:** Alertas de stock bajo

**Descripción:**
Sistema que alerta a operador y backend cuando stock de medicamento cae bajo threshold (ej: < 5 unidades).

**Criterios de Aceptación:**
- [ ] Threshold configurable por medicamento (default: 5)
- [ ] Alerta visual: pantalla muestra medicamentos con stock bajo (color rojo)
- [ ] Alerta sonora: timbre/buzzer cuando stock crítico
- [ ] Notificación al backend: POST `/api/v0/maquina/alerta-stock-bajo`
- [ ] Historial de alertas para mantenimiento
- [ ] Opción de marcar como "revisado" temporalmente (snooze 24h)
- [ ] Tests de lógica de alertas

**Prioridad:** Media  
**Módulo:** Máquina

---

## Submódulo 4.3: Monitorización y Mantenimiento

### TAREA MAQ-4.3.1
**Título:** Estado de sensores, conectividad y energía

**Descripción:**
Dashboard de estado que muestra salud de máquina: conexión a internet, batería/energía, temperatura, sensores funcionando.

**Criterios de Aceptación:**
- [ ] Estado de conexión (WiFi/LTE): conectado/desconectado + señal
- [ ] Estado de alimentación: AC/batería + porcentaje carga
- [ ] Temperatura interna (si sensor disponible): normal/alerta
- [ ] Estado de sensores: cámara, dispensadores, lector QR
- [ ] Pantalla de diagnóstico accesible solo a técnicos (con PIN)
- [ ] Logging de fallos de sensores
- [ ] Alerta al backend si estado crítico (sin energía, sin conexión)
- [ ] Tests de simulación de fallos

**Prioridad:** Media  
**Módulo:** Máquina

---

### TAREA MAQ-4.3.2
**Título:** Actualizaciones OTA y diagnósticos

**Descripción:**
Sistema para descargar e instalar actualizaciones de firmware remotamente sin intervención física.

**Criterios de Aceptación:**
- [ ] Endpoint de backend que indica si hay actualización disponible
- [ ] Descarga de archivo .bin (firmware) en horario off-peak
- [ ] Verificación de integridad (checksum/hash)
- [ ] Instalación sin perder datos locales (non-volatile storage)
- [ ] Rollback automático si falla arranque tras update
- [ ] Logging de actualizaciones (versión anterior/nueva, fecha)
- [ ] Opción de diagnóstico remoto (ejecución de tests)
- [ ] Tests de actualización y rollback

**Prioridad:** Baja  
**Módulo:** Máquina

---

## Submódulo 4.4: Interfaz de Operador

### TAREA MAQ-4.4.1
**Título:** Panel local para técnicos (recarga, pruebas)

**Descripción:**
Interface física de máquina que permite a técnicos recargar medicamentos, hacer pruebas y acceder a funciones de mantenimiento.

**Criterios de Aceptación:**
- [ ] Acceso con PIN de técnico (almacenado localmente, hash)
- [ ] Menú: Recarga Medicamentos, Prueba Dispensador, Ver Logs, Sincronizar, Reiniciar
- [ ] Función "Recarga": pantalla con posiciones de medicamentos, entrada de cantidad
- [ ] Función "Prueba": dispensar unidad de prueba sin validar receta
- [ ] Función "Ver Logs": últimas 50 transacciones en pantalla
- [ ] Función "Sincronizar": forzar actualización de inventario
- [ ] Función "Reiniciar": reinicio limpio de sistema
- [ ] Confirmación de acciones críticas
- [ ] Logout automático tras 15 min inactividad

**Prioridad:** Media  
**Módulo:** Máquina

---

### TAREA MAQ-4.4.2
**Título:** Registro de intervenciones y mantenimiento

**Descripción:**
Historial de todas las intervenciones de técnicos: recargas, cambios de piezas, reparaciones, con timestamp y técnico responsable.

**Criterios de Aceptación:**
- [ ] Registro local en almacenamiento no volátil: fecha, tipo intervención, técnico, detalles
- [ ] Sincronización con backend cada vez que máquina se conecta
- [ ] Backend almacena historial por máquina (auditoría)
- [ ] Endpoint GET `/api/v0/maquina/:id/historial-mantenimiento`
- [ ] Tipos de intervención: recarga, cambio piezas, limpieza, diagnóstico, reset
- [ ] Búsqueda por período en backend
- [ ] Reporte de máquinas que necesitan mantenimiento (sin intervención > 3 meses)
- [ ] Tests de registro y sincronización

**Prioridad:** Baja  
**Módulo:** Máquina

---

## RESUMEN DE PRIORIDADES

### Tareas de Alta Prioridad (MVP - Fase 1)
- WEB-1.1.1 a WEB-1.1.3 (Recetas)
- WEB-1.2.1 a WEB-1.2.2 (Clientes)
- WEB-1.4.1 a WEB-1.4.2 (Autenticación)
- MOV-2.1.1 a MOV-2.1.2 (Recetas)
- MOV-2.2.1 (Máquinas)
- MOV-2.3.2 (Sesiones)
- BACK-3.1.1 a BACK-3.1.3 (Autenticación)
- BACK-3.2.1 a BACK-3.2.4 (CRUD)
- BACK-3.3.1 a BACK-3.3.2 (Máquina)
- MAQ-4.1.1 a MAQ-4.1.4 (Dispensación)
- MAQ-4.2.1 (Sync inventario)

### Tareas de Media Prioridad (Fase 2)
- WEB-1.1.4, WEB-1.3.1 a WEB-1.3.2 (Admin)
- MOV-2.1.3, MOV-2.2.2, MOV-2.3.1 (Notificaciones, Mapa, Perfil)
- BACK-3.3.3 (Confirmación)
- BACK-3.4.1 (Logs)
- MAQ-4.2.2, MAQ-4.3.1, MAQ-4.4.1 (Monitoreo, Panel)

### Tareas de Baja Prioridad (Fase 3/4)
- WEB-1.3.3 (Reportes)
- BACK-3.4.2 (Exportar Reportes)
- MAQ-4.3.2, MAQ-4.4.2 (OTA, Mantenimiento)

---

## MATRIZ DE DEPENDENCIAS

```
Backend (Fase 1) → Web (Fase 2) → Móvil (Fase 2)
       ↓
    Máquina (Fase 1 en paralelo con Backend)
```

- Las tareas Backend de CRUD deben completarse antes de Web y Móvil
- Las tareas de validación en Backend necesarios para Máquina
- Máquina puede desarrollarse en paralelo con Backend
- Frontend puede comenzar cuando Backend alcanza MVP

---

**Generado:** Mayo 2, 2026  
**Versión:** 1.0
