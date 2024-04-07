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
import Reportes from "./pages/reportes/reportes"
import HistorialesJefa from "./pages/historialesJefa/historialesJefa"
import HistorialesJefa2 from "./pages/historialesJefa2/historialesJefa2"
import Asignacion from "./pages/asignacion/asignacion"
import Preguntas from "./pages/preguntas/preguntas"
import Formulario from "./pages/formulario/formulario"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import React,{ useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import HistorialComponent from "./pages/Historial/RHistorial";
import HistorialGComponent from "./pages/HistorialID/RHistorialID";
import InconformidadesComponent from "./pages/Inconformidades/Inconformidades";
import InconformidadesGComponent from "./pages/InconformidadesID/InconformidadesID";

import VigenciasComponent from "./pages/Vigencias/Vigencias";
import VigenciasGComponent from "./pages/VigenciasID/VigenciasID";

import HomeAuditado from "./pages/homeAuditado/HomeAuditado";
import HomeAuditor from "./pages/homeAuditor/homeAuditor";



const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem('token');
  const userAccess = sessionStorage.getItem('Acceso');

  return isAuthenticated && userAccess === 'Jefa' ? <Element {...rest} /> : <Navigate to="/home" />;
};

const PrivateRoute2 = ({ element: Element, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem('token');
  const userAccess = sessionStorage.getItem('Acceso');

  return isAuthenticated && userAccess === 'Auditor' ? <Element {...rest} /> : <Navigate to="/homeAuditor" />;
};

const PrivateRoute3 = ({ element: Element, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem('token');
  const userAccess = sessionStorage.getItem('Acceso');

  return isAuthenticated && userAccess === 'auditado' ? <Element {...rest} /> : <Navigate to="/HomeAuditado" />;
};

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
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
            {/* Sidebars */}
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

            <Route path="historialComponent" element={<HistorialComponent />} />
            <Route path="historialGComponent" element={<HistorialGComponent />} />
            <Route path="inconformidadesComponent" element={<InconformidadesComponent />} />
            <Route path="inconformidadesGComponent" element={<InconformidadesGComponent />} />
            <Route path="vigenciasComponent" element={<VigenciasComponent />} />
            <Route path="vigenciasGComponent" element={<VigenciasGComponent />} />


            {/* jefa */}
            <Route path="usuario" element ={<PrivateRoute element={Usuario}/>}/>
            <Route path="/usuario1/:id" element ={<PrivateRoute element={Usuario1}/>}/>
            <Route path="usuarioFormulario" element ={<PrivateRoute element={UsuarioFormulario}/>}/>
            <Route path="usuarioUpdate/:id" element ={<PrivateRoute element={UsuarioUpdate}/>}/>
            <Route path="asignaciones" element ={<PrivateRoute element={Asignaciones}/>}/>
            <Route path="asignacionesJefa" element ={<PrivateRoute element={AsignacionesJefa}/>}/>
            <Route path="asignacionFormulario" element ={<PrivateRoute element={AsignacionFormulario}/>}/>
            <Route path="asignacionUpdate/:id" element ={<PrivateRoute element={AsignacionUpdate}/>}/>
            <Route path="historialesJefa" element ={<PrivateRoute element={HistorialesJefa}/>}/>
            <Route path="historialesJefa2" element ={<PrivateRoute element={HistorialesJefa2}/>}/>
            <Route path="reportes" element ={<PrivateRoute element={Reportes}/>}/>
            <Route path="home" element={<PrivateRoute element={Home}/>}/>

            {/* Auditor */}
            <Route path="/capacitacion" element={<PrivateRoute2 element={Capacitacion} />} />
            <Route path="/capacitacion-body" element={<PrivateRoute2 element={CapacitacionBody} />} />
            <Route path="/tutoriales" element={<PrivateRoute2 element={Tutoriales} />} />
            <Route path="/asignacion/:id" element={<PrivateRoute2 element={Asignacion} />} />
            <Route path="/preguntas" element={<PrivateRoute2 element={Preguntas} />} />
            <Route path="/formulario" element={<PrivateRoute2 element={Formulario} />} />
            <Route path="/asignacionFormulario" element={<PrivateRoute2 element={AsignacionFormulario} />} />
            <Route path="/single" element={<PrivateRoute2 element={Single} />} />
            <Route path="homeAuditor" element={<PrivateRoute2 element={HomeAuditor}/>}/>
            
            {/* Auditado */}        
            <Route path="/historialCompanent" element={<PrivateRoute3 element={HistorialComponent} />} />
            <Route path="/historialGCompanent" element={<PrivateRoute3 element={HistorialGComponent} />} />
            <Route path="/inconformidadesComponent" element={<PrivateRoute3 element={InconformidadesComponent} />} />
            <Route path="/inconformidadesGComponent" element={<PrivateRoute3 element={InconformidadesGComponent} />} />
            <Route path="/vigenciasComponent" element={<PrivateRoute3 element={VigenciasComponent} />} />
            <Route path="/vigenciasGComponent" element={<PrivateRoute3 element={VigenciasGComponent} />} />
            <Route path="homeAuditado" element={<PrivateRoute3 element={HomeAuditado}/>}/>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
