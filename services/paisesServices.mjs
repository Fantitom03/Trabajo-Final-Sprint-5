import PaisRepository from "../repository/paisesRepository.mjs";
import Pais from "../models/pais.mjs"; // Modelo Mongoose

export async function populateDatabase() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/lang/spanish");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const paises = await response.json();
      paises.forEach((pais) => {
        delete pais.translations;
        delete pais.tld;
        delete pais.cca2;
        delete pais.cca3;
        delete pais.ccn3;
        delete pais.cioc;
        delete pais.idd;
        delete pais.altSpellings;
        delete pais.car;
        delete pais.coatOfArms;
        delete pais.postalCode;
        delete pais.demonyms;
        pais.creador = "Francisco Leiva";
      });
      const paisesGuardados = await Pais.insertMany(paises);
      console.log("La lista de paises ha sido cargada a la base de datos.");
      return paisesGuardados;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Se produjo un error al popular la base de datos usando la API restcountries"
      );
    }
  }
  
  export async function resetDatabase() {
    try {
      await Pais.deleteMany({ creador: "Francisco Leiva" });
      console.log("La base de datos se ha reiniciado correctamente");
    } catch (error) {
      console.error(error);
      throw new Error("Se produjo un error al reiniciar la base de datos");
    }
  }

export async function obtenerTodosLosPaises() {
    try {
        return await PaisRepository.obtenerTodos();
    } catch (error) {
        throw new Error(`Error en obtenerTodosLosPaises: ${error.message}`);
    }
}

export async function obtenerPaisPorId(id) {
  try {
      return await PaisRepository.obtenerPorId(id);
  } catch (error) {
      throw new Error(`Error al obtener el país por ID: ${error.message}`);
  }
}

export async function crearPais(data) {
    try {
        return await PaisRepository.insertarUno(data);
    } catch (error) {
        throw new Error(`Error al crear un país: ${error.message}`);
    }
}

export async function actualizarPaisPorId(id, data) {
    try {
        return await PaisRepository.actualizarUnoPorId(id, data);
    } catch (error) {
        throw new Error(`Error al actualizar el país: ${error.message}`);
    }
}

export async function eliminarPaisPorId(id) {
    try {
        return await PaisRepository.eliminarPorId(id);
    } catch (error) {
        throw new Error(`Error al eliminar el país: ${error.message}`);
    }
}