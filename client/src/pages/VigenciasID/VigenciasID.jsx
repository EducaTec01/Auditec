import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebarAuditado/Sidebar";
import './VigenciasID.scss';

const VigenciasGComponent = () => {
  // Definimos un estado para almacenar las preguntas por tipo
  const [preguntasPorTipo, setPreguntasPorTipo] = useState({
    Vinculacion: [],
    Academicos: [],
    Administrativos: [],
    Planeacion: []
  });
  const [showTable, setShowTable] = useState(false);

  // Función para determinar el semestre actual
  const obtenerSemestreActual = () => {
    const currentMonth = new Date().getMonth() + 1;
    return currentMonth <= 6 ? 'enero-jun' : 'jul-dic';
  };

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        // Hacemos las solicitudes para obtener las preguntas por tipo y semestre actual
        const tipos = ['Vinculacion', 'Academicos', 'Administrativos', 'Planeacion'];
        const semestreActual = obtenerSemestreActual();
        const preguntasPromesas = tipos.map(async tipo => {
          const response = await fetch(`http://localhost:3001/ppreguntas?tipo=${tipo}&periodo=${semestreActual}`);
          const data = await response.json();
          return data;
        });

        // Esperamos a que todas las solicitudes se completen y actualizamos el estado
        const preguntas = await Promise.all(preguntasPromesas);
        const preguntasPorTipoActualizadas = tipos.reduce((acc, tipo, index) => {
          acc[tipo] = preguntas[index];
          return acc;
        }, {});
        setPreguntasPorTipo(preguntasPorTipoActualizadas);
        setShowTable(true);
      } catch (error) {
        console.error('Error al obtener datos de preguntas:', error);
      }
    };

    obtenerPreguntas();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className="vigencias-page">
      <Sidebar />
      <div className={`vigencias-content ${showTable ? 'show' : ''}`}>
        <h1>Vigencias#</h1>

        {Object.entries(preguntasPorTipo).map(([tipo, preguntas]) => (
          <div key={tipo} className="tabla-container">
            <table border="1">
              <caption>{tipo}</caption>
              <tr>
                <th>Pregunta</th>
                <th>Respuesta</th>
              </tr>
              {preguntas.map((pregunta, index) => (
                <tr key={index}>
                  <td>{pregunta.pregunta}</td>
                  <td>{pregunta.respuesta}</td>
                </tr>
              ))}
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VigenciasGComponent;
