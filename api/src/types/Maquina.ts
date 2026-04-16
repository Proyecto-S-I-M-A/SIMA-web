export interface MaquinaAttributes {
  id: number;
  ubicacion: string | null;
  activo: boolean | null;
  latitud: number | null;
  longitud: number | null;
}

export interface MaquinaCreationAttributes {
  id?: number;
  ubicacion?: string | null;
  activo?: boolean | null;
  latitud?: number | null;
  longitud?: number | null;
}

export type MaquinaUpdateAttributes = Partial<Omit<MaquinaAttributes, "id">>;