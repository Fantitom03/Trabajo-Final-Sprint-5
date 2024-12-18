import mongoose from "mongoose";

const DATABASE_URL = 'mongodb+srv://Grupo-05:grupo05@cursadanodejs.ls9ii.mongodb.net/Node-js';

export async function connectDb() {
  try {
    await mongoose.connect(DATABASE_URL, {
    });
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}

export async function closeDb() {
  try {
    await mongoose.connection.close();
    console.log("Conexión con MongoDB cerrada");
  } catch (error) {
    console.error("Error al cerrar la conexión con MongoDB:", error);
  }
}