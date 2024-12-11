import mongoose from 'mongoose';

mongoose
  .connect('mongodb+srv://Grupo-05:grupo05@cursadanodejs.ls9ii.mongodb.net/Node-js', {
  })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB: ', error));

//useNewUrlParser: true,
//useUnifiedTopology: true,