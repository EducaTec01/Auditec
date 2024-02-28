import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import arrow from "./arrow.png";
import "./asignaciones.scss";

const Asignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);

  useEffect(() => {
    // Realizar la solicitud HTTP al backend para obtener las asignaciones
    fetch("/api/asignacion")
      .then(response => response.json())
      .then(data => setAsignaciones(data))
      .catch(error => console.error("Error al obtener las asignaciones:", error));
  }, []);

  const handleDelete = (id) => {
    // Realizar la solicitud HTTP al backend para eliminar la asignación con el ID proporcionado
    fetch(`/api/asignacion/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      // Actualizar la lista de asignaciones después de eliminar una
      setAsignaciones(asignaciones.filter(asignacion => asignacion.id !== id));
    })
    .catch(error => console.error("Error al eliminar la asignación:", error));
  };

  return (
    <body>
      <header>
        <nav>
          <Navbar2 />
        </nav>
      </header>
      <div className="section2">
        <div className="titulo">
          <p>Asignaciones</p>
        </div>
        <table className="content-table">
          <thead>
            <tr>
              <th>Asignación</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map(asignacion => (
              <tr key={asignacion.id}>
                <td>{asignacion.id}</td>
                <td>{asignacion.fecha}</td>
                <td>{asignacion.estado}</td>
                <td>
                  <button onClick={() => handleDelete(asignacion.id)}>Borrar</button>
                  <a href={`/asignacion/${asignacion.id}`}>
                    <button>Modificar</button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <a href="/formulario">
            <button>Crear Asignación</button>
          </a>
        </div>
      </div>
    </body>
  );
};

export default Asignaciones;