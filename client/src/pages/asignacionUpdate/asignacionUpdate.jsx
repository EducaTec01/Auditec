import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import ErrorMessageModal from "../../components/ErrorMessageModal";
import "./asignacionUpdate.scss";

const AsignacionUpdate = () => {
  const { id } = useParams(); // Obtener el ID de la asignación de la URL
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [nomenclatura, setNomenclatura] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [auditor, setAuditor] = useState('');
  const [encargado, setEncargado] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/asignacion/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener la asignación');
        }
        const data = await response.json();
        
        // Convertir la fecha de inicio y fecha final al formato "yyyy-MM-dd"
        const fechaInicioFormatted = new Date(data.fecha_inicio).toISOString().split('T')[0];
        const fechaFinalFormatted = new Date(data.fecha_final).toISOString().split('T')[0];
  
        setFechaCreacion(fechaInicioFormatted);
        setFechaLimite(fechaFinalFormatted);
        setNomenclatura(data.nomenclatura);
        setDepartamento(data.departamento);
        setAuditor(data.auditor);
        setEncargado(data.encargado);
        setComentarios(data.comentarios);
      } catch (error) {
        console.error('Error al obtener la asignación:', error);
        setError("Error al obtener la asignación: " + error.message);
      }
    };
  
    fetchData(); // Llamada a la función para obtener la asignación al cargar el componente
    fetchDepartamentos(); // Llamada a la función para obtener los departamentos al cargar el componente
  }, [id]);
  
  const fetchDepartamentos = async () => {
    try {
      const response = await fetch('http://localhost:3001/departamentos');
      if (!response.ok) {
        throw new Error('Error al obtener los departamentos');
      }
      const data = await response.json();
      setDepartamentos(data);
    } catch (error) {
      console.error('Error al obtener los departamentos:', error);
      setError("Error al obtener los departamentos: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(fechaLimite) < new Date(fechaCreacion)) {
      setError("La fecha límite no puede ser anterior a la fecha de creación");
      return;
    }
    try {      
      const asignacionActualizada = {
        fecha_inicio: fechaCreacion,
        fecha_final: fechaLimite,
        departamento,
        auditor,
        encargado,
        nomenclatura,
        comentarios,
        estado: 'Pendiente',
        identificador: 1
      };

      // Formatear las fechas en el formato "yyyy-MM-dd"
      const fechaInicioFormatted = new Date(fechaCreacion).toISOString().split('T')[0];
      const fechaFinalFormatted = new Date(fechaLimite).toISOString().split('T')[0];
      asignacionActualizada.fecha_inicio = fechaInicioFormatted;
      asignacionActualizada.fecha_final = fechaFinalFormatted;

      const response = await fetch(`http://localhost:3001/asignacion/update/${id}`, {
        method: 'PUT', // o 'PATCH' dependiendo de la API
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(asignacionActualizada)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la asignación');
      }

      window.location.href = '/asignacionesJefa';
    } catch (error) {
      console.error('Error al actualizar la asignación:', error);
      setError("Error al actualizar la asignación: " + error.message);
    }
  }

  const handleCloseErrorModal = () => {
    setError('');
  };

  return (    
    <div className="assignment-form">
      <div className="section1">
        <Sidebar />
        <div className="section2">
          <div className="top-section">
            <h2>Asignación #{id}</h2>
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
                <select
                  onChange={(event) => setDepartamento(event.target.value)} 
                  value={departamento}
                  id="department"
                  style={{ fontSize: "24px" }}
                >
                  <option value="" disabled hidden>
                    Selecciona un departamento
                  </option>
                  {departamentos.map((dep) => (
                    <option key={dep.id} value={dep.nombre}>{dep.nombre}</option>
                  ))}
                </select>
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
              <button type="submit" className="boton">Actualizar asignación</button>
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

export default AsignacionUpdate;
