import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import ErrorMessageModal from "../../components/ErrorMessageModal"; // Importa el nuevo componente
import "./usuarioFormulario.scss";

const UsuarioFormulario = () => {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState(''); // Nuevo estado para la confirmación de contraseña
  const [accesos , setAccesos] = useState([]);
  const [error, setError] = useState('');
  const opcionesAcceso = ['Jefa', 'Auditor', 'auditado'];

  useEffect(() => {
    // Suponiendo que fetchDepartamentos es una función que deberías tener definida
    fetchAcceso();
  }, []);

  const fetchAcceso = async () => {
    try {
      const response = await fetch('http://localhost:3001/usuarioAcceso');
      if (!response.ok) {
        throw new Error('Error al obtener los nombres de accesos');
      }
      const data = await response.json();
      setAccesos(data);
    } catch (error) {
      console.error('Error al obtener los nombres de accesos:', error);
      setError("Error al obtener los nombres de accesos: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contraseña !== confirmarContraseña) {
      setError("La contraseña y la confirmación de contraseña no coinciden.");
      return;
    }

    try {
      const nuevoUsuario = {
        usuario,
        contraseña,
        correoElectronico,
        nombre,
        acceso: accesos,
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
          <div className="top-section">
            <h2>Usuario</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="column">
                <label htmlFor="nombre">Nombre</label>
                <input 
                  onChange={(event) => setNombre(event.target.value)} 
                  type="text" className="input-large" value={nombre} />
              </div>
              <div className="column">
                <label htmlFor="correoElectronico">Correo Electrónico</label>
                <input 
                  onChange={(event) => setCorreoElectronico(event.target.value)} 
                  type="text" className="input-large" value={correoElectronico} />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="contraseña">Contraseña</label>
                <input 
                  onChange={(event) => setContraseña(event.target.value)} 
                  type="password" className="input-large" value={contraseña} />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="confirmarContraseña">Confirmar Contraseña</label>
                <input 
                  onChange={(event) => setConfirmarContraseña(event.target.value)} 
                  type="password" className="input-large" value={confirmarContraseña} />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="usuario">Usuario</label>
                <input 
                  onChange={(event) => setUsuario(event.target.value)} 
                  type="text" className="input-large" value={usuario} />
              </div>
              <div className="column">
                <label htmlFor="auditor">Acceso</label>
                <select
                  onChange={(event) => setAccesos(event.target.value)}
                  value={accesos}
                  id="acceso"
                  style={{ fontSize: "24px" }}
                >
                  <option value="" disabled hidden>
                    Selecciona un acceso
                  </option>
                  {/* Utiliza map para generar las opciones del select */}
                  {opcionesAcceso.map((opcion, index) => (
                    <option key={index} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="create-button">
              <button type="submit" className="boton">Crear Usuario</button>
            </div>
          </form>
        </div>
      </div>
      {error && (
        <ErrorMessageModal message={error} onClose={handleCloseErrorModal} /> // Renderiza el componente ErrorMessageModal
      )}
    </div>
  );
};

export default UsuarioFormulario;
