export default class IRepository {

    obtenerTodos(){
        throw new Error ("Método 'obtenerTodos()' no implementado");
    }

    obtenerPorId(id) {
        throw new Error("Método 'obtenerPorId()' no implementado");
    }

    insertarUno(data) {
        throw new Error('Método no implementado.');
    }
    
    actualizarUnoPorId(id, data) {
        throw new Error('Método no implementado.');
    }
    
    eliminarUnoPorId(id) {
        throw new Error('Método no implementado.');
    }
}