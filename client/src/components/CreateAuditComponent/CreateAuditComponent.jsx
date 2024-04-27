// Importa las bibliotecas necesarias
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CreateAuditComponentSections from './CreateAuditComponentSections.jsx';
import "./CreateAuditComponent.scss";

// Define el componente CreateAuditComponent
const CreateAuditComponent = ({ onCancel }) => {
  // Estado inicial y funciones de manipulación del estado
  const initialAudit = { fechaInicio: "", fechaFinal: "", auditseccion: null, departamento: null, subsecciones: [], encargado: null, auditores:null};
  const [modifiedAudit, setModifiedAudit] = useState(initialAudit);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [secciones, setSecciones] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [subsecciones, setSubsecciones] = useState([]);
  const [auditados, setAuditados] = useState([]);
  const [isSelectionComplete, setIsSelectionComplete] = useState(false);
  const [showSectionsComponent, setShowSectionsComponent] = useState(false);
  const [showSelectProcedureMessage, setShowSelectProcedureMessage] = useState(false);
  const [auditores, setAuditores] = useState([]);

  // Funciones para manejar los efectos secundarios
  useEffect(() => {
    fetchSecciones();
    fetchAuditados();
    fetchAuditores();
  }, []);

  useEffect(() => {
    if (modifiedAudit.fechaInicio && modifiedAudit.fechaFinal && modifiedAudit.auditseccion) {
      fetchDepartamentos();
      fetchSubsecciones();
      setIsSelectionComplete(true);
    } else {
      setDepartamentos([]);
      setIsSelectionComplete(false);
    }
  }, [modifiedAudit]);

  // Función para obtener las secciones
  const fetchSecciones = async () => {
    try {
      const response = await fetch('http://localhost:3001/auditoria/seccion');
      if (!response.ok) {
        throw new Error('Error al obtener las secciones');
      }
      const data = await response.json();
      setSecciones(data.map(sec => ({ value: sec.id, label: sec.nombre })));
    } catch (error) {
      console.error('Error al obtener las secciones:', error);
    }
  };

  // Función para obtener los departamentos
  const fetchDepartamentos = async () => {
    try {
      const response = await fetch(`http://localhost:3001/auditoria/departamento?fechaInicio=${modifiedAudit.fechaInicio}&fechaFinal=${modifiedAudit.fechaFinal}&seccion=${modifiedAudit.auditseccion.value}`);
      if (!response.ok) {
        throw new Error('Error al obtener los departamentos');
      }
      const data = await response.json();
      setDepartamentos(data.map(dep => ({ value: dep.id, label: dep.nombre })));
    } catch (error) {
      console.error('Error al obtener los departamentos:', error);
    }
  };

  // Función para obtener las subsecciones
  const fetchSubsecciones = async () => {
    try {
      const response = await fetch(`http://localhost:3001/auditoria/subseccion?idseccion=${modifiedAudit.auditseccion.value}`);
      if (!response.ok) {
        throw new Error('Error al obtener las subsecciones');
      }
      const data = await response.json();
      setSubsecciones(data.map(sub => ({ value: sub.id, label: sub.nombre })));
    } catch (error) {
      console.error('Error al obtener las subsecciones:', error);
    }
  };

  // Función para obtener los auditados
  const fetchAuditados = async () => {
    try {
      const response = await fetch('http://localhost:3001/auditoria/auditado');
      if (!response.ok) {
        throw new Error('Error al obtener los auditados');
      }
      const data = await response.json();
      setAuditados(data.map(auditado => ({ value: auditado.id, label: auditado.nombre })));
    } catch (error) {
      console.error('Error al obtener los auditados:', error);
    }
  };

  
  const fetchAuditores = async () => {
    try {
      const response = await fetch('http://localhost:3001/auditoria/auditor');
      if (response.ok) {
        const data = await response.json();
        setAuditores(data.map(auditores => ({ value: auditores.id, label: auditores.nombre })));      
      } else {
        throw new Error('Error al obtener auditores');
      }
    } catch (error) {
      console.error(error);
      // Manejar el error como prefieras
    }
  };


  // Función para eliminar una subsección
  const handleRemoveSubseccion = (index) => {
    const updatedSubsecciones = [...modifiedAudit.subsecciones];
    updatedSubsecciones.splice(index, 1);
    setModifiedAudit({ ...modifiedAudit, subsecciones: updatedSubsecciones });
  };  

  // Función para manejar el cambio de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "fechaInicio") {
      const endDate = new Date(modifiedAudit.fechaFinal);
      const startDate = new Date(value);
      setStartTimeError(startDate >= endDate);
    } else if (name === "fechaFinal") {
      const startDate = new Date(modifiedAudit.fechaInicio);
      const endDate = new Date(value);
      setEndTimeError(endDate <= startDate);
    }
    setModifiedAudit({ ...modifiedAudit, [name]: value });
  };

  // Función para manejar el cambio de la sección
  const handleSeccionChange = (selectedOption) => {
    setModifiedAudit({ ...modifiedAudit, auditseccion: selectedOption, departamento: null, subsecciones: [], encargado: null });
  };

  // Función para manejar el cambio de departamento
  const handleDepartmentChange = (selectedOption) => {
    setModifiedAudit({ ...modifiedAudit, departamento: selectedOption });
  };

  // Función para manejar el cambio de subsección
  const handleSubseccionChange = (selectedOption) => {
    setModifiedAudit({ ...modifiedAudit, subsecciones: [...modifiedAudit.subsecciones, selectedOption] });
  };

  // Función para manejar el cambio de encargado
  const handleEncargadoChange = (selectedOption) => {
    setModifiedAudit({ ...modifiedAudit, encargado: selectedOption });
  };

  const handleAuditorChange = (selectedOption) => {
    setModifiedAudit({ ...modifiedAudit, auditores: selectedOption }); // Corregir el manejo del cambio de auditor
  };

  // Función para alternar la visualización del componente de secciones
  const handleToggleSectionsComponent = () => {
    if (isAtLeastOneSubsectionSelected()) {
      setShowSectionsComponent(!showSectionsComponent);
      setShowSelectProcedureMessage(false);
    } else {
      setShowSelectProcedureMessage(true);
    }
  };

  // Función para verificar si hay al menos una subsección seleccionada
  const isAtLeastOneSubsectionSelected = () => {
    return modifiedAudit.subsecciones.length > 0;
  };

  // Renderizado del componente
  return (
    <div className="create-audit">
      <h2>Crear Auditoria</h2>
      <div className="container">
        {showSectionsComponent ? (
          <CreateAuditComponentSections
            modifiedAudit={modifiedAudit}
            onCancel={() => setShowSectionsComponent(false)}
          />
        ) : (
          <>
            <label htmlFor="fechaInicio">Fecha de Inicio:</label>
            <input 
              type="date" 
              name="fechaInicio" 
              value={modifiedAudit.fechaInicio} 
              onChange={handleInputChange} 
              min={new Date().toISOString().split('T')[0]} 
            />
            {startTimeError && <span style={{ color: 'red' }}>La fecha de inicio debe ser menor que la fecha final.</span>}
            <label htmlFor="fechaFinal">Fecha Final:</label>
            <input 
              type="date" 
              name="fechaFinal" 
              value={modifiedAudit.fechaFinal} 
              onChange={handleInputChange} 
              min={modifiedAudit.fechaInicio} 
              disabled={!modifiedAudit.fechaInicio} 
            />
            {endTimeError && <span style={{ color: 'red' }}>La fecha final debe ser mayor que la fecha de inicio.</span>}
            <label htmlFor="auditseccion">Área estratégica:</label>
            <Select
              value={modifiedAudit.auditseccion}
              onChange={handleSeccionChange}
              options={secciones}
              placeholder="Selecciona una sección"
              className="select"
              isDisabled={!modifiedAudit.fechaInicio} 
            />   
            <label htmlFor="departamento">Departamento:</label>
            <Select
              value={modifiedAudit.departamento}
              onChange={handleDepartmentChange}
              options={departamentos}
              placeholder="Selecciona un departamento"
              className="select"
              isDisabled={!isSelectionComplete}
            />  
            {subsecciones.length > modifiedAudit.subsecciones.length && (
              <>
                <label htmlFor="subseccion">Procedimiento/s:</label>
                <Select
                  value={[]}
                  onChange={handleSubseccionChange}
                  options={subsecciones.filter(sub => !modifiedAudit.subsecciones.find(selected => selected.value === sub.value))}
                  placeholder="Selecciona un procedimiento"
                  className="select"
                  isDisabled={!isSelectionComplete || !modifiedAudit.departamento}
                />
                {!isAtLeastOneSubsectionSelected() && !showSelectProcedureMessage && (
                  <span style={{ color: 'red' }}>Seleccione un procedimiento</span>                  
                )}
              </>
            )}
            {modifiedAudit.subsecciones.map((subseccion, index) => (
              <div key={index} className="selected-subsection">              
                <div className="selected-subsections">  
                <span>{subseccion.label}</span>
                </div>
                <button 
                  style={{ backgroundColor: '#f2f2f2', color: 'black', marginRight: '0.5vw', border: '0.1vw solid #f2f2f2', padding: '0.2vw 0.2vw', borderRadius: '0.5vw', cursor: 'pointer' }}                              
                  onClick={() => handleRemoveSubseccion(index)}>Eliminar</button>
              </div>
            ))}
            <label htmlFor="encargado">Encargado:</label>
            <Select
              value={modifiedAudit.encargado}
              onChange={handleEncargadoChange}
              options={auditados}
              placeholder="Selecciona un encargado"
              className="select"
              isDisabled={!isSelectionComplete || !modifiedAudit.departamento} 
            />
            <label htmlFor="auditor">Auditor:</label>
            <Select
              value={modifiedAudit.auditores}
              onChange={handleAuditorChange}
              options={auditores}
              placeholder="Selecciona un auditor"
              className="select"
              isDisabled={!isSelectionComplete || !modifiedAudit.departamento}
            />   
            <div className="actions">
              <button 
                style={{ backgroundColor: '#f2f2f2', color: 'black', marginRight: '0.5vw', border: '0.2vw solid #f2f2f2', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }}                              
                onClick={onCancel}
              >
                Cancelar
              </button>
              <button 
                style={{ backgroundColor: '#d8f3dc', color: 'black', marginLeft: '0vw', border: '0.2vw solid #d8f3dc', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }} 
                onClick={handleToggleSectionsComponent}
                disabled={!isAtLeastOneSubsectionSelected()} 
              >
                {showSectionsComponent ? 'Volver' : 'Siguiente'}
              </button>
            </div>
          </>          
        )}        
      </div>      
    </div>
  );
};

// Exporta el componente CreateAuditComponent
export default CreateAuditComponent;
