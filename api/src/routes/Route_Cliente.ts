import {CREATE, READ, UPDATE, DELETE} from "../controllers/CRUD_Cliente.js";
import { validateClienteCreation, handleValidationErrors } from "../middleware/validateCliente.js";
import { Router } from "express";

const router = Router();

router.post("/clientes", validateClienteCreation, handleValidationErrors, CREATE);
router.put("/clientes/:id", handleValidationErrors, UPDATE);
router.get("/clientes/:id", READ);
router.delete("/clientes/:id", DELETE);

export default router;