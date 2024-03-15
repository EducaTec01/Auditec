import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import ErrorMessageModal from "../../components/ErrorMessageModal";
import "./usuarioUpdate.scss";

const UsuarioUpdate = () => {
  const { id } = useParams(); // Obtener el ID de la asignación de la URL
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/usuario/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener la asignación');
        }
        const data = await response.json();

        setNombre(data.nombre);
        setUsuario(data.user);
        setCorreoElectronico(data.correoElectronico);
        setContraseña(data.password);
      } catch (error) {
        console.error('Error al obtener la asignación:', error);
        setError("Error al obtener el usuario: " + error.message);
      }
    };
  
    fetchData(); // Llamada a la función para obtener la asignación al cargar el componente
  }, [id]);
  const handleCloseErrorModal = () => {
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {      
      const usuarioActualizado = {
        nombre,                        // Mantén esto como está
        correoElectronico,             // Mantén esto como está
        password: contraseña,        // Esto está bien, pero asegúrate de que el backend use `password`
        user: usuario,
      };

      const response = await fetch(`http://localhost:3001/usuario/update/${id}`, {
        method: 'PUT', // o 'PATCH' dependiendo de la API
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioActualizado)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la asignación');
      }

      window.location.href = '/usuario';
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setError("Error al actualizar el usuario: " + error.message);
    }
  }

  return (    
    <div className="assignment-form">
      <div className="section1">
        <Sidebar />
        <div className="section2">
          <div className="top-section">
            <h2>Usuario #{id}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="column">
                <label htmlFor="nomenclature">Nombre</label>
                <input 
                  onChange={(event) => setNombre(event.target.value)} 
                  type="text" id="nomenclature" value={nombre} />
              </div>
              <div className="column">
                <label htmlFor="department">Correo Electronico</label>
                <input
                  onChange={(event) => setCorreoElectronico(event.target.value)} 
                  value={correoElectronico}
                  id="department"
                  style={{ fontSize: "24px" }}
                >
                </input>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="auditor">Contraseña</label>
                <input 
                  onChange={(event) => setContraseña(event.target.value)} 
                  type="text" id="auditor" value={contraseña} />
              </div>
              <div className="column">
                <label htmlFor="responsible">Usuario</label>
                <input 
                  onChange={(event) => setUsuario(event.target.value)} 
                  type="text" id="responsible" value={usuario} />
              </div>
            </div>
            <div className="row">
            </div>
            <div className="create-button">
              <button type="submit" className="boton">Actualizar usuario</button>
            </div>
          </form>
        </div>
      </div>
      {error && (
        <ErrorMessageModal message={error} onClose={handleCloseErrorModal} />
      )}
    </div>
  );
};

export default UsuarioUpdate;
