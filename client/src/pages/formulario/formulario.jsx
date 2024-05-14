import React, { useState, useEffect } from 'react';
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";
import "./formulario.scss";
import Navbar from "../../components/navbar/Navbar";

import { useParams } from 'react-router-dom';

const Formulario = () => {
    const { id } = useParams();
    const [preguntas, setPreguntas] = useState([]);

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
    }, [id]);

    // Función para verificar si la sección y la subsección son iguales
    const isSameSectionAndSubsection = (pregunta, index) => {
        if (index === 0) {
            return false; // La primera pregunta siempre se mostrará
        }
        const previousPregunta = preguntas[index - 1];
        return (
            pregunta.seccion_nombre === previousPregunta.seccion_nombre &&
            pregunta.subseccion_nombre === previousPregunta.subseccion_nombre
        );
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
                        {preguntas.map((pregunta, index) => (
                            <li key={index}>
                                {/* Verificar si la sección y la subsección son iguales */}
                                {!isSameSectionAndSubsection(pregunta, index) && (
                                    <div>
                                        <p><strong>Sección:</strong> {pregunta.seccion_nombre}</p>
                                        <p><strong>Subsección:</strong> {pregunta.subseccion_nombre}</p>
                                    </div>
                                )}
                                <p>{pregunta.pregunta}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Formulario;
