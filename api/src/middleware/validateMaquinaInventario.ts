import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateMaquinaInventarioCreation = [
  body('codigo_maquina')
    .notEmpty()
    .withMessage('El código de la máquina es requerido')
    .isString()
    .withMessage('El código de la máquina debe ser una cadena de texto'),
  body('id_maquina')
    .notEmpty()
    .withMessage('El ID de la máquina es requerido')
    .isInt()
    .withMessage('El ID de la máquina debe ser un número'),

  body('id_inventario')
    .notEmpty()
    .withMessage('El ID del inventario es requerido')
    .isInt()
    .withMessage('El ID del inventario debe ser un número'),

  body('cantidad')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('La cantidad debe ser un número entero'),
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
