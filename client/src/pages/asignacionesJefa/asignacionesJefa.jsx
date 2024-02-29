import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacionesJefa.scss";
import arrow from "./arrow.png";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom"; // Importar Link desde react-router-dom

const Asignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAsignaciones();
  }, []);

  const fetchAsignaciones = () => {
    fetch("http://localhost:3001/asignacionesgetAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las asignaciones");
        }
        return response.json();
      })
      .then((data) => {
        // Formatear la fecha de vencimiento
        const asignacionesFormateadas = data.map((asignacion) => ({
          ...asignacion,
          fecha_final: new Date(asignacion.fecha_final).toISOString().split("T")[0]
        }));
        setAsignaciones(asignacionesFormateadas);
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
          <div className="contenedor">
            <div className="titulo">
              <p>Asignaciones</p>
            </div>
            {/* Usar Link en lugar de <a> */}
            <Link to="/asignacionFormulario" className="boton">Crear asignación</Link>
          </div>
          <table className="content-table">
            <thead>
              <tr>
                <th>Asignación</th>
                <th>Fecha de Vencimiento</th>
                <th>Departamento</th>
                <th>Ir</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.map((asignacion) => (
                <tr key={asignacion.id}>
                  <td>{asignacion.id}</td>
                  <td>{asignacion.fecha_final}</td>
                  <td>{asignacion.departamento}</td>
                  <td>
                    <a href={`/asignacion/${asignacion.id}`}>
                      <img src={arrow} alt="arrow" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </body>
  );
};

export default Asignaciones;