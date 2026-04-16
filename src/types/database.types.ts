export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      accesos: {
        Row: {
          activo: boolean | null
          createdAt: string
          id: number
          password: string | null
          tipo: string | null
          ultimo_acceso: string | null
          updatedAt: string
          usuario: string | null
        }
        Insert: {
          activo?: boolean | null
          createdAt: string
          id?: number
          password?: string | null
          tipo?: string | null
          ultimo_acceso?: string | null
          updatedAt: string
          usuario?: string | null
        }
        Update: {
          activo?: boolean | null
          createdAt?: string
          id?: number
          password?: string | null
          tipo?: string | null
          ultimo_acceso?: string | null
          updatedAt?: string
          usuario?: string | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          AccesoId: number | null
          activo: boolean | null
          apellido: string | null
          asegurado: boolean | null
          cedula: string | null
          correo: string | null
          createdAt: string
          id: number
          id_acceso: number | null
          nombre: string
          password: string | null
          sexo: string | null
          updatedAt: string
          verificado: boolean | null
        }
        Insert: {
          AccesoId?: number | null
          activo?: boolean | null
          apellido?: string | null
          asegurado?: boolean | null
          cedula?: string | null
          correo?: string | null
          createdAt: string
          id?: number
          id_acceso?: number | null
          nombre: string
          password?: string | null
          sexo?: string | null
          updatedAt: string
          verificado?: boolean | null
        }
        Update: {
          AccesoId?: number | null
          activo?: boolean | null
          apellido?: string | null
          asegurado?: boolean | null
          cedula?: string | null
          correo?: string | null
          createdAt?: string
          id?: number
          id_acceso?: number | null
          nombre?: string
          password?: string | null
          sexo?: string | null
          updatedAt?: string
          verificado?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "clientes_AccesoId_fkey"
            columns: ["AccesoId"]
            isOneToOne: false
            referencedRelation: "accesos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_id_acceso_fkey"
            columns: ["id_acceso"]
            isOneToOne: false
            referencedRelation: "accesos"
            referencedColumns: ["id"]
          },
        ]
      }
      dosis: {
        Row: {
          cantidad: number | null
          createdAt: string
          id: number
          id_medicamento: number | null
          id_receta: number | null
          instrucciones: string | null
          RecetumId: number | null
          updatedAt: string
        }
        Insert: {
          cantidad?: number | null
          createdAt: string
          id?: number
          id_medicamento?: number | null
          id_receta?: number | null
          instrucciones?: string | null
          RecetumId?: number | null
          updatedAt: string
        }
        Update: {
          cantidad?: number | null
          createdAt?: string
          id?: number
          id_medicamento?: number | null
          id_receta?: number | null
          instrucciones?: string | null
          RecetumId?: number | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "dosis_id_receta_fkey"
            columns: ["id_receta"]
            isOneToOne: false
            referencedRelation: "recetas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dosis_RecetumId_fkey"
            columns: ["RecetumId"]
            isOneToOne: false
            referencedRelation: "recetas"
            referencedColumns: ["id"]
          },
        ]
      }
      fichas_medicas: {
        Row: {
          alergenos: string | null
          ClienteId: number | null
          createdAt: string
          enfermedad_cronica: string | null
          id: number
          id_cliente: number | null
          tipo_sanguineo: string | null
          updatedAt: string
        }
        Insert: {
          alergenos?: string | null
          ClienteId?: number | null
          createdAt: string
          enfermedad_cronica?: string | null
          id?: number
          id_cliente?: number | null
          tipo_sanguineo?: string | null
          updatedAt: string
        }
        Update: {
          alergenos?: string | null
          ClienteId?: number | null
          createdAt?: string
          enfermedad_cronica?: string | null
          id?: number
          id_cliente?: number | null
          tipo_sanguineo?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "fichas_medicas_ClienteId_fkey"
            columns: ["ClienteId"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fichas_medicas_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      historiales_medicos: {
        Row: {
          altura: number | null
          ClienteId: number | null
          createdAt: string
          diagnostico: string | null
          fecha_consulta: string | null
          fecha_registro: string | null
          frecuencia_cardiaca: number | null
          id: number
          id_cliente: number | null
          medico: string | null
          motivo_consulta: string | null
          observaciones: string | null
          peso: number | null
          presion_arterial: string | null
          temperatura: number | null
          tratamiento: string | null
          updatedAt: string
        }
        Insert: {
          altura?: number | null
          ClienteId?: number | null
          createdAt: string
          diagnostico?: string | null
          fecha_consulta?: string | null
          fecha_registro?: string | null
          frecuencia_cardiaca?: number | null
          id?: number
          id_cliente?: number | null
          medico?: string | null
          motivo_consulta?: string | null
          observaciones?: string | null
          peso?: number | null
          presion_arterial?: string | null
          temperatura?: number | null
          tratamiento?: string | null
          updatedAt: string
        }
        Update: {
          altura?: number | null
          ClienteId?: number | null
          createdAt?: string
          diagnostico?: string | null
          fecha_consulta?: string | null
          fecha_registro?: string | null
          frecuencia_cardiaca?: number | null
          id?: number
          id_cliente?: number | null
          medico?: string | null
          motivo_consulta?: string | null
          observaciones?: string | null
          peso?: number | null
          presion_arterial?: string | null
          temperatura?: number | null
          tratamiento?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "historiales_medicos_ClienteId_fkey"
            columns: ["ClienteId"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historiales_medicos_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      inventario: {
        Row: {
          cantidad: number | null
          createdAt: string
          id: number
          id_maquina: number | null
          MaquinaId: number | null
          marca: string | null
          nombre_medicamento: string | null
          precio: number | null
          resetado: boolean | null
          updatedAt: string
        }
        Insert: {
          cantidad?: number | null
          createdAt: string
          id?: number
          id_maquina?: number | null
          MaquinaId?: number | null
          marca?: string | null
          nombre_medicamento?: string | null
          precio?: number | null
          resetado?: boolean | null
          updatedAt: string
        }
        Update: {
          cantidad?: number | null
          createdAt?: string
          id?: number
          id_maquina?: number | null
          MaquinaId?: number | null
          marca?: string | null
          nombre_medicamento?: string | null
          precio?: number | null
          resetado?: boolean | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventario_id_maquina_fkey"
            columns: ["id_maquina"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventario_MaquinaId_fkey"
            columns: ["MaquinaId"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquinas: {
        Row: {
          activo: boolean | null
          createdAt: string
          id: number
          latitud: number | null
          longitud: number | null
          ubicacion: string | null
          updatedAt: string
        }
        Insert: {
          activo?: boolean | null
          createdAt: string
          id?: number
          latitud?: number | null
          longitud?: number | null
          ubicacion?: string | null
          updatedAt: string
        }
        Update: {
          activo?: boolean | null
          createdAt?: string
          id?: number
          latitud?: number | null
          longitud?: number | null
          ubicacion?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      recetas: {
        Row: {
          ClienteId: number | null
          codigo: number | null
          correo: string | null
          createdAt: string
          doctor_remitente: string | null
          fecha: string | null
          hospital_remitente: string | null
          id: number
          id_cliente: number | null
          ruc_doctor_remitente: string | null
          telefono_hospital: string | null
          updatedAt: string
        }
        Insert: {
          ClienteId?: number | null
          codigo?: number | null
          correo?: string | null
          createdAt: string
          doctor_remitente?: string | null
          fecha?: string | null
          hospital_remitente?: string | null
          id?: number
          id_cliente?: number | null
          ruc_doctor_remitente?: string | null
          telefono_hospital?: string | null
          updatedAt: string
        }
        Update: {
          ClienteId?: number | null
          codigo?: number | null
          correo?: string | null
          createdAt?: string
          doctor_remitente?: string | null
          fecha?: string | null
          hospital_remitente?: string | null
          id?: number
          id_cliente?: number | null
          ruc_doctor_remitente?: string | null
          telefono_hospital?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "recetas_ClienteId_fkey"
            columns: ["ClienteId"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recetas_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          AccesoId: number | null
          activo: boolean | null
          apellido: string | null
          createdAt: string
          especialidades: string | null
          id: number
          id_acceso: number | null
          nombre: string | null
          password: string | null
          rol: string | null
          ruc_doctor: string | null
          updatedAt: string
          usuario: string | null
        }
        Insert: {
          AccesoId?: number | null
          activo?: boolean | null
          apellido?: string | null
          createdAt: string
          especialidades?: string | null
          id?: number
          id_acceso?: number | null
          nombre?: string | null
          password?: string | null
          rol?: string | null
          ruc_doctor?: string | null
          updatedAt: string
          usuario?: string | null
        }
        Update: {
          AccesoId?: number | null
          activo?: boolean | null
          apellido?: string | null
          createdAt?: string
          especialidades?: string | null
          id?: number
          id_acceso?: number | null
          nombre?: string | null
          password?: string | null
          rol?: string | null
          ruc_doctor?: string | null
          updatedAt?: string
          usuario?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_AccesoId_fkey"
            columns: ["AccesoId"]
            isOneToOne: false
            referencedRelation: "accesos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_id_acceso_fkey"
            columns: ["id_acceso"]
            isOneToOne: false
            referencedRelation: "accesos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
