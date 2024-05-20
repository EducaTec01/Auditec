import React, { useState, useEffect } from 'react';
import SidebarAuditado from "../../components/sidebarAuditado/SidebarAuditado";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';

const AuditadoinconformidadJefa = () => {
    const { id } = useParams();
    const [preguntas, setPreguntas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [respuestasInconformidad, setRespuestasInconformidad] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/preguntasConInconformidad`);
                if (!response.ok) {
                    throw new Error('Error al obtener las preguntas con inconformidades');
                }
                const data = await response.json();
                setPreguntas(data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchRespuestasInconformidad = async () => {
            try {
                const promises = preguntas.map(async (pregunta) => {
                    const response = await fetch(`http://localhost:3001/getRespuestaInconformidad/${pregunta.id}/${id}`);
                    if (!response.ok) {
                        throw new Error(`Error al obtener la respuesta de inconformidad para la pregunta ${pregunta.id}`);
                    }
                    const data = await response.json();
                    return { preguntaId: pregunta.id, respuesta: data.respuesta || '' };
                });

                const respuestas = await Promise.all(promises);
                const respuestasObject = respuestas.reduce((acc, curr) => {
                    acc[curr.preguntaId] = curr.respuesta;
                    return acc;
                }, {});

                setRespuestasInconformidad(respuestasObject);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRespuestasInconformidad();
    }, [preguntas, id]);

    return (
        <div className="vigencias-page">
            <SidebarAuditado />
            <div className="vigencias-content">
                <Navbar />
                <h1>Inconformidades</h1>
                <div className="question-list">
                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        <ul>
                            {preguntas.map((pregunta) => (
                                <li key={pregunta.id}>
                                    <strong>{pregunta.seccion_nombre}</strong>, <strong>{pregunta.subseccion_nombre}</strong><br />
                                    <span>{pregunta.pregunta}</span><br />
                                    <textarea
                                        value={respuestasInconformidad[pregunta.id] || ''}
                                        readOnly
                                        placeholder="Escribe la respuesta de inconformidad"
                                        rows={10}
                                        style={{ resize: 'none', width: '100%' }}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuditadoinconformidadJefa;
