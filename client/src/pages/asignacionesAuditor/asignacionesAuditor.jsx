import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacionesAuditor.scss"
import arrow from "./arrow.png"
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";

const AsignacionesAuditor = () => {
    const [asignaciones, setAsignaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchAsignaciones();
    }, []);

    const nombreUsuario = sessionStorage.getItem('nombre'); // Obtener el nombre del usuario del sessionStorage

    const fetchAsignaciones = () => {
        console.log(nombreUsuario)
      fetch(`http://localhost:3001/asignacionesAllAuditor/${nombreUsuario}`) // Pasar el nombre del usuario en la URL
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

  
    return (
      <body>
        <div className="section1">
          <SidebarAuditor />
          <div className="section2">
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
                          <a href={`/asignacion/${asignacion.id}`}>
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
  
  export default AsignacionesAuditor;