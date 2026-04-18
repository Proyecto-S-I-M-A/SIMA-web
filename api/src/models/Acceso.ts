import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Acceso extends Model {
    declare id: number;
    declare usuario: string;
    declare token: string;
    declare refresh: string;
}

Acceso.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    usuario: DataTypes.STRING(50),
    correo: DataTypes.STRING(50),
    tipo: DataTypes.STRING(20),
    id_acceso: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    ultimo_acceso: DataTypes.DATE,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Acceso',
    tableName: 'accesos',
    schema: 'public',
    timestamps: true,
    underscored: false,
  },
);

export default Acceso;
