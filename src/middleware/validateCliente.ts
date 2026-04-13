import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

// Reglas de validación para crear un Cliente
export const validateClienteCreation = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  body('apellido')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 2, max: 100 })
    .withMessage('El apellido debe tener entre 2 y 100 caracteres'),

  body('cedula')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 5, max: 20 })
    .withMessage('La cédula debe tener entre 5 y 20 caracteres'),

  body('correo')
    .trim()
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('El correo debe ser un email válido'),

  body('sexo')
    .trim()
    .optional({ checkFalsy: true })
    .isIn(['M', 'F', 'Otro'])
    .withMessage('El sexo debe ser M, F u Otro'),

  body('asegurado')
    .optional()
    .isBoolean()
    .withMessage('Asegurado debe ser un booleano'),

  body('verificado')
    .optional()
    .isBoolean()
    .withMessage('Verificado debe ser un booleano'),

  body("id_acceso")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage('el id_acceso es requerido y debe ser un número'),
];

// Middleware para manejar errores de validación
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
