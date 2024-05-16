import React, { useState, useEffect } from 'react';
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";
import "./formulario.scss";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';

const FormularioJefa = () => {
    const { id } = useParams();
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
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
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPreguntas();
    }, [id]);

    const renderQuestions = () => {
        return preguntas.map((pregunta) => (
            <li key={pregunta.id}>
                <strong>Sección:</strong> {pregunta.seccion_nombre}, <strong>Subsección:</strong> {pregunta.subseccion_nombre}<br />
                <span>{pregunta.pregunta}</span><br />
                <input
                    type="text"
                    value={respuestas[pregunta.id] || ''}
                    disabled={true} // Deshabilita la edición de la respuesta
                />
            </li>
        ));
    };

    return (
        <div className="vigencias-page">
            <SidebarAuditor />
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
