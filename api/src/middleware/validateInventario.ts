import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateInventarioCreation = [
  body('id_maquina')
    .notEmpty()
    .withMessage('El ID de la máquina es requerido')
    .isInt()
    .withMessage('El ID de la máquina debe ser un número'),

  body('nombre_medicamento')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 40 })
    .withMessage('El nombre del medicamento no puede exceder 40 caracteres'),

  body('marca')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 40 })
    .withMessage('La marca no puede exceder 40 caracteres'),

  body('precio')
    .optional({ checkFalsy: true })
    .isDecimal()
    .withMessage('El precio debe ser un número decimal'),

  body('cantidad')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('La cantidad debe ser un número entero'),

  body('resetado')
    .optional()
    .isBoolean()
    .withMessage('Resetado debe ser un booleano'),
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
