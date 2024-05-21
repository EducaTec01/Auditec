import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacionesAuditor.scss";
import arrow from "./arrow.png";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";
import Navbar from "../../components/navbar/Navbar";

const AsignacionesAuditor = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAsignaciones();
  }, []);

  const idUSuario = sessionStorage.getItem('id'); // Obtener el nombre del usuario del sessionStorage

  const fetchAsignaciones = () => {
    console.log(idUSuario);
    fetch(`http://localhost:3001/auditoriaAllAuditor/${idUSuario}`) // Pasar el nombre del usuario en la URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las asignaciones");
        }
        return response.json();
      })
      .then((data) => {
        // Filtrar las asignaciones con estado "ELIMINADA"
        const asignacionesFiltradas = data.filter(
          (asignacion) => asignacion.estado === "ACTIVA"
        );

        // Formatear la fecha de vencimiento
        const asignacionesFormateadas = asignacionesFiltradas.map(
          (asignacion) => ({
            ...asignacion,
            fecha_final: new Date(asignacion.fecha_final).toISOString().split("T")[0],
          })
        );

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
    <div className="section1">
      <SidebarAuditor />
      <div className="section2">
        <Navbar />
        <div className="contenedor">
          <div className="titulo">
            <p>Asignaciones</p>
          </div>
        </div>
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : asignaciones.length === 0 ? (
          <div className="mensaje-vacio">No hay asignaciones pendientes.</div>
        ) : (
          <table className="content-table">
            <thead>
              <tr>
                <th>Auditoria</th>
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
  );
};

export default AsignacionesAuditor;
