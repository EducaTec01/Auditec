import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PeopleIcon from '@mui/icons-material/People';
import "./ajustes.scss";
import ModifyUserComponent from "../../components/ModifyUserComponent/ModifyUserComponent";
import CreateUserComponent from "../../components/CreateUserComponent/CreateUserComponent"; 
import CreateAuditComponent from "../../components/CreateAuditComponent/CreateAuditComponent"; 
import ModifyAuditComponent from "../../components/ModifyAuditComponent/ModifyAuditComponent";
import { red } from '@mui/material/colors';
import { ClosedCaptionDisabledSharp } from '@mui/icons-material';

const Ajustes = () => {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState('auditorias');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmations, setDeleteConfirmations] = useState({});

  useEffect(() => {
    setDeleteConfirmations({});
    setIsEditing(false);
    setIsCreating(false);
    fetchData(dataType);
  }, [dataType]); 

  const fetchData = (type) => {
    let url;
    if (type === 'auditorias') {
      url = 'http://localhost:3001/auditorias';
    } else if (type === 'usuarios') {
      url = 'http://localhost:3001/usuarios';
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(`Error fetching ${type}:`, error));
  };

  const handleModifyItem = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCancelModification = () => {
    setSelectedItem(null);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleSaveModification = (modifiedItem) => {
    setSelectedItem(null);
    setIsEditing(false);
    setIsCreating(false);
    fetchData(dataType);
  };

  const handleDeleteUser = (id) => {
    if (deleteConfirmations[id]) {
      fetch(`http://localhost:3001/usuario/delete/${id}`, {
        method: 'PUT'
      })
      .then(response => response.json())
      .then(data => {
        console.log('Acceso del usuario cambiado a INACTIVO:', data);
        setDeleteConfirmations(prevState => ({
          ...prevState,
          [id]: false
        }));
        fetchData(dataType);
      })
      .catch(error => console.error('Error al cambiar el acceso del usuario:', error));
    } else {
      setDeleteConfirmations(prevState => ({
        ...prevState,
        [id]: true
      }));
    }
  };

  const handleDeleteAudit = (id) => {
    if (deleteConfirmations[id]) {
      fetch(`http://localhost:3001/auditoria/delete/${id}`, {
        method: 'PUT'
      })
      .then(response => response.json())
      .then(data => {
        console.log('Auditoria eliminada:', data);
        setDeleteConfirmations(prevState => ({
          ...prevState,
          [id]: false
        }));
        fetchData(dataType);
      })
      .catch(error => console.error('Error al eliminar la auditoria:', error));
    } else {
      setDeleteConfirmations(prevState => ({
        ...prevState,
        [id]: true
      }));
    }
  };

  const handleShowCreateUser = () => {
    setIsCreating(true);
  };

  return (
    <div className="ajustes">
      <Sidebar />
      <div className="ajustesContainer">
        <Navbar />
        <div className="containers">
          <div className="containerL">
            <div className="containersL">
              <div className="widgetsT">              
                <Widget className="widget" type="ajustestitulo"/>             
              </div>
              <div className="widgetsB">              
                <Widget className="widget" type="auditorias" descripcion="Administrar auditorias" onClick={() => setDataType('auditorias')} />
                <Widget className="widget" type="usuarios" descripcion="Administrar usuarios" onClick={() => setDataType('usuarios')} />
              </div>
            </div>            
          </div>
          <div className="containerR">
            <div className="ajustestituloR">
              <div className="ajustestitulo">
                <h2>{dataType === 'auditorias' ? 'Auditorias' : 'Usuarios'}</h2>
                {!isEditing && !isCreating && (
                  <div className="iconR">
                    <AddIcon style={{ fontSize: '3vw', border: '0.2vw solid black', borderRadius: '30%', borderColor: '#E0E0E0'}} onClick={handleShowCreateUser} /> 
                  </div>
                )}
              </div>              
            </div>
            <div className={`ajustesR ${isEditing || isCreating ? 'centered' : ''}`}>
              {isCreating && dataType === 'usuarios' && 
                <CreateUserComponent 
                  onCancel={handleCancelModification}                  
                  onSave={handleSaveModification} 
                />} 
              {isCreating && dataType === 'auditorias' && 
                <CreateAuditComponent 
                  onCancel={handleCancelModification}                  
                  onSave={handleSaveModification}               
                />} 
              {isEditing && dataType === 'usuarios' && (
                <ModifyUserComponent 
                  user={selectedItem} 
                  onCancel={handleCancelModification} 
                  onSave={handleSaveModification} 
                />
              )}
              {isEditing && dataType === 'auditorias' && (
                <ModifyAuditComponent 
                  audit={selectedItem} 
                  onCancel={handleCancelModification} 
                  onSave={handleSaveModification} 
                />
              )}
              {!isCreating && !isEditing && (
                <div className="auditoriasContainer">
                  {dataType === 'auditorias' && (
                    <div className="icono">
                      <AutoAwesomeMotionIcon style={{ fontSize: '4.5vw'}} /> 
                    </div>
                  )}
                  {dataType === 'usuarios' && (
                    <div className="icono">
                      <PeopleIcon style={{ fontSize: '4.5vw'}} /> 
                    </div>
                  )}
                  {Array.isArray(data) && data.map(item => (
                    <div key={item.id} className="auditoria">                      
                      <h3>{dataType === 'auditorias' ? item.nombre_departamento  : item.nombre}</h3>
                      <p>
                        {dataType === 'auditorias' 
                          ? ""
                          : <span>Tipo de acceso: <em>{item.Acceso}</em></span>
                        }
                      </p>
                        {dataType === 'auditorias' && item.fecha_inicio && (
                        <p>{"Fecha de Inicio: " + item.fecha_inicio.slice(0, 10)}</p>
                      )}
                      {dataType === 'auditorias' && item.fecha_final && (
                        <p>{"Fecha Final: " + item.fecha_final.slice(0, 10)}</p>
                      )}                   
                      <div className="actions">
                        {deleteConfirmations[item.id] ? (
                          <>
                            <p>
                              <em>
                                {dataType === 'auditorias' ? 'Todas las citas asignadas serán canceladas ¿Está seguro?' : '¿Seguro que desea eliminar este usuario?'}
                              </em>
                            </p>
                            <button 
                              style={{ backgroundColor: '#ce796b', color: 'black', marginRight: '0px', border: '0.2vw solid #ce796b', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }}
                              onClick={() => dataType === 'auditorias' ? handleDeleteAudit(item.id) : handleDeleteUser(item.id)}
                           >
                              Confirmar
                            </button>   
                            <button 
                              style={{ backgroundColor: '#f2f2f2', color: 'black', marginRight: '0.5vw', border: '0.2vw solid #f2f2f2', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }}
                              onClick={() => setDeleteConfirmations(prevState => ({ ...prevState, [item.id]: false }))}
                            >
                              Cancelar
                            </button>                         
                          </>
                          ) : (
                          <button 
                            style={{ backgroundColor: 'white', color: 'black', marginRight: '1vw', border: '0.2vw solid #ce796b', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }}
                            onClick={() => setDeleteConfirmations(prevState => ({ ...prevState, [item.id]: true }))}
                          >
                            Eliminar
                          </button>
                        )}
                        <button 
                          style={{ backgroundColor: '#d8f3dc', color: 'black', marginLeft: '0vw', border: '0.2vw solid #d8f3dc', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }} 
                          onClick={() => handleModifyItem(item)}
                          >
                          Modificar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
};

export default Ajustes;
