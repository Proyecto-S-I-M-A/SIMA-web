import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateHistorialMedicoCreation = [
  body('id_cliente')
    .notEmpty()
    .withMessage('El ID del cliente es requerido')
    .isInt()
    .withMessage('El ID del cliente debe ser un número'),

  body('fecha_consulta')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('La fecha de consulta debe ser una fecha válida'),

  body('motivo_consulta')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage('El motivo de consulta no puede exceder 255 caracteres'),

  body('diagnostico')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage('El diagnóstico no puede exceder 500 caracteres'),

  body('tratamiento')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage('El tratamiento no puede exceder 500 caracteres'),

  body('observaciones')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage('Las observaciones no pueden exceder 500 caracteres'),

  body('presion_arterial')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 20 })
    .withMessage('La presión arterial no puede exceder 20 caracteres'),

  body('temperatura')
    .optional({ checkFalsy: true })
    .isDecimal()
    .withMessage('La temperatura debe ser un número decimal'),

  body('peso')
    .optional({ checkFalsy: true })
    .isDecimal()
    .withMessage('El peso debe ser un número decimal'),

  body('altura')
    .optional({ checkFalsy: true })
    .isDecimal()
    .withMessage('La altura debe ser un número decimal'),

  body('frecuencia_cardiaca')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('La frecuencia cardíaca debe ser un número entero'),

  body('medico')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 150 })
    .withMessage('El nombre del médico no puede exceder 150 caracteres'),

  body('fecha_registro')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('La fecha de registro debe ser una fecha válida'),
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
