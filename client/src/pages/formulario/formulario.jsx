import React, { useState, useEffect } from 'react';
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";
import "./formulario.scss";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';

const Formulario = () => {
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

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3001/insertarRespuestas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_auditoria: id,
                    respuestas: respuestas
                })
            });
            if (!response.ok) {
                throw new Error('Error al guardar las respuestas');
            }
            alert('¡Respuestas guardadas exitosamente!');
        } catch (error) {
            console.error('Error al guardar las respuestas:', error);
            // Intentar actualizar
            handleUpdate();
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch('http://localhost:3001/modificarRespuestas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_auditoria: id,
                    respuestas: respuestas
                })
            });
            if (!response.ok) {
                throw new Error('Error al actualizar las respuestas');
            }
            alert('¡Respuestas actualizadas exitosamente!');
        } catch (error) {
            console.error('Error al actualizar las respuestas:', error);
            // Mostrar mensaje de error
            alert('Error al guardar o actualizar las respuestas');
        }
    };

    const handleButtonClick = () => {
        // Si hay respuestas guardadas, intentar actualizar, de lo contrario, guardar
        if (Object.keys(respuestas).length > 0) {
            handleUpdate();
        } else {
            handleSubmit();
        }
    };

    const handleRespuestaChange = (id_pregunta, respuesta) => {
        setRespuestas({ ...respuestas, [id_pregunta]: respuesta });
    };

    const renderQuestions = () => {
        return preguntas.map((pregunta) => (
            <li key={pregunta.id}>
                <strong>Sección:</strong> {pregunta.seccion_nombre}, <strong>Subsección:</strong> {pregunta.subseccion_nombre}<br />
                <span>{pregunta.pregunta}</span><br />
                <input
                    type="text"
                    value={respuestas[pregunta.id] || ''}
                    onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)}
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
                <button onClick={handleButtonClick}>Guardar/Actualizar</button>
            </div>
        </div>
    );
};

export default Formulario;
