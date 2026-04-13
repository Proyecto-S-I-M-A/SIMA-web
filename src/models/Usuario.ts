import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Usuario extends Model {
  declare id: number;
  declare nombre: string | null;
  declare apellido: string | null;
  declare rol: string | null;
  declare password: string | null;
  declare usuario: string | null
  declare ruc_doctor: string | null;
  declare especialidades: string | null;
  declare activo: boolean;
}

Usuario.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: DataTypes.STRING(20),
    apellido: DataTypes.STRING(20),
    rol: DataTypes.STRING(20),
    password: DataTypes.STRING(100),
    usuario: DataTypes.STRING(20),
    ruc_doctor: DataTypes.TEXT,
    especialidades: DataTypes.STRING(20),
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
    schema: "public",
    timestamps: true,
    underscored: false,
  },
);
export default Usuario;
