import React, { useState, useEffect } from 'react';
import "./CreateAuditComponentSections.scss";

const CreateAuditComponentSections = ({ modifiedAudit, onCancel }) => {
  const [auditores, setAuditores] = useState([]);

  const fetchAuditores = async () => {
    try {
      const response = await fetch('http://localhost:3001/auditoria/auditor');
      if (response.ok) {
        const data = await response.json();
        setAuditores(data);        
      } else {
        throw new Error('Error al obtener auditores');
      }
    } catch (error) {
      console.error(error);
      // Manejar el error como prefieras
    }
  };

  useEffect(() => {
    fetchAuditores();
  }, []);

  const handleCreate = async () => {
    try {
      const { fechaInicio, fechaFinal, auditseccion, departamento, encargado } = modifiedAudit;
  
      // Verificar que todos los campos requeridos estén presentes
      if (!fechaInicio || !fechaFinal || !auditseccion || !departamento || !encargado) {
        console.error("Todos los campos deben estar completos para crear la auditoría");
        return;
      }
  
      // Crear un array de objetos que contenga los datos de cada subsección
      const subseccionesData = modifiedAudit.subsecciones.map((subseccion, index) => ({
        idSubseccion: subseccion.value,
        idAuditor: document.getElementById(`auditor_${index}`).value,
        comentarios: document.getElementById(`comentarios_${index}`).value,
        nomenclatura: document.getElementById(`nomenclatura_${index}`).value
      }));
  
      // Construir el objeto que se enviará al servidor
      const auditoriaData = {
        idSeccion: auditseccion.value,
        idEncargado: encargado.value,
        fechaInicio,
        fechaFinal,
        idDepartamento: departamento.value,
        subsecciones: subseccionesData
      };
  
      // Imprimir los datos que se enviarán al endpoint
      console.log("Datos enviados al endpoint:", auditoriaData);
  
      const response = await fetch('http://localhost:3001/auditoria/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(auditoriaData)
      });
  
      if (response.ok) {
        console.log("Auditoría creada exitosamente");
        // Aquí puedes manejar el caso de éxito, como redirigir a una página de éxito o mostrar un mensaje
      } else {
        console.error("Error al crear la auditoría");
        // Manejar el caso de error, como mostrar un mensaje de error o volver a habilitar el botón de "Crear"
      }
    } catch (error) {
      console.error("Error al crear la auditoría:", error);
      // Manejar cualquier error inesperado que pueda ocurrir durante el proceso de creación de la auditoría
    }
  };  

  return (
    <div className="create-audit2">
        <div className="container">
            <p>Fecha: {modifiedAudit.fechaInicio} - {modifiedAudit.fechaFinal}</p>
            <p>Área estratégica: {modifiedAudit.auditseccion && modifiedAudit.auditseccion.label}</p>
            {/* Agrega el departamento y el encargado debajo de la sección */}
            <p>Departamento: {modifiedAudit.departamento && modifiedAudit.departamento.label}</p>
            <p>Encargado: {modifiedAudit.encargado && modifiedAudit.encargado.label}</p>

            {/* Despliegue de subsecciones */}
            <div className="subsections">
              <h2>Procedimientos</h2>
              {modifiedAudit.subsecciones?.map((subseccion, index) => (
                <div key={index} className="subsection-item">
                  <span>{subseccion.label}</span>
                  <div>
                    <label htmlFor={`auditor_${index}`}>Selecciona un auditor:</label>
                    <select id={`auditor_${index}`} name={`auditor_${index}`}>
                      <option value="">Selecciona un auditor</option>
                      {auditores && auditores.map((auditor, i) => (
                        <option key={i} value={auditor.id}>{auditor.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`comentarios_${index}`}>Comentarios:</label>
                    <input type="text" id={`comentarios_${index}`} name={`comentarios_${index}`} />
                  </div>
                  <div>
                    <label htmlFor={`nomenclatura_${index}`}>Nomenclatura:</label>
                    <input type="text" id={`nomenclatura_${index}`} name={`nomenclatura_${index}`} />
                  </div>
                </div>
              ))}
            </div>
  
            <div className="actions">
                <button 
                  style={{ backgroundColor: '#f2f2f2', color: 'black', marginRight: '0.5vw', border: '0.2vw solid #f2f2f2', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }}                              
                  onClick={onCancel}>Atrás</button>
                <button 
                  style={{ backgroundColor: '#d8f3dc', color: 'black', marginLeft: '0vw', border: '0.2vw solid #d8f3dc', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }} 
                  onClick={handleCreate}>Crear</button>
            </div>
        </div>
    </div>
  );
};

export default CreateAuditComponentSections;
