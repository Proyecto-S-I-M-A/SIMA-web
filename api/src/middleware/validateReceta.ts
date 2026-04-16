import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateRecetaCreation = [
  body('id_cliente')
    .notEmpty()
    .withMessage('El ID del cliente es requerido')
    .isInt()
    .withMessage('El ID del cliente debe ser un número'),

  body('doctor_remitente')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 20 })
    .withMessage('El nombre del doctor no puede exceder 20 caracteres'),

  body('ruc_doctor_remitente')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('El RUC del doctor no puede exceder 50 caracteres'),

  body('hospital_remitente')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 20 })
    .withMessage('El nombre del hospital no puede exceder 20 caracteres'),

  body('telefono_hospital')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 20 })
    .withMessage('El teléfono no puede exceder 20 caracteres'),

  body('correo')
    .trim()
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('El correo debe ser un email válido'),

  body('codigo')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('El código debe ser un número entero'),

  body('fecha')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('La fecha debe ser una fecha válida'),
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
