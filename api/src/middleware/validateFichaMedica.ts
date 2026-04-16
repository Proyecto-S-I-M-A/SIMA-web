import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateFichaMedicaCreation = [
  body('id_cliente')
    .notEmpty()
    .withMessage('El ID del cliente es requerido')
    .isInt()
    .withMessage('El ID del cliente debe ser un número'),

  body('tipo_sanguineo')
    .trim()
    .optional({ checkFalsy: true })
    .isIn(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'])
    .withMessage('Tipo de sangre inválido'),

  body('alergenos')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 40 })
    .withMessage('Los alérgenos no pueden exceder 40 caracteres'),

  body('enfermedad_cronica')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 40 })
    .withMessage('La enfermedad crónica no puede exceder 40 caracteres'),
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
