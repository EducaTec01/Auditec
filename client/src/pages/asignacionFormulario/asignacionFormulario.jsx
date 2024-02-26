import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacionFormulario.scss";
import React, { useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";

const AsignacionFormulario = () => {
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato ISO
    document.getElementById('creationDate').min = today; // Establecer la fecha mínima para el input de fecha de creación
    document.getElementById('deadline').min = today;
  }, []);

  return (    
    <div className="assignment-form">
      <div className="section1">
        <Sidebar />
        <div className="section2">
        <Navbar2 />
      <div className="top-section">
        <h2>Asignación</h2>
      </div>
      <div className="row">
        <div className="column">
          <label htmlFor="creationDate">Fecha de Creación</label>
          <input type="date" id="creationDate" />
        </div>
        <div className="column">
          <label htmlFor="deadline">Fecha Límite</label>
          <input type="date" id="deadline" />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <label htmlFor="nomenclature">Nomenclatura</label>
          <input type="text" id="nomenclature" />
        </div>
        <div className="column">
          <label htmlFor="department">Departamento</label>
          <input type="text" id="department" />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <label htmlFor="auditor">Auditor</label>
          <input type="text" id="auditor" />
        </div>
        <div className="column">
          <label htmlFor="area">Área</label>
          <input type="text" id="area" />
        </div>
        <div className="column">
          <label htmlFor="responsible">Encargado</label>
          <input type="text" id="responsible" />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <label htmlFor="comments">Comentarios</label>
          <textarea id="comments"></textarea>
        </div>
      </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default AsignacionFormulario;