import Cliente from "./Cliente.js";
import Usuario from "./Usuario.js";
import FichaMedica from "./FichaMedica.js";
import HistorialMedico from "./HistorialMedico.js";
import Receta from "./Receta.js";
import Dosis from "./Dosis.js";
import Inventario from "./Inventario.js";
import Maquina from "./Maquina.js";
import Acceso from "./Acceso.js";
import MaquinaInventario from "./MaquinaInventario.js";

/* Relaciones */

Acceso.hasOne(Cliente, { foreignKey: "id_acceso" });
Cliente.belongsTo(Acceso, { foreignKey: "id_acceso" });

Acceso.hasOne(Usuario, { foreignKey: "id_acceso" });
Usuario.belongsTo(Acceso, { foreignKey: "id_acceso" });

Cliente.hasOne(FichaMedica, { foreignKey: "id_cliente" });
FichaMedica.belongsTo(Cliente, { foreignKey: "id_cliente" });

Cliente.hasMany(HistorialMedico, { foreignKey: "id_cliente" });
HistorialMedico.belongsTo(Cliente, { foreignKey: "id_cliente" });

Cliente.hasMany(Receta, { foreignKey: "id_cliente" });
Receta.belongsTo(Cliente, { foreignKey: "id_cliente" });

Receta.hasMany(Dosis, { foreignKey: "id_receta" });
Dosis.belongsTo(Receta, { foreignKey: "id_receta" });

// Relación many-to-many entre Maquina e Inventario
Maquina.belongsToMany(Inventario, {
  through: MaquinaInventario,
  foreignKey: "id_maquina",
  otherKey: "id_inventario",
  as: "medicamentos",
});

Inventario.belongsToMany(Maquina, {
  through: MaquinaInventario,
  foreignKey: "id_inventario",
  otherKey: "id_maquina",
  as: "maquinas",
});

export {
  Cliente,
  Usuario,
  FichaMedica,
  HistorialMedico,
  Receta,
  Dosis,
  Inventario,
  Maquina,
  MaquinaInventario,
};
