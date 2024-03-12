import "./usuario.scss"
import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import Sidebar from "../../components/sidebar/Sidebar"
import readIcon from "./read.png";
import deleteIcon from "./delete.png";
import editIcon from "./edit.png";
import { Link } from "react-router-dom";

const Usuario = () => {
  const [usuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    fetch("http://localhost:3001/usuariogetAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios 123");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setError(error.message);
      });
  };

  // Función para manejar la confirmación y eliminar la asignación
  const handleDeleteConfirmation = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este Usuario?");
    if (confirmacion) {
      handleDelete(id);
    }
  };

  // Función para eliminar la asignación
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/usuario/delete/${id}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }
      // Actualizar la lista de asignaciones después de la eliminación
      fetchUsuarios();
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
          <Navbar2 />
          <div className="contenedor">
            <div className="titulo">
              <p>Usuarios</p>
            </div>
            {/* Usar Link en lugar de <a> */}
            <Link to="/usuarioFormulario" className="boton">Crear usuario</Link>
          </div>
          {usuarios.length === 0 ? (
            <div className="mensaje-vacio">No hay usuarios.</div>
          ) : (
            <table className="content-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electronico</th>
                  <th>id</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.auditor}</td>
                    <td>{usuario.correoElectronico}</td>
                    <td>
                      <div className="acciones">
                        <a href={`/usuario/${usuario.id}`}>
                          <img src={readIcon} alt="read" />
                        </a>
                        {/* Icono de eliminar con confirmación */}
                        <a href="#" onClick={() => handleDeleteConfirmation(usuario.id)}>
                          <img src={deleteIcon} alt="delete" />
                        </a>
                        <a href={`/usuarioUpdate/${usuario.id}`}>
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

export default Usuario