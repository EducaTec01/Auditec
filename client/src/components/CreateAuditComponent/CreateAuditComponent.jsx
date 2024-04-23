import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "./CreateAuditComponent.scss";

const CreateAuditComponent = ({ onCancel, onSave }) => {
  const initialAudit = { horarioInicio: "", horarioFinal: "" };
  const [modifiedAudit, setModifiedAudit] = useState(initialAudit);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [auditDepartment, setAuditDepartment] = useState('');
  const [auditDepartmentError, setAuditDepartmentError] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const fetchDepartamentos = async () => {
    try {
      const response = await fetch('http://localhost:3001/departamentos');
      if (!response.ok) {
        throw new Error('Error al obtener los departamentos');
      }
      const data = await response.json();
      setDepartamentos(data.map(dep => ({ value: dep.nombre, label: dep.nombre })));
    } catch (error) {
      console.error('Error al obtener los departamentos:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedAudit({ ...modifiedAudit, [name]: value });
  };

  const handleDepartmentChange = (selectedOption) => {
    setAuditDepartment(selectedOption);
    if (selectedOption !== '') {
      setAuditDepartmentError(false);
    }
  };

  const handleSave = () => {
    if (modifiedAudit.horarioInicio >= modifiedAudit.horarioFinal) {
      setStartTimeError(true);
      setEndTimeError(true);
      return;
    }

    if (auditDepartment === '') {
      setAuditDepartmentError(true);
      return;
    }

    fetch('http://localhost:3001/auditoria/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...modifiedAudit, departamento: auditDepartment.value }),
    })
      .then(response => response.json())
      .then(data => {
        onSave(data);
        setModifiedAudit(initialAudit);
      })
      .catch(error => console.error('Error creating audit:', error));
  };

  return (
    <div className="create-audit">
      <h2>Crear Auditoria</h2>
      <div className="container">
        <label htmlFor="horarioInicio">Fecha de Inicio:</label>
        <input type="date" name="horarioInicio" value={modifiedAudit.horarioInicio} onChange={handleInputChange} />
        {startTimeError && <span style={{ color: 'red' }}>La hora de inicio debe ser menor que la hora de cierre.</span>}
        <label htmlFor="horarioFinal">Fecha Final:</label>
        <input type="date" name="horarioFinal" value={modifiedAudit.horarioFinal} onChange={handleInputChange} />
        {endTimeError && <span style={{ color: 'red' }}>La hora de cierre debe ser mayor que la hora de inicio.</span>}
        <label htmlFor="auditDepartment">Departamento:</label>
        <Select
          onChange={handleDepartmentChange} 
          value={auditDepartment}
          options={departamentos}
          placeholder="Selecciona un departamento"
          className="select"
        />                
        {auditDepartmentError && <span style={{ color: 'red' }}>Selecciona un departamento</span>}
        <div className="actions">
          <button 
            style={{ backgroundColor: '#f2f2f2', color: 'black', marginRight: '0.5vw', border: '0.2vw solid #f2f2f2', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }}                              
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button 
            style={{ backgroundColor: '#d8f3dc', color: 'black', marginLeft: '0vw', border: '0.2vw solid #d8f3dc', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }} 
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>      
    </div>
  );
};

export default CreateAuditComponent;
