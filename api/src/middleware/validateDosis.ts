import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateDosisCreation = [
  body('id_receta')
    .notEmpty()
    .withMessage('El ID de la receta es requerido')
    .isInt()
    .withMessage('El ID de la receta debe ser un número'),

  body('id_medicamento')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('El ID del medicamento debe ser un número'),

  body('cantidad')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('La cantidad debe ser un número entero'),

  body('instrucciones')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage('Las instrucciones no pueden exceder 500 caracteres'),
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
