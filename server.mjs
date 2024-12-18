import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './config/dbConfig.js'; // Conexión a la base de datos
import paisesRoutes from './routes/paisesRoutes.js';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar `__dirname` en entorno ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar directorio de vistas y motor EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(expressLayouts);
app.set('layout', 'layout'); //Archivo base de layout


// Rutas para las vistas
app.use('/paises', paisesRoutes);


// Configurar carpeta de archivos estáticos
app.use(express.static(path.resolve('./public')));


// Servidor
app.listen(PORT,'0.0.0.0', () =>{ 
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;