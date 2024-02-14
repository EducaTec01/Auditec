import HistorialComponent from "./pages/Historial/RHistorial";
import HistorialGComponent from "./pages/Historial#/RHistorial#";
import InconformidadesComponent from "./pages/Inconformidades/Inconformidades";
import InconformidadesGComponent from "./pages/Inconformities#/Inconformidades#";
import VigenciasComponent from "./pages/Vigencias/Vigencias";
import VigenciasGComponent from "./pages/Vigencias#/Vigencias#";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
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
            <Route index element={<Home />} />
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
