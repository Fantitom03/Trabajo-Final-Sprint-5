import { obtenerTodosLosPaises, crearPais, actualizarPaisPorId, eliminarPaisPorId, obtenerPaisPorId } from '../services/paisesServices.mjs';

// Obtener todos los países hispanohablantes
export async function obtenerTodosLosPaisesController(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();
        return await res.render("dashboard", { title: "Lista de Países Hispanohablantes", paises });
      } catch (error) {
        res.status(500).send({
            mensaje: "Error al obtener la lista de paises",
            error: error.message,
          });
      }
}

export async function mostrarDetallePaisController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id);

        if (!pais) {
            return res.status(404).send('País no encontrado');
        }

        res.render('detallePais', { title: `Detalle de ${pais.name.nativeName.spa.official}`, pais });
    } catch (error) {
        console.error('Error al mostrar los detalles del país:', error);
        res.status(500).send('Error interno del servidor');
    }
}

// Agregar un nuevo país
export async function agregarPaisController(req, res) {
    try {
        const {
            name_official,
            capital,
            borders,
            area,
            population,
            timezones
        } = req.body;

        // Procesar los datos del formulario
        const nuevoPais ={
            name: {
                official: name_official,
                nativeName: {
                    spa: {
                        official: name_official,
                    }
                }
            },
            capital: capital.split(',').map((item) => item.trim()),
            borders: borders ? borders.split(',').map((item) => item.trim()) : [],
            area: parseFloat(area),
            population: parseInt(population),
            timezones: timezones.split(',').map((item) => item.trim()),
            creador: "Francisco Leiva" // Valor fijo
        };

        // Guardar en la base de datos
        await crearPais(nuevoPais);
        res.status(201).redirect('/paises');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar el país', error: error.message });
    }
}


// Renderizar la vista de edición
export async function editarPaisController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id);

        if (!pais) {
            return res.status(404).send('País no encontrado');
        }

        res.render('editPais', { title: 'Editar País', pais });
    } catch (error) {
        console.error('Error al obtener el país para edición:', error);
        res.status(500).send('Error interno del servidor');
    }
}

// Actualizar los datos del país
export async function actualizarPaisEditadoController(req, res) {
    try {
        const { id } = req.params;
        const {
            name_official,
            capital,
            borders,
            area,
            population,
            timezones
        } = req.body;

        // Procesar los datos del formulario
        const paisActualizado = {
            name: {
                official: name_official,
                nativeName: {
                    spa: {
                        official: name_official,
                    }
                }
            },
            capital: capital.split(',').map((item) => item.trim()),
            borders: borders ? borders.split(',').map((item) => item.trim()) : [],
            area: parseFloat(area),
            population: parseInt(population, 10),
            timezones: timezones.split(',').map((item) => item.trim()),
        };

        const resultado = await actualizarPaisPorId(id, paisActualizado);

        if (!resultado) {
            return res.status(404).send('No se pudo actualizar el país.');
        }

        res.status(200).redirect('/paises');
    } catch (error) {
        console.error('Error al actualizar el país:', error);
        res.status(500).send('Error interno del servidor');
    }
}


// Eliminar un país
export async function eliminarPaisController(req, res) {
    try {
        const { id } = req.params;
        const paisEliminado = await eliminarPaisPorId(id);

        if (!paisEliminado) {
            return res.status(404).send('País no encontrado o no se pudo eliminar.');
        }

        res.redirect('/paises'); // Redirigir al dashboard tras la eliminación
    } catch (error) {
        console.error('Error al eliminar el país:', error);
        res.status(500).send('Error interno del servidor');
    }
}