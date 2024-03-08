import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Capacitacion from "./pages/capacitacion/capacitacion";
import Navbar2 from "./components/navbar-2/Navbar-2";
import CapacitacionBody from "./components/capacitacion-body/capacitacion-body";
import Tutoriales from "./pages/tutoriales/tutoriales";
import Asignaciones from "./pages/asignaciones/asignaciones"

import AsignacionFormulario from "./pages/asignacionFormulario/asignacionFormulario"
import AsignacionesJefa from "./pages/asignacionesJefa/asignacionesJefa"


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

            <Route path="capacitacion" element={<Capacitacion />} />
            <Route path="navbar2" element={<Navbar2 />} />
            <Route path="capacitacion-body" element={<CapacitacionBody />} />
            <Route path="tutoriales" element={<Tutoriales />} />
            <Route path="asignaciones" element={<Asignaciones />} />
            <Route path="asignacionesJefa" element={<AsignacionesJefa />} />
            <Route path="asignacionFormulario" element={<AsignacionFormulario />} />

            <Route path="historialesJefa" element={<HistorialesJefa/>}/>
            <Route path="historialesJefa2" element={<HistorialesJefa2/>}/>
            <Route path="reportes" element={<Reportes/>}/>
            <Route path="asignacion/:id" element={<Asignacion />} />
            <Route path="preguntas" element={<Preguntas />} />
            <Route path="formulario" element={<Formulario />} />

            <Route path="asignacionesJefa" element={<AsignacionesJefa />} />
            <Route path="asignacionFormulario" element={<AsignacionFormulario />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
