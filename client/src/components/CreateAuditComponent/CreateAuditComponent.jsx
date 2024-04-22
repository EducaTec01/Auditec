import React, { useState, useEffect } from 'react';
import "./CreateAuditComponent.scss";

const CreateAuditComponent = ({ onCancel, onSave }) => {
  const initialAudit = { nombreAuditoria: "", Descripcion: "", horarioInicio: "", horarioFinal: "" };
  const [modifiedAudit, setModifiedAudit] = useState(initialAudit);
  const [auditNameExistsError, setAuditNameExistsError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [auditNameError, setAuditNameError] = useState(false); // Nuevo estado para el error de auditoria vacía


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedAudit({ ...modifiedAudit, [name]: value });

    if (name === "nombreAuditoria") {
      setAuditNameError(false);
    }
  };

  const handleSave = () => {
    if (modifiedAudit.nombreAuditoria.trim() === '') {
      setAuditNameError(true); // Establecer el estado de error si el nombre está vacío
      return;
    }    

    if (modifiedAudit.horarioInicio >= modifiedAudit.horarioFinal) {
      setStartTimeError(true);
      setEndTimeError(true);
      return;
    }

    // Verificar si la asignacion ya existe
    fetch(`http://localhost:3001/auditoria/check-auditname/${modifiedAudit.nombreAuditoria}/null`)
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          setAuditNameExistsError(true); // Establecer el estado de error de asignacion existente
        } else {
          // Si la asignacion no existe, continuar con la creación de la auditoria
          fetch('http://localhost:3001/auditoria/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(modifiedAudit),
          })
            .then(response => response.json())
            .then(data => {
              onSave(data);
              setModifiedAudit(initialAudit); // Resetear el formulario después de guardar con éxito
            })
            .catch(error => console.error('Error creating audit:', error));
        }
      })
      .catch(error => console.error('Error checking audit:', error));
  };

  return (
    <div className="create-audit">
      <h2>Crear Auditoria</h2>
      <div className="container">
        <label htmlFor="nombreAudit">Auditoria:</label>
        <input type="text" name="nombreAuditoria" value={modifiedAudit.nombreAudit} onChange={handleInputChange} />
        {auditNameError && <span style={{ color: 'red' }}>Ingrese un nombre</span>} {/* Mensaje de error */}        
        {auditNameExistsError && <span style={{ color: 'red' }}>Ya existe auditoria para este departamento. Por favor, elija otro.</span>}
        <label htmlFor="descripcion">Descripción:</label>
        <input type="text" name="Descripcion" value={modifiedAudit.Descripcion} onChange={handleInputChange} />
        <label htmlFor="horarioInicio">Fecha de Inicio:</label>
        <input type="time" name="horarioInicio" value={modifiedAudit.horarioInicio} onChange={handleInputChange} />
        {startTimeError && <span style={{ color: 'red' }}>La hora de inicio debe ser menor que la hora de cierre.</span>}
        <label htmlFor="horarioFinal">Fecha Final:</label>
        <input type="time" name="horarioFinal" value={modifiedAudit.horarioFinal} onChange={handleInputChange} />
        {endTimeError && <span style={{ color: 'red' }}>La hora de cierre debe ser mayor que la hora de inicio.</span>}
        <div className="actions">
          <button 
            style={{ backgroundColor: '#f2f2f2', color: 'black', marginRight: '0.5vw', border: '0.2vw solid #f2f2f2', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }}                              
            onClick={onCancel
            }>Cancelar
          </button>
          <button 
            style={{ backgroundColor: '#d8f3dc', color: 'black', marginLeft: '0vw', border: '0.2vw solid #d8f3dc', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }} 
            onClick={handleSave}
            >Guardar
          </button>
        </div>
      </div>      
    </div>
  );
};

export default CreateAuditComponent;
