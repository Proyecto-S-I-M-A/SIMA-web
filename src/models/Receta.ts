import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Receta extends Model {
  declare id: number;
  declare doctor_remitente: string
  declare ruc_doctor_remitente: string;
  declare hospital_remitente: string
  declare telefono_hospital: string;
  declare correo: string
  declare codigo: number;
  declare fecha: Date;
}

Receta.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    doctor_remitente: DataTypes.STRING(20),
    ruc_doctor_remitente: DataTypes.STRING(50),
    hospital_remitente: DataTypes.STRING(20),
    telefono_hospital: DataTypes.STRING(20),
    correo: DataTypes.STRING(50),
    codigo: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Receta",
    tableName: "recetas",
    schema: "public",
    timestamps: true,
    underscored: false,
  },
);
export default Receta;
