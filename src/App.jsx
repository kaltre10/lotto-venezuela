import { useState } from 'react'
import './App.css'
import Login from './components/login/Login';
import Home from './components/home/Home';
import Vender from './components/vender/Vender';
import Resultados from './components/resultados/Resultados';
import Reportes from './components/reportes/Reportes';
import Ventas from './components/ventas/Ventas';
import Crear from './components/crear/Crear';
import CargarResultados from './components/cargarResultados/CargarResultados';
import Pagar from './components/pagar/Pagar';
import Premios from './components/premios/Premios';
import { DataUserContext } from './context/DataUserContext';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <DataUserContext>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/vender" element={<Vender/>} />
          <Route path="/resultados" element={<Resultados/>} />
          <Route path="/reportes" element={<Reportes/>} />
          <Route path="/ventas" element={<Ventas/>} />
          <Route path="/crear" element={<Crear/>} />
          <Route path="/resultados-crear" element={<CargarResultados/>} />
          <Route path="/pagar" element={<Pagar/>} />
          <Route path="/premios" element={<Premios/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </DataUserContext>
    </div>
  )
}

export default App
