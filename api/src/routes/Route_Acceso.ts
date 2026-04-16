import { CREATE, READ, UPDATE, DELETE } from "../controllers/CRUD_Acceso.js";
import { validateAccesoCreation, handleValidationErrors } from "../middleware/validateAcceso.js";
import { Router } from "express";

const router = Router();

router.post("/accesos", validateAccesoCreation, handleValidationErrors, CREATE);
router.put("/accesos/:id", handleValidationErrors, UPDATE);
router.get("/accesos/:id", READ);
router.delete("/accesos/:id", DELETE);

export default router;
