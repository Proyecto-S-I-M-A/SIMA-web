export interface HistorialMedicoAttributes {
  id: number;
  id_cliente: number;
  fecha_consulta: Date | null;
  motivo_consulta: string | null;
  diagnostico: string | null;
  tratamiento: string | null;
  observaciones: string | null;
  presion_arterial: string | null;
  temperatura: number | null;
  peso: number | null;
  altura: number | null;
  frecuencia_cardiaca: number | null;
  medico: string | null;
  fecha_registro: Date | null;
}

export interface HistorialMedicoCreationAttributes {
  id?: number;
  id_cliente: number;
  fecha_consulta?: Date | null;
  motivo_consulta?: string | null;
  diagnostico?: string | null;
  tratamiento?: string | null;
  observaciones?: string | null;
  presion_arterial?: string | null;
  temperatura?: number | null;
  peso?: number | null;
  altura?: number | null;
  frecuencia_cardiaca?: number | null;
  medico?: string | null;
  fecha_registro?: Date | null;
}

export type HistorialMedicoUpdateAttributes = Partial<
  Omit<HistorialMedicoAttributes, "id">
>;