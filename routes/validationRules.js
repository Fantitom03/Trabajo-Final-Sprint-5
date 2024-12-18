import { body, validationResult } from 'express-validator';

export const paisValidationRules = () => [
    // Validar el nombre oficial
    body('name_official')
        .notEmpty().withMessage('El nombre oficial es obligatorio.')
        .trim().withMessage('El nombre oficial no debe tener espacios al inicio o al final.')
        .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),
        
    // Validar la capital
    body('capital')
        .notEmpty().withMessage('La capital es obligatoria.')
        .custom((value) => {
            const ciudades = value.split(',').map((ciudad) => ciudad.trim());
            if (ciudades.some(ciudad => ciudad.length < 3 || ciudad.length > 90)) {
                throw new Error('Cada nombre de ciudad debe tener entre 3 y 90 caracteres.');
            }
            return true;
        }),
    
    // Validar las fronteras
    body('borders')
        .notEmpty().withMessage('Los paises limítrofes son obligatorias.')
        .custom((value) => {
            if (!value) return true;
            const codigos = value.split(',').map((codigo) => codigo.trim());
            if (codigos.some(codigo => !/^[A-Z]{3}$/.test(codigo))) {
                throw new Error('Cada código de frontera debe ser una cadena de 3 letras mayúsculas.');
            }
            return true;
        }),
    
    // Validar el área
    body('area')
        .notEmpty().withMessage('El área es obligatoria.')
        .isFloat({ min: 1 }).withMessage('El área debe ser un número positivo mayor a 0.'),
    
    // Validar la población
    body('population')
        .notEmpty().withMessage('La población es obligatoria.')
        .isInt({ min: 1 }).withMessage('La población debe ser un número entero positivo mayor a 0.')
        .toInt(),
    
        body('timezones')
        .notEmpty().withMessage('Las zonas horarias son obligatorias.')
        .custom((value) => {
            const zonas = value.split(',').map((zona) => zona.trim());
            const regex = /^UTC[+-](0?[0-9]|1[0-2])$/; //Patrón para validar la zona horaria
            if (zonas.some(zona => !regex.test(zona))) {
                throw new Error('Cada zona horaria debe ser válida y estar en el formato "UTC+X" o "UTC-X", donde X está entre 0 y 12.');
            }
            return true;
        })
];