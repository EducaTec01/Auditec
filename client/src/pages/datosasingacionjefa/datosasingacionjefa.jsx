import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./asignacion.scss";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import GeneratePDF from '../../components/GeneratePDF/GeneratePDF';

const DatosAsignacionJefa = () => {
  const { id } = useParams();
  const [asignacion, setAsignacion] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAsignacion(id);
  }, [id]);

  const fetchAsignacion = (id) => {
    fetch(`http://localhost:3001/asignacion/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la asignación");
        }
        return response.json();
      })
      .then((data) => {
        setAsignacion(data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setError(error.message);
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderEstadoColor = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return 'red';
      case 'Completado':
        return 'green';
      case 'Iniciado':
        return 'gray';
      default:
        return 'black';
    }
  };

  const handleTerminarAuditoria = () => {
    fetch(`http://localhost:3001/terminarAuditoria/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al terminar la auditoría');
      }
      return response.json();
    })
    .then(data => {
      // Actualizar la vista si la actualización fue exitosa
      fetchAsignacion(id);
    })
    .catch(error => {
      console.error('Error:', error);
      setError(error.message);
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <body>
      <div className="section1">
        <Sidebar />
        <div className="section2">
          <Navbar />
          <div className="encabezado">
            <div className="titulo">
              <p>Asignación #{asignacion.id_auditoria}</p>
            </div>
            <div className="info">
              <p style={{ color: renderEstadoColor(asignacion.estado) }}>Estado: {asignacion.estado}</p>
              <p>Fecha límite: {formatDate(asignacion.fecha_final)}</p>
            </div>
          </div>
          <div className="cuerpo">
            <div className="left">
              <div className="detalles">
                <div className="detalle">
                  <p>Sección: {asignacion.nombre_seccion}</p>
                </div>
                <div className="detalle">
                  <p>Departamento: {asignacion.nombre_departamento}</p>
                </div>
                <div className="detalle">
                  <p>Auditor: {asignacion.nombre_auditor}</p>
                </div>
                <div className="detalle">
                  <p>Encargado: {asignacion.nombre_auditado}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="report">
            <Link to={`/asignacionjefa/${asignacion.id_auditoria}/formulariojefa`} className="button">Ver Respuestas</Link>
          </div>
          <div className="report">
            <Link to={`/AuditadoinconformidadJefa/${asignacion.id_auditoria}`} className="button">Ver Inconformidades</Link>
          </div>
          <div className="report">
            <GeneratePDF/>
          </div>
          <div className="report">
            <button onClick={handleTerminarAuditoria} className="button">Terminar auditoría</button>
          </div>
        </div>
      </div>
    </body>
  );  
};

export default DatosAsignacionJefa;
