import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";
import Navbar from "../../components/navbar/Navbar";
import "./Vigencias.scss";

const VigenciasComponent = () => {
    const { id } = useParams(); // Obtén la ID de la auditoría desde los parámetros de la ruta
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await fetch(`http://localhost:3001/preguntasByAuditoria/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las preguntas');
                }
                const data = await response.json();
                setPreguntas(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPreguntas();
    }, [id]); // Ejecuta el efecto cuando cambie la ID de la auditoría

    const handleRespuestaChange = (index, respuesta) => {
        setRespuestas({ ...respuestas, [index]: respuesta });
    };

    const renderQuestions = () => {
        return preguntas.map((pregunta, index) => (
            <li key={index}>
                {pregunta.pregunta}
                <input
                    type="text"
                    value={respuestas[index] || ''}
                    onChange={(e) => handleRespuestaChange(index, e.target.value)}
                />
            </li>
        ));
    };

    const handleFinishForm = () => {
        alert('¡Formulario terminado!');
    };

    return (
        <div className="vigencias-page">
            <SidebarAuditor />
            <div className="vigencias-content">
                <Navbar />
                <h1>Formulario</h1>
                <div className="question-list">
                    <h2>Preguntas:</h2>
                    <ul>
                        {renderQuestions()}
                    </ul>
                </div>
                <button onClick={handleFinishForm}>Finalizar</button>
            </div>
        </div>
    );
};

export default VigenciasComponent;
