import React, { useState, useEffect } from 'react';
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";
import "./formulario.scss";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';

const Formulario = () => {
    const { id } = useParams();
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [generaInconformidad, setGeneraInconformidad] = useState({});
    const [evidencias, setEvidencias] = useState({});
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
                const initialGeneraInconformidad = data.reduce((acc, pregunta) => {
                    acc[pregunta.id] = pregunta.genera_inconformidad || false;
                    return acc;
                }, {});
                setRespuestas(initialRespuestas);
                setGeneraInconformidad(initialGeneraInconformidad);
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

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3001/insertRespuestas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_auditoria: id,
                    respuestas: respuestas,
                    genera_inconformidad: generaInconformidad
                })
            });
            if (!response.ok) {
                throw new Error('Error al guardar las respuestas');
            }
            alert('¡Respuestas guardadas exitosamente!');
        } catch (error) {
            console.error('Error al guardar las respuestas:', error);
            alert('Error al guardar las respuestas');
        }
    };

    const handleUpload = async (id_pregunta, file) => {
        const formData = new FormData();
        formData.append('id_pregunta', id_pregunta);
        formData.append('id_auditoria', id);
        formData.append('evidencia', file);

        try {
            const response = await fetch('http://localhost:3001/uploadEvidencia', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Error al subir la evidencia');
            }
            alert('¡Evidencia subida exitosamente!');
            checkEvidenciaExistence(id_pregunta);
        } catch (error) {
            console.error('Error al subir la evidencia:', error);
            alert('Error al subir la evidencia');
        }
    };

    const handleDownload = async (id_pregunta) => {
        const url = `http://localhost:3001/downloadEvidencia/${id_pregunta}/${id}`;
        window.open(url, '_blank');
    };

    const handleRespuestaChange = (id_pregunta, respuesta) => {
        setRespuestas({ ...respuestas, [id_pregunta]: respuesta });
    };

    const handleInconformidadChange = (id_pregunta, value) => {
        setGeneraInconformidad({ ...generaInconformidad, [id_pregunta]: value });
    };

    const handleEvidenciaChange = (id_pregunta, file) => {
        setEvidencias({ ...evidencias, [id_pregunta]: file });
    };

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
                            <input
                                type="text"
                                value={respuestas[pregunta.id] || ''}
                                onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)}
                            />
                            <br />
                            <label>
                                Genera inconformidad:
                                <input
                                    type="checkbox"
                                    checked={generaInconformidad[pregunta.id] || false}
                                    onChange={(e) => handleInconformidadChange(pregunta.id, e.target.checked)}
                                />
                            </label>
                            <br />
                            <label>
                                Subir evidencia:
                                <input
                                type="file"
                                onChange={(e) => handleEvidenciaChange(pregunta.id, e.target.files[0])}
                                />
                                {evidencias[pregunta.id] && ( // Verificar si hay un archivo seleccionado
                                <button onClick={() => handleUpload(pregunta.id, evidencias[pregunta.id])}>
                                 Subir PDF
                                </button>
                                )}
                                </label>

                                {evidenciasExistentes[pregunta.id] && (
                                <button onClick={() => handleDownload(pregunta.id)}>
                                    Descargar evidencia
                                </button>
                            )}
                            <br />
                            
                        </li>
                    ))}
                </ul>
            </div>
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
                <button onClick={handleSubmit}>Guardar Respuestas</button>
                
            </div>
        </div>
    );
};

export default Formulario;

