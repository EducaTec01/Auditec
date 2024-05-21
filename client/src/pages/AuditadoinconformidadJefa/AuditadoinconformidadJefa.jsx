import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';

const AuditadoinconformidadJefa = () => {
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
        return preguntas.map((pregunta) => (
            <li key={pregunta.id}>
                <strong>Sección:</strong> {pregunta.seccion_nombre}, <strong>Subsección:</strong> {pregunta.subseccion_nombre}<br />
                <span>{pregunta.pregunta}</span><br />
                <span><strong>Respuesta:</strong> {pregunta.respuesta || 'No respondida'}</span><br />
                <span><strong>Genera inconformidad:</strong> {pregunta.genera_inconformidad ? 'Sí' : 'No'}</span>
            </li>
        ));
    };

    return (
        <div className="vigencias-page">
            <Sidebar />
            <div className="vigencias-content">
                <Navbar />
                <h1>Formulario - Vista</h1>
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



export default AuditadoinconformidadJefa;
