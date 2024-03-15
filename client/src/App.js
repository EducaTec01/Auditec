import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/usuario/usuario";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Capacitacion from "./pages/capacitacion/capacitacion";
import Navbar2 from "./components/navbar-2/Navbar-2";
import CapacitacionBody from "./components/capacitacion-body/capacitacion-body";
import Tutoriales from "./pages/tutoriales/tutoriales";
import Asignaciones from "./pages/asignaciones/asignaciones"
import Usuario from "./pages/usuario/usuario"
import Usuario1 from "./pages/usuario1/usuario1"
import UsuarioFormulario from "./pages/usuarioFormulario/usuarioFormulario"
import UsuarioUpdate from "./pages/usuarioUpdate/usuarioUpdate"


import AsignacionFormulario from "./pages/asignacionFormulario/asignacionFormulario"
import AsignacionesJefa from "./pages/asignacionesJefa/asignacionesJefa"

import AsignacionUpdate from "./pages/asignacionUpdate/asignacionUpdate"


import HistorialComponent from "./pages/Historial/RHistorial";
import HistorialGComponent from "./pages/Historial#/RHistorial#";
import InconformidadesComponent from "./pages/Inconformidades/Inconformidades";
import InconformidadesGComponent from "./pages/Inconformidades#/Inconformidades#";
import VigenciasComponent from "./pages/Vigencias/Vigencias";
import VigenciasGComponent from "./pages/Vigencias#/Vigencias#";

import Reportes from "./pages/reportes/reportes"
import HistorialesJefa from "./pages/historialesJefa/historialesJefa"
import HistorialesJefa2 from "./pages/historialesJefa2/historialesJefa2"
import Asignacion from "./pages/asignacion/asignacion"
import Preguntas from "./pages/preguntas/preguntas"
import Formulario from "./pages/formulario/formulario"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>

            <Route path="usuario" element ={<Usuario/>}></Route>
            <Route path="/usuario1/:id" element ={<Usuario1/>}></Route>
            <Route path="usuarioFormulario" element={<UsuarioFormulario />} />
            <Route path="usuarioUpdate/:id" element={<UsuarioUpdate />} />
            <Route path="capacitacion" element={<Capacitacion />} />
            <Route path="navbar2" element={<Navbar2 />} />
            <Route path="capacitacion-body" element={<CapacitacionBody />} />
            <Route path="tutoriales" element={<Tutoriales />} />
            <Route path="asignaciones" element={<Asignaciones />} />
            <Route path="asignacionesJefa" element={<AsignacionesJefa />} />
            <Route path="asignacionFormulario" element={<AsignacionFormulario />} />
            <Route path="asignacionUpdate/:id" element={<AsignacionUpdate />} />

            <Route path="historialesJefa" element={<HistorialesJefa/>}/>
            <Route path="historialesJefa2" element={<HistorialesJefa2/>}/>
            <Route path="reportes" element={<Reportes/>}/>
            <Route path="asignacion/:id" element={<Asignacion />} />
            <Route path="preguntas" element={<Preguntas />} />
            <Route path="formulario" element={<Formulario />} />

            <Route path="asignacionesJefa" element={<AsignacionesJefa />} />
            <Route path="asignacionFormulario" element={<AsignacionFormulario />} />
            <Route path="single" element={<Single />} />

            <Route path="historialCompanent" element={<HistorialComponent />} />
            <Route path="historialGCompanent" element={<HistorialGComponent />} />
            <Route path="inconformidadesComponent" element={<InconformidadesComponent />} />
            <Route path="inconformidadesGComponent" element={<InconformidadesGComponent />} />
            <Route path="vigenciasComponent" element={<VigenciasComponent />} />
            <Route path="vigenciasGComponent" element={<VigenciasGComponent />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
