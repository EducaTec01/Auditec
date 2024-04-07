import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebarAuditado/Sidebar";
import './InconformidadesID.scss';

const InconformidadesGComponent = () => {
    const [preguntasVinculacion, setPreguntasVinculacion] = useState([]);
    const [preguntasAcademicos, setPreguntasAcademicos] = useState([]);
    const [preguntasAdministrativos, setPreguntasAdministrativos] = useState([]);
    const [preguntasPlaneacion, setPreguntasPlaneacion] = useState([]);
    const [showTables, setShowTables] = useState(false);

    useEffect(() => {
        const currentMonth = new Date().getMonth() + 1; 
        const periodoActual = currentMonth <= 6 ? 'enero-jun' : 'jul-dic';
        const periodoAnterior = periodoActual === 'enero-jun' ? 'jul-dic' : 'enero-jun';

        Promise.all([
            fetchData('Vinculacion', periodoAnterior),
            fetchData('Academicos', periodoAnterior),
            fetchData('Administrativos', periodoAnterior),
            fetchData('Planeacion', periodoAnterior)
        ]).then(data => {
            setPreguntasVinculacion(data[0]);
            setPreguntasAcademicos(data[1]);
            setPreguntasAdministrativos(data[2]);
            setPreguntasPlaneacion(data[3]);
            setShowTables(true);
        }).catch(error => console.error('Error al obtener datos de preguntas:', error));
    }, []);

    const fetchData = async (tipo, periodo) => {
        try {
            const response = await fetch(`http://localhost:3001/ipreguntas?tipo=${tipo}&periodo=${periodo}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="inconformidades-page">
            <Sidebar />
            <div className={`inconformidades-content ${showTables ? 'show' : ''}`}>
                <h1>Inconformidades#</h1>

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

export default InconformidadesGComponent;
