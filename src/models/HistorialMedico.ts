import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class HistorialMedico extends Model {
  declare id: number;
  declare fecha_consulta: Date
  declare motivo_consulta: string
  declare diagnostico: string
  declare tratamiento: string
  declare observaciones: string
  declare presion_arterial: string
  declare temperatura: number
  declare peso: number
  declare altura: number
  declare frecuencia_cardiaca: number
  declare medico: string
  declare fecha_registro: Date
}

HistorialMedico.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_consulta: DataTypes.DATE,
    motivo_consulta: DataTypes.STRING(255),
    diagnostico: DataTypes.STRING(500),
    tratamiento: DataTypes.STRING(500),
    observaciones: DataTypes.STRING(500),
    presion_arterial: DataTypes.STRING(20),
    temperatura: DataTypes.DECIMAL,
    peso: DataTypes.DECIMAL,
    altura: DataTypes.DECIMAL,
    frecuencia_cardiaca: DataTypes.INTEGER,
    medico: DataTypes.STRING(150),
    fecha_registro: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "HistorialMedico",
    tableName: "historiales_medicos",
    schema: "public",
    timestamps: true,
    underscored: false,
  },
);
export default HistorialMedico;
