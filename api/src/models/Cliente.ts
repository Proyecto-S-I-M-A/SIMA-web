import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Cliente extends Model {
  declare id: number;
  declare nombre: string;
  declare cedula: string;
  declare apellido: string;
  declare correo: string;
  declare asegurado: boolean;
  declare verificado: boolean;
  declare sexo: string;
  declare id_acceso: string;
}

Cliente.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(20),
    },
    cedula: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    correo: {
      type: DataTypes.STRING(50),
    },
    asegurado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sexo: {
      type: DataTypes.STRING(10),
    },
    id_acceso: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Cliente",
    tableName: "clientes",
    schema: "public",
    timestamps: true,
    underscored: false,
  },
);

export default Cliente;