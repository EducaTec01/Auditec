import React, { useState, useEffect } from 'react';
import SidebarAuditado from "../../components/sidebarAuditado/SidebarAuditado";
import "./formulario.scss";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';

const Auditadoinconformidad = () => {
    const { id } = useParams();
    const [preguntas, setPreguntas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await fetch(`http://localhost:3001/preguntasByAuditoria/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las preguntas');
                }
                const data = await response.json();
                // Filtrar las preguntas donde genera_inconformidad es true
                const preguntasFiltradas = data.filter(pregunta => pregunta.genera_inconformidad);
                setPreguntas(preguntasFiltradas);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPreguntas();
    }, [id]);

    const renderQuestions = () => {
        const groupedQuestions = {};

        preguntas.forEach(pregunta => {
            const key = `${pregunta.seccion_nombre}-${pregunta.subseccion_nombre}`;
            if (!groupedQuestions[key]) {
                groupedQuestions[key] = [];
            }
            groupedQuestions[key].push(pregunta);
        });

        return Object.entries(groupedQuestions).map(([key, preguntasGroup]) => (
            <div key={key}>
                <h3>{`Sección: ${preguntasGroup[0].seccion_nombre}, Subsección: ${preguntasGroup[0].subseccion_nombre}`}</h3>
                <ul>
                    {preguntasGroup.map(pregunta => (
                        <li key={pregunta.id}>
                            <span>{pregunta.pregunta}</span><br />
                            <span><strong>Respuesta:</strong> {pregunta.respuesta || 'No respondida'}</span><br />
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <div className="vigencias-page">
            <SidebarAuditado />
            <div className="vigencias-content">
                <Navbar />
                <h1>Inconformidades del Formulario</h1>
                <div className="question-list">
                    <h2>Preguntas que generan inconformidad:</h2>
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

export default Auditadoinconformidad;
