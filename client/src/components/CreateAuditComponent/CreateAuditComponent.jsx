// Importa las bibliotecas necesarias
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CreateAuditComponentSections from './CreateAuditComponentSections.jsx';
import "./CreateAuditComponent.scss";

// Define el componente CreateAuditComponent
const CreateAuditComponent = ({ onCancel }) => {
  // Estado inicial y funciones de manipulación del estado
  const initialAudit = { horarioInicio: "", horarioFinal: "", auditseccion: null, departamento: null, subsecciones: [] };
  const [modifiedAudit, setModifiedAudit] = useState(initialAudit);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [secciones, setSecciones] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [subsecciones, setSubsecciones] = useState([]);
  const [isSelectionComplete, setIsSelectionComplete] = useState(false);
  const [showSectionsComponent, setShowSectionsComponent] = useState(false);
  const [showSelectProcedureMessage, setShowSelectProcedureMessage] = useState(false); // Nuevo estado para controlar la visualización del mensaje "Seleccione un procedimiento"

  // Funciones para manejar los efectos secundarios
  useEffect(() => {
    fetchSecciones();
  }, []);

  useEffect(() => {
    if (modifiedAudit.horarioInicio && modifiedAudit.horarioFinal && modifiedAudit.auditseccion) {
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
      const response = await fetch(`http://localhost:3001/auditoria/departamento?fechaInicio=${modifiedAudit.horarioInicio}&fechaFinal=${modifiedAudit.horarioFinal}&seccion=${modifiedAudit.auditseccion.value}`);
      if (!response.ok) {
        throw new Error('Error al obtener los departamentos');
      }
      const data = await response.json();
      setDepartamentos(data.map(dep => ({ value: dep.nombre, label: dep.nombre })));
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

  // Función para eliminar una subsección
  const handleRemoveSubseccion = (index) => {
    const updatedSubsecciones = [...modifiedAudit.subsecciones];
    updatedSubsecciones.splice(index, 1);
    setModifiedAudit({ ...modifiedAudit, subsecciones: updatedSubsecciones });
  };  

  // Función para manejar el cambio de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "horarioInicio") {
      const endDate = new Date(modifiedAudit.horarioFinal);
      const startDate = new Date(value);
      setStartTimeError(startDate >= endDate);
    } else if (name === "horarioFinal") {
      const startDate = new Date(modifiedAudit.horarioInicio);
      const endDate = new Date(value);
      setEndTimeError(endDate <= startDate);
    }
    setModifiedAudit({ ...modifiedAudit, [name]: value });
  };

  // Función para manejar el cambio de la sección
  const handleSeccionChange = (selectedOption) => {
    setModifiedAudit({ ...modifiedAudit, auditseccion: selectedOption, departamento: null, subsecciones: [] });
  };

  // Función para manejar el cambio de departamento
  const handleDepartmentChange = (selectedOption) => {
    setModifiedAudit({ ...modifiedAudit, departamento: selectedOption });
  };

  // Función para manejar el cambio de subsección
  const handleSubseccionChange = (selectedOption) => {
    setModifiedAudit({ ...modifiedAudit, subsecciones: [...modifiedAudit.subsecciones, selectedOption] });
  };

  // Función para alternar la visualización del componente de secciones
  const handleToggleSectionsComponent = () => {
    if (isAtLeastOneSubsectionSelected()) {
      setShowSectionsComponent(!showSectionsComponent);
      setShowSelectProcedureMessage(false); // Reinicia el estado del mensaje "Seleccione un procedimiento" al cambiar de pantalla
    } else {
      setShowSelectProcedureMessage(true); // Muestra el mensaje "Seleccione un procedimiento" si no hay subsecciones seleccionadas al intentar avanzar
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
            <label htmlFor="horarioInicio">Fecha de Inicio:</label>
            <input 
              type="date" 
              name="horarioInicio" 
              value={modifiedAudit.horarioInicio} 
              onChange={handleInputChange} 
              min={new Date().toISOString().split('T')[0]} 
            />
            {startTimeError && <span style={{ color: 'red' }}>La fecha de inicio debe ser menor que la fecha final.</span>}
            <label htmlFor="horarioFinal">Fecha Final:</label>
            <input 
              type="date" 
              name="horarioFinal" 
              value={modifiedAudit.horarioFinal} 
              onChange={handleInputChange} 
              min={modifiedAudit.horarioInicio} 
              disabled={!modifiedAudit.horarioInicio} // Deshabilita el campo hasta que se seleccione la fecha de inicio
            />
            {endTimeError && <span style={{ color: 'red' }}>La fecha final debe ser mayor que la fecha de inicio.</span>}
            <label htmlFor="auditseccion">Área estratégica:</label>
            <Select
              value={modifiedAudit.auditseccion}
              onChange={handleSeccionChange}
              options={secciones}
              placeholder="Selecciona una sección"
              className="select"
              isDisabled={!modifiedAudit.horarioInicio} // Deshabilita el campo hasta que se seleccione la fecha de inicio
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
                <span>{subseccion.label}</span>
                <button onClick={() => handleRemoveSubseccion(index)}>Eliminar</button>
              </div>
            ))}
          </>
        )}
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
            disabled={!isAtLeastOneSubsectionSelected()} // Deshabilita el botón "Siguiente" si no hay subsecciones seleccionadas
          >
            {showSectionsComponent ? 'Volver' : 'Siguiente'}
          </button>
        </div>
      </div>      
    </div>
  );
};

// Exporta el componente CreateAuditComponent
export default CreateAuditComponent;
