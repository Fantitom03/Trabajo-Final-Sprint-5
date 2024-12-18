import IRepository from "./IRepository.mjs";
import Pais from "../models/pais.mjs"; // Modelo Mongoose

class PaisesRepository extends IRepository {

    // Obtener todos los países hispanohablantes desde la base de datos
    async obtenerTodos() {
        return await Pais.find({ creador: "Francisco Leiva" });
    }

    async obtenerPorId(id){
        return await Pais.findById(id);
    }

    // Agregar un país manualmente
    async insertarUno(data) {
        const nuevoPais = await Pais.create(data);
        return nuevoPais;
    }

    // Editar un país por su ID
    async actualizarUnoPorId(id, data) {
        const paisActualizado = await Pais.findByIdAndUpdate(id, data, { new: true });
        return paisActualizado;
    }

    // Eliminar un país por su ID
    async eliminarPorId(id) {
        return await Pais.findByIdAndDelete(id);
    }
}

export default new PaisesRepository();