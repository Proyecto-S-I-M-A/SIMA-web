import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

// Reglas de validación para crear un Acceso
export const validateAccesoCreation = [
  body('usuario')
    .trim()
    .notEmpty()
    .withMessage('El usuario es requerido')
    .isLength({ min: 3, max: 50 })
    .withMessage('El usuario debe tener entre 3 y 50 caracteres'),

  body('correo')
    .trim()
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('El correo debe ser un email válido'),

  body('tipo')
    .trim()
    .notEmpty()
    .withMessage('El tipo es requerido')
    .isLength({ min: 2, max: 20 })
    .withMessage('El tipo debe tener entre 2 y 20 caracteres'),
];

// Middleware para manejar errores de validación
export const handleValidationErrors = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  next();
};
