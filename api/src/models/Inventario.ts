import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Inventario extends Model {
  declare id: number;
  declare nombre_medicamento: string;
  declare marca: string;
  declare precio: number;
  declare resetado: boolean;
}

Inventario.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_medicamento: DataTypes.STRING(40),
    marca: DataTypes.STRING(40),
    precio: DataTypes.DECIMAL,
    resetado: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "Inventario",
    tableName: "inventario",
    schema: "public",
    timestamps: true,
    underscored: false,
  },
);
export default Inventario;
