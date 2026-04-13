import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";


class Acceso extends Model {
    declare id: number;
}

Acceso.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario: DataTypes.STRING(50),
        password: DataTypes.STRING(100),
        tipo: DataTypes.STRING(20),
        ultimo_acceso: DataTypes.DATE,
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, 
    {
        sequelize,
        modelName: "Acceso",
        tableName: "accesos",
        schema: "public",
        timestamps: true,
        underscored: false,
    }
)

export default Acceso;