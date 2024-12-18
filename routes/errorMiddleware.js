import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'La validación ha fallado. Por favor, revise los errores.',
            errors: errors.array().map((error) => ({
                campo: error.param,
                mensaje: error.msg,
            })),
        });
    }
    next();
};