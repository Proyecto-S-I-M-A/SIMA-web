import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Cliente extends Model {}

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
    password: {
      type: DataTypes.STRING(100),
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
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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