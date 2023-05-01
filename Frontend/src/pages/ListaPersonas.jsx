
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

const ListaPersonas = () => {

    const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const obtenerPersonas= async()=> {
      const {data} = await axios('http://localhost:4000/api/personas/obtenerPersonas');
      
      setPersonas(data);
      console.log(data)
    }


    obtenerPersonas();
  }, []);

  const Image =  ({ src, alt }) => {
    const imageUrl = `http://localhost:4000/public/images/${src}`; // Cambiar la URL base según corresponda
    return <img width='100px' src={imageUrl} alt={alt} />;
  };

  const eliminarPersona = async (idPersona) =>{
    await axios.delete(`http://localhost:4000/api/personas/eliminarPersona/${idPersona}`)
  }


  return (
    <div>
      <h1>Listado de Personas</h1>
      <ul>
        {personas.map((persona) => (
          <li key={persona.idPersona}>
            <Image src={persona.fotografia} alt={persona.nombre} />
            {persona.nombre}
            <button onClick={()=>eliminarPersona(persona.idPersona)}>Eliminar</button>
            <Link to={`/actualizarPersona/${persona.idPersona}`}>Actualizar Datos</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPersonas
