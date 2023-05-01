import { useRef, useState,  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ActualizarPersona = () => {

    const {idPersona} = useParams()
    const [nombre, setNombre] = useState('');
    const [fotografia, setFotografia] = useState(null);
    const inputRef = useRef()

    const navigate = useNavigate();

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleImagenChange = (event) => {
        setFotografia(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('fotografia', fotografia);

    try {
    const {data} = await axios.put(`http://localhost:4000/api/personas/actualizarPersona/${idPersona}`, formData);
    console.log(data);

    setFotografia(null)
    setNombre('')
    inputRef.current.value = '';
    
    setTimeout(() => {
      navigate('/listaPersonas')
    }, 2000);
    

    } catch (error) {
        console.error(error);
        }
    };


  return (
    <div>
      <h2>Formulario de Actualizacion de Datos</h2>
      <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text"  value={nombre} onChange={handleNombreChange} />
      </label>
      <br />
      <label>
        Imagen:
        <input type="file"  onChange={handleImagenChange} ref={inputRef} />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
    </div>
  )
  
}

export default ActualizarPersona
