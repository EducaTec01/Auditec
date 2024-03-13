import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import ErrorMessageModal from "../../components/ErrorMessageModal"; // Importa el componente ErrorMessageModal
import "./usuarioFormulario.scss";

const UsuarioFormulario = () => {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Suponiendo que fetchDepartamentos es una función que deberías tener definida
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Correo Electrónico:', correoElectronico);

    try {
      const nuevoUsuario = {
        usuario,
        contraseña,
        correoElectronico,
        nombre,
      };

      const response = await fetch('http://localhost:3001/usuarioCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario)
      });

      if (!response.ok) {
        throw new Error('Error al crear la asignación');
      }

      window.location.href = '/usuario';
    } catch (error) {
      console.error('Error al crear la asignación:', error);
      setError("Error al crear la asignación: " + error.message);
    }
  };

  const handleCloseErrorModal = () => {
    setError('');
  };

  return (    
    <div className="assignment-form">
      <div className="section1">
        <Sidebar />
        <div className="section2">
          <Navbar2 />
          <div className="top-section">
            <h2>Usuario</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="column">
                <label htmlFor="auditor">Nombre</label>
                <input 
                  onChange={(event) => setNombre(event.target.value)} 
                  type="text" id="auditor" value={nombre} />
              </div>
              <div className="column">
                <label htmlFor="auditor">Correo Electronico</label>
                <input 
                  onChange={(event) => setCorreoElectronico(event.target.value)} 
                  type="text" id="auditor" value={correoElectronico} />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="contraseña">Contraseña</label>
                <input 
                  onChange={(event) => setContraseña(event.target.value)} 
                  id="comments" value={contraseña}></input>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="comments">Usuario</label>
                <input 
                  onChange={(event) => setUsuario(event.target.value)} 
                  id="comments" value={usuario}></input>
              </div>
            </div>
            <div className="create-button">
              <button type="submit" className="boton">Crear Usuario</button>
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

export default UsuarioFormulario;