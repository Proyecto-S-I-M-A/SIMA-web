import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateUsuarioCreation = [
  body('usuario')
    .trim()
    .notEmpty()
    .withMessage('El usuario es requerido')
    .isLength({ min: 3, max: 20 })
    .withMessage('El usuario debe tener entre 3 y 20 caracteres'),

  body('nombre')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 2, max: 20 })
    .withMessage('El nombre debe tener entre 2 y 20 caracteres'),

  body('apellido')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 2, max: 20 })
    .withMessage('El apellido debe tener entre 2 y 20 caracteres'),

  body('password')
    .optional({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('rol')
    .trim()
    .optional({ checkFalsy: true })
    .isIn(['admin', 'doctor', 'farmacista', 'cajero'])
    .withMessage('El rol debe ser admin, doctor, farmacista o cajero'),

  body('ruc_doctor')
    .optional({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage('El RUC debe tener al menos 5 caracteres'),

  body('especialidades')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 20 })
    .withMessage('Las especialidades no pueden exceder 20 caracteres'),
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
