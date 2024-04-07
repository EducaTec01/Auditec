import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebarAuditado/Sidebar";
import "./RHistorialID.scss";

const HistorialGComponent = () => {
    const [preguntasVinculacion, setPreguntasVinculacion] = useState([]);
    const [preguntasAcademicos, setPreguntasAcademicos] = useState([]);
    const [preguntasAdministrativos, setPreguntasAdministrativos] = useState([]);
    const [preguntasPlaneacion, setPreguntasPlaneacion] = useState([]);
    const [showTables, setShowTables] = useState(false);

    useEffect(() => {
        // Realizar las llamadas al servidor al montar el componente
        Promise.all([
            fetch('http://localhost:3001/preguntas?tipo=Vinculacion').then(response => response.json()),
            fetch('http://localhost:3001/preguntas?tipo=Academicos').then(response => response.json()),
            fetch('http://localhost:3001/preguntas?tipo=Administrativos').then(response => response.json()),
            fetch('http://localhost:3001/preguntas?tipo=Planeacion').then(response => response.json())
        ])
        .then(([vinculacionData, academicosData, administrativosData, planeacionData]) => {
            // Actualizar el estado con los datos obtenidos
            setPreguntasVinculacion(vinculacionData);
            setPreguntasAcademicos(academicosData);
            setPreguntasAdministrativos(administrativosData);
            setPreguntasPlaneacion(planeacionData);
            // Mostrar las tablas después de obtener los datos
            setShowTables(true);
        })
        .catch(error => console.error('Error al obtener datos de preguntas:', error));
    }, []);

    return (
        <div className="historial-page">
            <Sidebar />
            <div className={`historial-content ${showTables ? 'show' : ''}`}>
                <h1>Historial#</h1>

                {/* Tabla Vinculacion */}
                <div className="tabla-container">
                    <table border="1">
                        <caption>Vinculacion</caption>
                        <tr>
                            <th>Pregunta</th>
                            <th>Respuesta</th>
                        </tr>
                        {preguntasVinculacion.map((pregunta, index) => (
                            <tr key={index}>
                                <td>{pregunta.pregunta}</td>
                                <td>{pregunta.respuesta}</td>
                            </tr>
                        ))}
                    </table>
                </div>

                {/* Tabla Academicos */}
                <div className="tabla-container">
                    <table border="1">
                        <caption>Academicos</caption>
                        <tr>
                            <th>Pregunta</th>
                            <th>Respuesta</th>
                        </tr>
                        {preguntasAcademicos.map((pregunta, index) => (
                            <tr key={index}>
                                <td>{pregunta.pregunta}</td>
                                <td>{pregunta.respuesta}</td>
                            </tr>
                        ))}
                    </table>
                </div>

                {/* Tabla Administrativos */}
                <div className="tabla-container">
                    <table border="1">
                        <caption>Administrativos</caption>
                        <tr>
                            <th>Pregunta</th>
                            <th>Respuesta</th>
                        </tr>
                        {preguntasAdministrativos.map((pregunta, index) => (
                            <tr key={index}>
                                <td>{pregunta.pregunta}</td>
                                <td>{pregunta.respuesta}</td>
                            </tr>
                        ))}
                    </table>
                </div>

                {/* Tabla Planeacion */}
                <div className="tabla-container">
                    <table border="1">
                        <caption>Planeacion</caption>
                        <tr>
                            <th>Pregunta</th>
                            <th>Respuesta</th>
                        </tr>
                        {preguntasPlaneacion.map((pregunta, index) => (
                            <tr key={index}>
                                <td>{pregunta.pregunta}</td>
                                <td>{pregunta.respuesta}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HistorialGComponent;
