import React, { useState, useEffect } from 'react';
import "./CreateAuditComponentSections.scss";
import ModalAuditoria from '../Modal/ModalAuditoria';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const CreateAuditComponentSections = ({ modifiedAudit, onCancel }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ header: '', text: '' });
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const { fechaInicio, fechaFinal, auditseccion, departamento, encargado, auditores } = modifiedAudit;
  
      if (!fechaInicio || !fechaFinal || !auditseccion || !departamento || !encargado || !auditores) {
        console.error("Todos los campos deben estar completos para crear la auditoría");
        return;
      }
  
      const subseccionesData = modifiedAudit.subsecciones.map((subseccion, index) => ({
        idSubseccion: subseccion.value,
        comentarios: document.getElementById(`comentarios_${index}`).value,
        nomenclatura: document.getElementById(`nomenclatura_${index}`).value
      }));
  
      const auditoriaData = {
        idSeccion: auditseccion.value,
        idEncargado: encargado.value,
        fechaInicio,
        fechaFinal,
        idAuditor: auditores.value,
        idDepartamento: departamento.value,
        subsecciones: subseccionesData
      };
  
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
        setModalContent({ header: 'Éxito', text: 'La auditoría se ha creado exitosamente.' });
        setIsModalOpen(true);
      } else {
        console.error("Error al crear la auditoría");
        setModalContent({ header: 'Error', text: 'Hubo un problema al crear la auditoría.' });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear la auditoría:", error);
      setModalContent({ header: 'Error', text: 'Hubo un problema al crear la auditoría.' });
      setIsModalOpen(true);
    }
  }; 
  
  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/home');
  };

  return (
    <div className="create-audit2">
      <div className="container">
        <p>Fecha: {modifiedAudit.fechaInicio} - {modifiedAudit.fechaFinal}</p>
        <p>Área estratégica: {modifiedAudit.auditseccion && modifiedAudit.auditseccion.label}</p>
        <p>Departamento: {modifiedAudit.departamento && modifiedAudit.departamento.label}</p>
        <p>Encargado: {modifiedAudit.encargado && modifiedAudit.encargado.label}</p>
        <p>Auditor: {modifiedAudit.auditores && modifiedAudit.auditores.label}</p>

        <div className="subsections">
          <h2>Procedimientos</h2>
          {modifiedAudit.subsecciones?.map((subseccion, index) => (
            <div key={index} className="subsection-item">
              <span>{subseccion.label}</span>
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
      <ModalAuditoria 
        isOpen={isModalOpen}
        onClose={closeModal}
        header={modalContent.header}
        text={modalContent.text}
      />
    </div>
  );
};

export default CreateAuditComponentSections;