import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Maquina extends Model {
  declare id: number;
  declare id_maquina: string;
  declare ubicacion: string;
  declare activo: boolean;
  declare latitud: number;
  declare longitud: number;
}

Maquina.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_maquina: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    ubicacion: DataTypes.STRING(50),
    activo: DataTypes.BOOLEAN,
    latitud: DataTypes.FLOAT,
    longitud: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "Maquina",
    tableName: "maquinas",
    schema: "public",
    timestamps: true,
    underscored: false,
  },
);
export default Maquina;
