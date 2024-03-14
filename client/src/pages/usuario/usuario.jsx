import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import Sidebar from "../../components/sidebar/Sidebar";
import readIcon from "./read.png";
import deleteIcon from "./delete.png";
import editIcon from "./edit.png";
import { Link } from "react-router-dom";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    fetch("http://localhost:3001/usuariogetAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        return response.json();
      })
      .then((data) => {
        setUsuarios(data); // Actualizar el estado de usuarios con los datos obtenidos
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setError(error.message);
      });
  };

  const handleDeleteConfirmation = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este Usuario?");
    if (confirmacion) {
      handleDelete(id);
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/usuario/delete/${id}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }
      // Actualizar la lista de usuarios después de la eliminación
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
    <div className="section1">
      <Sidebar />
      <div className="section2">
        <div className="contenedor">
          <div className="titulo">
            <p>Usuarios</p>
          </div>
          <Link to="/usuarioFormulario" className="boton">Crear usuario</Link>
        </div>
        {usuarios.length === 0 ? (
          <div className="mensaje-vacio">No hay usuarios.</div>
        ) : (
          <table className="content-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>ID</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correoElectronico}</td>
                  <td>{usuario.id}</td>
                  <td>
                    <div className="acciones">
                      <Link to={`/usuario1/${usuario.id}`}>
                        <img src={readIcon} alt="read" />
                      </Link>
                      <a href="#" onClick={() => handleDeleteConfirmation(usuario.id)}>
                        <img src={deleteIcon} alt="delete" />
                      </a>
                      <Link to={`/usuarioUpdate/${usuario.id}`}>
                        <img src={editIcon} alt="edit" />
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

export default Usuario;
