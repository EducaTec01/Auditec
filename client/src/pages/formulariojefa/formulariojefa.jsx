import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import "./formulario.scss";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';

const FormularioJefa = () => {
    const { id } = useParams();
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [evidenciasExistentes, setEvidenciasExistentes] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await fetch(`http://localhost:3001/preguntasByAuditoria/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las preguntas');
                }
                const data = await response.json();
                setPreguntas(data);
                const initialRespuestas = data.reduce((acc, pregunta) => {
                    acc[pregunta.id] = pregunta.respuesta || '';
                    return acc;
                }, {});
                setRespuestas(initialRespuestas);
                setLoading(false);

                // Verificar la existencia de evidencias
                data.forEach(pregunta => {
                    checkEvidenciaExistence(pregunta.id);
                });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPreguntas();
    }, [id]);

    const checkEvidenciaExistence = async (id_pregunta) => {
        try {
            const response = await fetch(`http://localhost:3001/checkEvidenciaExistence/${id_pregunta}/${id}`);
            if (!response.ok) {
                throw new Error('Error al verificar la existencia de la evidencia');
            }
            const data = await response.json();
            setEvidenciasExistentes(prevState => ({ ...prevState, [id_pregunta]: data.exists }));
        } catch (error) {
            console.error('Error al verificar la existencia de la evidencia:', error);
        }
    };

    const handleDownload = async (id_pregunta) => {
        const url = `http://localhost:3001/downloadEvidencia/${id_pregunta}/${id}`;
        window.open(url, '_blank');
    };

    const renderQuestions = () => {
        // Objeto para almacenar las preguntas agrupadas por sección y subsección
        const groupedQuestions = {};
    
        // Agrupar preguntas por sección y subsección
        preguntas.forEach((pregunta) => {
            const key = `${pregunta.seccion_nombre}-${pregunta.subseccion_nombre}`;
            if (!groupedQuestions[key]) {
                groupedQuestions[key] = [pregunta];
            } else {
                groupedQuestions[key].push(pregunta);
            }
        });
    
        // Renderizar preguntas agrupadas
        return Object.entries(groupedQuestions).map(([key, preguntasGroup]) => (
            <div key={key}>
                <strong>Sección:</strong> {preguntasGroup[0].seccion_nombre}, <strong>Subsección:</strong> {preguntasGroup[0].subseccion_nombre}<br />
                {preguntasGroup.map((pregunta) => (
                    <li key={pregunta.id}>
                        <span>{pregunta.pregunta}</span><br />
                        <input
                            type="text"
                            value={respuestas[pregunta.id] || ''}
                            disabled={true} // Deshabilita la edición de la respuesta
                        />
                        {evidenciasExistentes[pregunta.id] && (
                            <button onClick={() => handleDownload(pregunta.id)}>
                                Descargar evidencia
                            </button>
                        )}
                    </li>
                ))}
            </div>
        ));
    };
    

    return (
        <div className="vigencias-page">
            <Sidebar />
            <div className="vigencias-content">
                <Navbar />
                <h1>Formulario</h1>
                <div className="question-list">
                    <h2>Preguntas:</h2>
                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        <ul>{renderQuestions()}</ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormularioJefa;
