import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Acceso extends Model {
    declare id: string;
    declare usuario: string;
    declare token: string;
    declare refresh: string;
}

Acceso.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      unique: true,
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    correo: DataTypes.STRING(50),
    tipo: DataTypes.STRING(20),
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
