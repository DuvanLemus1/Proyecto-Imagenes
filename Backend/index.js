
import express from 'express';
import sequelize from './config/db.js';

import routerPersona from './routes/routerPersona.js';
import cors from 'cors'
import {dirname} from 'path'
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

app.use(express.json());

//Probar la conexion a la BD --------------------------------
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error);
  });
//------------------------------------------------------------

//Configurar CORS
/*
const whitelist=["http://localhost:4000"];

const corsOptions={
  origin: function(origin, callback){
    if(whitelist.includes(origin)){
      //Consulta la API
      callback(null,true);
  }else{
      //No permitido
      callback(new Error("Error de CORS"))
  }
  }
};
app.use(cors(corsOptions));
*/
//Administrar Routing-----------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use("/api/personas", routerPersona);




//------------------------------------------------------------



const PORT = 4000;

app.listen(PORT, ()=>{
    console.log(`Corriendo en el puerto ${PORT}`);
})