import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

// Reglas de validación para crear un Acceso
export const validateAccesoCreation = [
  body('id')
    .trim()
    .notEmpty()
    .withMessage('El ID es requerido')
    .isUUID()
    .withMessage('El ID debe ser un UUID válido'),
  
  body('correo')
    .trim()
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('El correo debe ser un email válido'),
];

// Middleware para manejar errores de validación
export const handleValidationErrors = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  next();
};
