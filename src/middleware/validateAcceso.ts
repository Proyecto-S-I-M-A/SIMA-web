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

  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('tipo')
    .trim()
    .notEmpty()
    .withMessage('El tipo es requerido')
    .isLength({ min: 2, max: 20 })
    .withMessage('El tipo debe tener entre 2 y 20 caracteres'),

  body('activo')
    .optional()
    .isBoolean()
    .withMessage('Activo debe ser un booleano'),
];

// Middleware para manejar errores de validación
export const handleValidationErrors = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  next();
};
