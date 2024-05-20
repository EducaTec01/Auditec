import React, { useState, useEffect } from 'react';
import SidebarAuditado from "../../components/sidebarAuditado/SidebarAuditado";
import "./formulario.scss";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';

const Auditadoinconformidad = () => {
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

    const handleGuardarRespuesta = async (idPregunta) => {
        try {
            const response = await fetch('http://localhost:3001/respuestaInconformidad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_pregunta: idPregunta,
                    id_auditoria: id,
                    respuesta: respuestasInconformidad[idPregunta] || ''
                })
            });
            if (!response.ok) {
                throw new Error('Error al guardar la respuesta de inconformidad');
            }
            alert('La respuesta de inconformidad se ha guardado correctamente');
            // Limpiar el cuadro de texto después de guardar la respuesta
            setRespuestasInconformidad({ ...respuestasInconformidad, [idPregunta]: '' });
        } catch (error) {
            console.error('Error:', error);
            try {
                const response = await fetch('http://localhost:3001/respuestaInconformidad/actualizar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_pregunta: idPregunta,
                        id_auditoria: id,
                        respuesta: respuestasInconformidad[idPregunta] || ''
                    })
                });
                if (!response.ok) {
                    throw new Error('Error al actualizar la respuesta de inconformidad');
                }
                alert('La respuesta de inconformidad se ha actualizado correctamente');
            } catch (error) {
                console.error('Error:', error);
                alert('Error al guardar o actualizar la respuesta de inconformidad');
            }
        }
    };

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
        <strong></strong> {pregunta.seccion_nombre}, <strong></strong> {pregunta.subseccion_nombre}<br />
        <span>{pregunta.pregunta}</span><br />
        <textarea
            value={respuestasInconformidad[pregunta.id] || ''}
            onChange={(e) => setRespuestasInconformidad({ ...respuestasInconformidad, [pregunta.id]: e.target.value })}
            placeholder="Escribe la respuesta de inconformidad"
            rows={10} 
            cols={250} 
        />
        <button onClick={() => handleGuardarRespuesta(pregunta.id)}>Guardar respuesta de inconformidad</button>
    </li>
))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auditadoinconformidad;
