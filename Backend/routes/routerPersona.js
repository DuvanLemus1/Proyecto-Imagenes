
import express  from "express";
import multer from "multer";
import path from "path";


import { actualizarPersona, crearPersona, eliminarPersona, obtenerPersonas } from "../controllers/controllerPersona.js";

    //Configuracion previa para guardar imagenes
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
        cb(null, 'public/images'); // directorio donde se guardará la imagen
        },
        filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // nombre único de la imagen
        }
        });
  
    const upload = multer({ storage: storage });

const routerPersona = express.Router();

routerPersona.post('/crearPersona', upload.single('fotografia'),crearPersona)
routerPersona.get('/obtenerPersonas', obtenerPersonas);
routerPersona.delete('/eliminarPersona/:idPersona', eliminarPersona)
routerPersona.put('/actualizarPersona/:idPersona',upload.single('fotografia'), actualizarPersona)


export default routerPersona