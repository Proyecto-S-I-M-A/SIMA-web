import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class FichaMedica extends Model {
  declare id: number;
  declare tipo_sanguineo: string
  declare alergenos: string
  declare enfermedad_cronica: string
}

FichaMedica.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_sanguineo: DataTypes.STRING(10),
    alergenos: DataTypes.STRING(40),
    enfermedad_cronica: DataTypes.STRING(40),
  },
  {
    sequelize,
    modelName: "FichaMedica",
    tableName: "fichas_medicas",
    schema: "public",
    timestamps: true,
    underscored: false,
  },
);
export default FichaMedica;
