
import Persona from "../models/modelPersona.js";
import path from 'path';
import fs from "fs"

    
const crearPersona = async (req, res) => {
    
  
    const { nombre } = req.body;
    const fotografia = req.file.filename;
    
    try {
      const persona = await Persona.create({ nombre, fotografia });
      res.json(persona);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const obtenerPersonas = async(req, res) => {
  try {
    const personas = await Persona.findAll();
    res.json(personas);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inesperado, vuelve a intentar');
  }
}

const eliminarPersona = async (req,res) => {
  const {idPersona} = req.params;
  const persona = await Persona.findByPk(idPersona);
  
  const rutaFotografia = new URL('../public/images/', import.meta.url)
  const rutaImagen     = path.join(rutaFotografia.pathname, persona.fotografia).substring(1);

  try {
    await fs.promises.unlink(rutaImagen)
    console.log('Imagen eliminada exitosamente')
  }catch (error){
    console.error(`Ocurrió un error al intentar eliminar la imagen.`);
    console.error(error);
    return;
  }

  if(persona){
    try {
      await persona.destroy();
      res.json('Persona eliminada de la BD exitosamente');
    } catch (error) {
      console.log(error)
    }
  }else{
    return;
  }

}

const actualizarPersona = async (req, res) =>{
  const {idPersona} = req.params;
  const persona = await Persona.findByPk(idPersona);
  
  const rutaFotografia = new URL('../public/images/', import.meta.url)
  const rutaImagen     = path.join(rutaFotografia.pathname, persona.fotografia).substring(1);

  if(req.file){
    try {
      await fs.promises.unlink(rutaImagen)
      console.log('Imagen eliminada exitosamente')
    }catch (error){
      console.error(`Ocurrió un error al intentar eliminar la imagen.`);
      console.error(error);
      return;
    }
  }
  if(persona){
    try {
      
      persona.nombre = req.body.nombre || persona.nombre
      persona.fotografia = req.file ? req.file.filename : persona.fotografia;

      await persona.save();
      res.json('Datos actualizados correctamente')
    } catch (error) {
      console.log(error)
    }
    
  }
}

export {crearPersona, obtenerPersonas, eliminarPersona, actualizarPersona}