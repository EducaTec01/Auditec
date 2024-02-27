import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacionFormulario.scss";
import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";

const AsignacionFormulario = () => {
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [nomenclatura, setNomenclatura] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [auditor, setAuditor] = useState('');
  const [area, setArea] = useState('');
  const [encargado, setEncargado] = useState('');
  const [comentarios, setComentarios] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato ISO
    document.getElementById('creationDate').min = today; // Establecer la fecha mínima para el input de fecha de creación
    document.getElementById('deadline').min = today; // Establecer la fecha mínima para el input de fecha límite
    setFechaCreacion(today); // Establecer la fecha de creación por defecto
    setFechaLímite(today);
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
              <label htmlFor="area">Área</label>
              <input 
                onChange={(event) => setArea(event.target.value)} 
                type="text" id="area" value={area} />
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
        </div>
      </div>
    </div>
  );
};

export default AsignacionFormulario;