import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import arrow from "./arrow.png";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar2 from "../../components/navbar-2/Navbar-2";

const Asignacion = () => {
  const { id } = useParams(); // Obtener el ID de la asignación de la URL
  const [asignacion, setAsignacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAsignacion(id);
  }, [id]);

  const fetchAsignacion = (id) => {
    fetch(`http://localhost:3001/asignacion`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error asdafaegfvla asignación");
        }
        return response.json();
      })
      .then((data) => {
        setAsignacion(data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <body>
      <div className="section1">
        <Sidebar />
        <div className="section2">
          <Navbar2 />
          <div className="encabezado">
          <div className="titulo">
            <p>Asignación #{asignacion?.id}</p>
            </div>
            <div className="info">
              <p>Fecha límite: {asignacion?.fecha_final}</p>
              <a href="/preguntas"><img src={arrow} alt="arrow" /></a>
            </div>
          </div>
          <div className="cuerpo">
            {/* Renderizar otros detalles de la asignación */}
          </div>
        </div>
      </div>
    </body>
  );
};

export default Asignacion;
