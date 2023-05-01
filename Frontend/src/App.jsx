import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import ListaPersonas from './pages/listaPersonas';
import RegistrarPersonas from './pages/RegistrarPersonas';
import ActualizarPersona from './pages/ActualizarPersona';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<RegistrarPersonas/>}></Route>
        <Route path='/listaPersonas' element={<ListaPersonas/>}></Route>
        <Route path='/actualizarPersona/:idPersona' element={<ActualizarPersona/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
