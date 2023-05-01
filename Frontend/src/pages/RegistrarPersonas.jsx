import { useRef, useState } from "react";
import axios from "axios";
const RegistrarPersonas = () => {

    const [nombre, setNombre] = useState('');
    const [fotografia, setFotografia] = useState(null);
    const inputRef = useRef()

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleImagenChange = (event) => {
        setFotografia(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    if([nombre,fotografia].includes('')){
        console.log('Todos los campos son requeridos')
        return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('fotografia', fotografia);

    try {
    const {data} = await axios.post('http://localhost:4000/api/personas/crearPersona', formData);
    console.log(data);

    setFotografia(null)
    setNombre('')
    inputRef.current.value = '';
    } catch (error) {
        console.error(error);
        }
    };


  return (
    <div>
      <h2>Formulario de ingreso de personas</h2>
      <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" required value={nombre} onChange={handleNombreChange} />
      </label>
      <br />
      <label>
        Imagen:
        <input type="file" required onChange={handleImagenChange} ref={inputRef} />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
    </div>
  )
}

export default RegistrarPersonas
