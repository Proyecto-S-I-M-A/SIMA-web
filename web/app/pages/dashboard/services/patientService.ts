/**
 * Servicio de gestión de pacientes/clientes
 * 
 * Proporciona métodos para realizar operaciones CRUD sobre los registros de pacientes
 * en el servidor API. Todos los métodos incluyen autenticación mediante token JWT
 * almacenado en localStorage.
 * 
 * @module patientService
 */

/**
 * Mapea un objeto genérico a la estructura de tipo Row
 * 
 * @param raw - Objeto con datos sin procesar del servidor
 * @returns Objeto Row con tipos correctamente asignados y valores nulos donde corresponda
 * @private
 */

/**
 * Obtiene los encabezados HTTP con autenticación
 * 
 * Incluye el token JWT del localStorage en el header Authorization si existe.
 * 
 * @returns Objeto con headers estándar y token de autorización
 * @private
 */

/**
 * Obtiene todos los pacientes/clientes
 * 
 * @returns Promesa que resuelve en un array de pacientes
 * @throws {Error} Si la respuesta del servidor no es exitosa
 */

/**
 * Obtiene un paciente específico por su ID
 * 
 * @param id - Identificador numérico del paciente
 * @returns Promesa que resuelve en el objeto Row del paciente
 * @throws {Error} Si el paciente no existe o hay error en la respuesta
 */

/**
 * Crea un nuevo paciente
 * 
 * @param payload - Datos del nuevo paciente (sin id, createdAt ni updatedAt)
 * @returns Promesa que resuelve cuando el paciente se crea exitosamente
 * @throws {Error} Si hay error en la creación
 */

/**
 * Actualiza un paciente existente
 * 
 * @param id - Identificador del paciente a actualizar
 * @param payload - Objeto parcial con los campos a actualizar
 * @returns Promesa que resuelve cuando la actualización se completa exitosamente
 * @throws {Error} Si hay error en la actualización
 */

/**
 * Elimina un paciente
 * 
 * @param id - Identificador del paciente a eliminar
 * @returns Promesa que resuelve cuando la eliminación se completa exitosamente
 * @throws {Error} Si hay error en la eliminación
 */
import type { Row } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v0';

function mapToRow(raw: Record<string, unknown>): Row {
  return {
    id:         Number(raw.id),
    nombre:     raw.nombre    as string,
    apellido:   (raw.apellido as string)  ?? null,
    cedula:     (raw.cedula   as string)  ?? null,
    correo:     (raw.correo   as string)  ?? null,
    asegurado:  raw.asegurado as boolean,
    verificado: raw.verificado as boolean,
    sexo:       (raw.sexo     as string)  ?? null,
    id_acceso:  Number(raw.id_acceso),
    createdAt:  new Date(raw.createdAt as string),
    updatedAt:  new Date(raw.updatedAt as string),
  };
}

function getHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const patientService = {


  async getAll(): Promise<Row[]> {
    const res = await fetch(`${API_BASE_URL}/clientes/all`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data: Record<string, unknown>[] = await res.json();
    return data.map(mapToRow);
  },

  
  async getById(id: number): Promise<Row> {
    const res = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data: Record<string, unknown> = await res.json();
    return mapToRow(data);
  },

  async create(payload: Omit<Row, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  },

  async update(id: number, payload: Partial<Omit<Row, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  },

  async remove(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  },
};

