import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacionesJefa.scss";
import arrow from "./arrow.png";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";

const Asignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAsignaciones();
  }, []);

  const fetchAsignaciones = () => {
    fetch(`http://localhost:3001/AllAuditoriasController`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener las asignaciones");
      }
      return response.json();
    })
    .then((data) => {
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
    <div className="section1">
      <Sidebar />
      <div className="section2">
        <Navbar2 />
        <div className="contenedor">
          <div className="titulo">
            <p>Asignaciones</p>
          </div>
        </div>
        {asignaciones.length === 0 ? (
          <div className="mensaje-vacio">No hay asignaciones pendientes.</div>
        ) : (
          <table className="content-table">
            <thead>
              <tr>
                <th>Auditoría</th>
                <th>Departamento</th>
                <th>Auditado</th>
                <th>Sección</th>
                <th>Fecha</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.map((asignacion) => (
                <tr key={asignacion.id}>
                  <td>{asignacion.id}</td>
                  <td>{asignacion.nombre_departamento}</td>
                  <td>{asignacion.nombre_auditado}</td>
                  <td>{asignacion.nombre_seccion}</td>
                  <td>{asignacion.fecha_final}</td>
                  <td>
                    <div className="acciones">
                      <Link to={`/asignacion/${asignacion.id}`}>
                        <img src={arrow} alt="read" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Asignaciones;
