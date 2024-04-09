import Navbar2 from "../../components/navbar-2/Navbar-2"
import Sidebar from "../../components/sidebar/Sidebar";
import "./historialesJefa.scss"
import arrow from "./arrow.png"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";



const HistorialesJefa = () => {
    const [asignaciones, setAsignaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchAsignaciones();
    }, []);
  
    const fetchAsignaciones = () => {
      fetch("http://localhost:3001/asignacionesgetAllpast")
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
          <div className="contenedor">
            <div className="titulo">
              <p>Historial</p>
            </div>
          </div>
          {asignaciones.length === 0 ? (
            <div className="mensaje-vacio">No hay asignaciones pendientes.</div>
          ) : (
            <table className="content-table">
              <thead>
                <tr>
                  <th>Asignación</th>
                  <th>Auditor</th>
                  <th>Departamento</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {asignaciones.map((asignacion) => (
                  <tr key={asignacion.id}>
                    <td>{asignacion.id}</td>
                    <td>{asignacion.auditor}</td>
                    <td>{asignacion.departamento}</td>
                    <td>{asignacion.fecha_final}</td>
                    <td>
                      <div className="acciones">
                        <a href={`/historialesJefa2`}>
                          <img src={arrow} alt="read" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </body>
    );
  };
  
  export default HistorialesJefa;