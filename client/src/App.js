import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Capacitacion from "./pages/capacitacion/capacitacion";
import Tutoriales from "./pages/tutoriales/tutoriales";
import Asignaciones from "./pages/asignaciones/asignaciones"
import AsignacionFormulario from "./pages/asignacionFormulario/asignacionFormulario"
import AsignacionesJefa from "./pages/asignacionesJefa/asignacionesJefa"
import AsignacionUpdate from "./pages/asignacionUpdate/asignacionUpdate"
import Reportes from "./pages/reportes/reportes"
import HistorialesJefa from "./pages/historialesJefa/historialesJefa"
import HistorialesJefa2 from "./pages/historialesJefa2/historialesJefa2"
import Asignacion from "./pages/asignacion/asignacion"
import Formulario from "./pages/formulario/formulario"
import FormularioJefa from "./pages/formulariojefa/formulariojefa"
import DatosAsignacionJefa from "./pages/datosasingacionjefa/datosasingacionjefa"
import AsignacionesAuditado from "./pages/asignacionesauditado/asignacionesauditado"
import Auditadoinconformidad from "./pages/Auditadoinconformidad/Auditadoinconformidad"
import AuditadoinconformidadJefa from "./pages/AuditadoinconformidadJefa/AuditadoinconformidadJefa"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import Ajustes from "./pages/ajustes/Ajustes";
import React,{ useContext } from "react";
import VigenciasComponent from "./pages/Vigencias/Vigencias";
import VigenciasGComponent from "./pages/VigenciasID/VigenciasID";
import HomeAuditado from "./pages/homeAuditado/HomeAuditado";
import HomeAuditor from "./pages/homeAuditor/homeAuditor";
import AsignacionesAuditor from "./pages/asignacionesAuditor/asignacionesAuditor";




const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem('token');
  const userAccess = sessionStorage.getItem('Acceso');

  return isAuthenticated && userAccess === 'Jefa' ? <Element {...rest} /> : <Navigate to="/login" />;
};

const PrivateRoute2 = ({ element: Element, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem('token');
  const userAccess = sessionStorage.getItem('Acceso');

  return isAuthenticated && userAccess === 'Auditor' ? <Element {...rest} /> : <Navigate to="/login" />;
};

const PrivateRoute3 = ({ element: Element, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem('token');
  const userAccess = sessionStorage.getItem('Acceso');

  return isAuthenticated && userAccess === 'auditado' ? <Element {...rest} /> : <Navigate to="/login" />;
};

const CatchAll = () => {
  const isAuthenticated = sessionStorage.getItem('token');
  const userAccess = sessionStorage.getItem('Acceso');

  if (isAuthenticated && userAccess) {
    switch (userAccess) {
      case 'Jefa':
        return <Navigate to="/home" />;
      case 'Auditor':
        return <Navigate to="/homeAuditor" />;
      case 'auditado':
        return <Navigate to="/homeAuditado" />;
      default:
        return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />

            {/* jefa */}
            <Route path="asignaciones" element ={<PrivateRoute element={Asignaciones}/>}/>
            <Route path="asignacionesJefa" element ={<PrivateRoute element={AsignacionesJefa}/>}/>
            <Route path="asignacionFormulario" element ={<PrivateRoute element={AsignacionFormulario}/>}/>
            <Route path="asignacionUpdate/:id" element ={<PrivateRoute element={AsignacionUpdate}/>}/>
            <Route path="historialesJefa" element ={<PrivateRoute element={HistorialesJefa}/>}/>
            <Route path="historialesJefa2" element ={<PrivateRoute element={HistorialesJefa2}/>}/>
            <Route path="reportes" element ={<PrivateRoute element={Reportes}/>}/>
            <Route path="home" element={<PrivateRoute element={Home}/>}/>            
            <Route path="ajustes" element={<PrivateRoute element={Ajustes}/>}/>
            <Route path="/asignacionjefa/:id/formulariojefa" element={<PrivateRoute element={FormularioJefa} />} />
            <Route path="/asignacionjefa/:id/DatosAsignacionJefa" element={<PrivateRoute element={DatosAsignacionJefa} />} />
            <Route path="/AuditadoinconformidadJefa/:id/" element={<PrivateRoute element={AuditadoinconformidadJefa} />} />


            {/* Auditor */}
            <Route path="/capacitacion" element={<PrivateRoute2 element={Capacitacion} />} />
            <Route path="/tutoriales" element={<PrivateRoute2 element={Tutoriales} />} />
            <Route path="/asignacion/:id" element={<PrivateRoute2 element={Asignacion} />} />
            
            <Route path="/vigenciasComponent" element={<PrivateRoute2 element={VigenciasComponent} />} />
            <Route path="/asignacion/:id/formulario" element={<PrivateRoute2 element={Formulario} />} />

            <Route path="/homeAuditor" element={<PrivateRoute2 element={HomeAuditor}/>}/>
            <Route path="asignacionesAuditor" element={<PrivateRoute2 element={AsignacionesAuditor}/>}/>
            
            {/* Auditado */}  
            <Route path="/vigenciasComponent" element={<PrivateRoute3 element={VigenciasComponent} />} />
            <Route path="/vigenciasGComponent" element={<PrivateRoute3 element={VigenciasGComponent} />} />
            <Route path="/homeAuditado" element={<PrivateRoute3 element={HomeAuditado}/>}/>
            <Route path="/asignacionesAuditado" element={<PrivateRoute3 element={AsignacionesAuditado}/>}/>
            <Route path="/Auditadoinconformidad/:id/" element={<PrivateRoute3 element={Auditadoinconformidad} />} />
            
            
          </Route>
          <Route path="*" element={<CatchAll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
