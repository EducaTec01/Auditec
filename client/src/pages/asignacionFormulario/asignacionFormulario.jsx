import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import ErrorMessageModal from "../../components/ErrorMessageModal"; // Importa el componente ErrorMessageModal
import "./asignacionFormulario.scss";

const AsignacionFormulario = () => {
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [nomenclatura, setNomenclatura] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [auditor, setAuditor] = useState('');
  const [encargado, setEncargado] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('creationDate').min = today;
    document.getElementById('deadline').min = today;
    setFechaCreacion(today);
    setFechaLimite(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (new Date(fechaLimite) < new Date(fechaCreacion)) {
      setError("La fecha límite no puede ser anterior a la fecha de creación");
      return; // Detener el envío del formulario si la fecha límite es anterior a la fecha de creación
    }

    try {
      const nuevaAsignacion = {
        fecha_inicio: fechaCreacion,
        fecha_final: fechaLimite,
        departamento,
        auditor,
        encargado,
        nomenclatura,
        comentarios,
        estado: 'Pendiente'
      };

      const response = await fetch('http://localhost:3001/asignacionesCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaAsignacion)
      });

      if (!response.ok) {
        throw new Error('Error al crear la asignación');
      }

      window.location.href = '/asignacionesJefa'; // Redirigir a la página de asignacionesJefa
    } catch (error) {
      console.error('Error al crear la asignación:', error);
      setError("Error al crear la asignación: " + error.message);
      // Manejar el error adecuadamente
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
            <h2>Asignación</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="column">
                <label htmlFor="creationDate">Fecha de Creación</label>
                <input 
                  onChange={(event) => setFechaCreacion(event.target.value)} 
                  type="date" id="creationDate" value={fechaCreacion} />
              </div>
              <div className="column">
                <label htmlFor="deadline">Fecha Límite</label>
                <input 
                  onChange={(event) => setFechaLimite(event.target.value)} 
                  type="date" id="deadline" value={fechaLimite} />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="nomenclature">Nomenclatura</label>
                <input 
                  onChange={(event) => setNomenclatura(event.target.value)} 
                  type="text" id="nomenclature" value={nomenclatura} />
              </div>
              <div className="column">
                <label htmlFor="department">Departamento</label>
                <input 
                  onChange={(event) => setDepartamento(event.target.value)} 
                  type="text" id="department" value={departamento} />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="auditor">Auditor</label>
                <input 
                  onChange={(event) => setAuditor(event.target.value)} 
                  type="text" id="auditor" value={auditor} />
              </div>
              <div className="column">
                <label htmlFor="responsible">Encargado</label>
                <input 
                  onChange={(event) => setEncargado(event.target.value)} 
                  type="text" id="responsible" value={encargado} />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="comments">Comentarios</label>
                <textarea 
                  onChange={(event) => setComentarios(event.target.value)} 
                  id="comments" value={comentarios}></textarea>
              </div>
            </div>
            <div className="create-button">
              <button type="submit" className="boton">Crear asignación</button>
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

export default AsignacionFormulario;