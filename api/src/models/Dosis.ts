import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Dosis extends Model {
  declare id: number;
  declare id_receta: number | null;
  declare id_medicamento: number | null;
  declare cantidad: number | null;
  declare instrucciones: string | null;
}

Dosis.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_receta: DataTypes.BIGINT,
    id_medicamento: DataTypes.BIGINT,
    cantidad: DataTypes.INTEGER,
    instrucciones: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Dosis",
    tableName: "dosis",
    schema: "public",
    timestamps: true,
    underscored: false,
  },
);
export default Dosis;