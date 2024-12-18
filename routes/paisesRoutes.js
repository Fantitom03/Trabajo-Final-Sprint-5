import express from 'express';
import { paisValidationRules } from './validationRules.js';
import { handleValidationErrors } from './errorMiddleware.js';
import {
    obtenerTodosLosPaisesController,
    mostrarDetallePaisController,
    agregarPaisController,
    editarPaisController,
    actualizarPaisEditadoController,
    eliminarPaisController,
} from '../controllers/paisesController.mjs';

const router = express.Router();

// GET: Obtener todos los países
router.get('/', obtenerTodosLosPaisesController);

// GET: Mostrar formulario para agregar superhéroe
router.get('/agregar', (req, res) => { 
    res.render('addPais', { title: 'Agregar un Pais'});
});

// POST: Agregar un nuevo país
router.post('/agregar', paisValidationRules(), handleValidationErrors, agregarPaisController);

// GET: Agregar esta ruta para el detalle del país
router.get('/detalle/:id', mostrarDetallePaisController);

// GET: Renderiza la vista de edición
router.get('/editar/:id', editarPaisController);

// POST: Actualiza los datos del país
router.post('/editar/:id', paisValidationRules(), handleValidationErrors, actualizarPaisEditadoController);

// DELETE: Eliminar un país
router.delete('/:id', eliminarPaisController);

// Otras Rutas
router.get('/home', (req, res) => res.render('index', {title: 'Página Principal'}));
router.get('/about', (req, res) => {res.render('about', { title: 'About' });});

export default router;