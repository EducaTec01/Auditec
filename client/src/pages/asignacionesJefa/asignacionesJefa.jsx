import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacionesJefa.scss";
import arrow from "./arrow.png";
import readIcon from "./read.png";
import deleteIcon from "./delete.png";
import editIcon from "./edit.png";
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

  // Función para manejar la confirmación y eliminar la asignación
  const handleDeleteConfirmation = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar esta asignación?");
    if (confirmacion) {
      handleDelete(id);
    }
  };

  // Función para eliminar la asignación
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/asignacion/delete/${id}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar la asignación");
      }
      // Actualizar la lista de asignaciones después de la eliminación
      fetchAsignaciones();
    })
    .catch((error) => {
      console.error("Error:", error);
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
              <p>Asignaciones</p>
            </div>
            {/* Usar Link en lugar de <a> */}
            <Link to="/asignacionFormulario" className="boton">Crear asignación</Link>
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
                          <img src={readIcon} alt="read" />
                        </a>
                        {/* Icono de eliminar con confirmación */}
                        <a href="#" onClick={() => handleDeleteConfirmation(asignacion.id)}>
                          <img src={deleteIcon} alt="delete" />
                        </a>
                        <a href={`/asignacionUpdate/${asignacion.id}`}>
                          <img src={editIcon} alt="edit" />
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

export default Asignaciones;
