import { RecetaAttributes } from "./Receta.js";
import { DosisAttributes } from "./Dosis.js";
import { InventarioAttributes } from "./Inventario.js";

/**
 * Representa una dosis con información del inventario asociado
 */
export interface DosisConInventario extends DosisAttributes {
  inventario: InventarioAttributes | null;
}

/**
 * Representa una receta con todas sus dosis y medicamentos
 */
export interface RecetaConDosis extends RecetaAttributes {
  dosis: DosisConInventario[];
}

/**
 * Respuesta del endpoint GetRecetasYDosis
 * Array de recetas con sus dosis e inventario asociado
 */
export type RecetasYDosisResponse = RecetaConDosis[];
