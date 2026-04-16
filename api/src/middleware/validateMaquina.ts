import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateMaquinaCreation = [
  body('ubicacion')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('La ubicación no puede exceder 50 caracteres'),

  body('activo')
    .optional()
    .isBoolean()
    .withMessage('Activo debe ser un booleano'),

  body('latitud')
    .optional({ checkFalsy: true })
    .isFloat()
    .withMessage('La latitud debe ser un número decimal'),

  body('longitud')
    .optional({ checkFalsy: true })
    .isFloat()
    .withMessage('La longitud debe ser un número decimal'),
];

export const handleValidationErrors = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      error: 'Errores de validación',
      details: errors
        .array()
        .map((err) => ({
          field: err.type === 'field' ? err.path : 'unknown',
          message: err.msg,
        })),
    });
  }

  next();
};
