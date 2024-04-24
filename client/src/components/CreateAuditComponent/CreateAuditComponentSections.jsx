import React from 'react';
import "./CreateAuditComponentSections.scss";

const CreateAuditComponentSections = ({ modifiedAudit, onCancel }) => {
  return (
    <div className="create-audit">
        <h2>Secciones de la Auditoría</h2>
        <div className="container">
            <p>Horario de Inicio: {modifiedAudit.horarioInicio}</p>
            <p>Horario Final: {modifiedAudit.horarioFinal}</p>
            <p>Sección: {modifiedAudit.auditseccion && modifiedAudit.auditseccion.label}</p>

            {/* Despliegue de subsecciones */}
            <div className="subsections">
              <h3>Subsecciones:</h3>
              {modifiedAudit.subsecciones.map((subseccion, index) => (
                <div key={index} className="subsection-item">
                  <span>{subseccion.label}</span>
                  <div>
                    <label htmlFor={`auditor_${index}`}>Selecciona un auditor:</label>
                    <select id={`auditor_${index}`} name={`auditor_${index}`}>
                      <option value="">Selecciona un auditor</option>
                      {/* Agrega opciones de auditor aquí */}
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
                <button onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    </div>
  );
};

export default CreateAuditComponentSections;
