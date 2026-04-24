import type { Row } from '../types';

// Cambia esta URL por la de tu backend
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

// Si tu API devuelve los campos con otro nombre, mapéalos aquí
function mapToRow(raw: Record<string, unknown>): Row {
  return {
    nombre:    raw.nombre    as string,
    apellido:  raw.apellido  as string,
    edad:      raw.edad      as number,
    motivo:    raw.motivo    as string,
    cedula:    raw.cedula    as string,
    correo:    raw.correo    as string,
    asegurado: raw.asegurado as boolean,
    sexo:      raw.sexo      as string,
  };
}

export const patientService = {
  /** Trae todos los pacientes */
  async getAll(): Promise<Row[]> {
    const res = await fetch(`${API_BASE_URL}/pacientes`, {
      headers: {
        'Content-Type': 'application/json',
        // Si tu API requiere token:
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data: Record<string, unknown>[] = await res.json();
    return data.map(mapToRow);
  },

  /** Trae un paciente por cédula (opcional, para futuro detalle) */
  async getById(cedula: string): Promise<Row> {
    const res = await fetch(`${API_BASE_URL}/pacientes/${cedula}`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data: Record<string, unknown> = await res.json();
    return mapToRow(data);
  },
};