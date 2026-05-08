import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class MaquinaInventario extends Model {
  declare id: number;
  declare id_maquina: number;
  declare id_inventario: number;
  declare cantidad: number;
}

MaquinaInventario.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_maquina: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "maquinas",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    id_inventario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "inventario",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MaquinaInventario",
    tableName: "maquina_inventario",
    schema: "public",
    timestamps: true,
    underscored: false,
  },
);

export default MaquinaInventario;
