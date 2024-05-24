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
    const [loading, setLoading] = useState(true);
    const [pdfFiles, setPdfFiles] = useState({});
    
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
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPreguntas();
    }, [id]);

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

    const handleSaveEvidencias = async () => {
        try {
            // Verificar si hay al menos un archivo seleccionado
            const filesUploaded = Object.values(pdfFiles).some(file => file !== null);
            if (!filesUploaded) {
                alert('No se han seleccionado evidencias para subir.');
                return;
            }
    
            const formData = new FormData();
            formData.append('id_auditoria', id);
            
            // Agregar lógica para agregar las evidencias al FormData
            Object.keys(pdfFiles).forEach(key => {
                const file = pdfFiles[key];
                if (file !== null) {
                    formData.append(`file_${key}`, file);
                }
            });
    
            const response = await fetch('http://localhost:3001/insertEvidencias', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Error al guardar las evidencias');
            }
            alert('¡Evidencias guardadas exitosamente!');
        } catch (error) {
            console.error('Error al guardar las evidencias:', error);
            alert('Error al guardar las evidencias');
        }
    };
    

    const handleButtonClick = () => {
        handleSubmit();
    };

    const handleRespuestaChange = (id_pregunta, respuesta) => {
        setRespuestas({ ...respuestas, [id_pregunta]: respuesta });
    };

    const handleInconformidadChange = (id_pregunta, value) => {
        setGeneraInconformidad({ ...generaInconformidad, [id_pregunta]: value });
    };

    const handleFileUpload = (id_pregunta, file) => {
        // Aquí puedes manejar la carga del archivo
        console.log("Subir archivo para la pregunta:", id_pregunta);
        console.log("Archivo seleccionado:", file);
    };

    const renderQuestions = () => {
        // Creamos un objeto para agrupar las preguntas por sección y subsección
        const groupedQuestions = {};

        // Agrupamos las preguntas por sección y subsección
        preguntas.forEach(pregunta => {
            const key = `${pregunta.seccion_nombre}-${pregunta.subseccion_nombre}`;
            if (!groupedQuestions[key]) {
                groupedQuestions[key] = [];
            }
            groupedQuestions[key].push(pregunta);
        });

        // Renderizamos las preguntas agrupadas
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
                            <input type="file" onChange={(e) => handleFileUpload(pregunta.id, e.target.files[0])} />
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
                <button onClick={handleButtonClick}>Guardar Respuestas</button>
                <button onClick={handleSaveEvidencias}>Guardar Evidencias</button>
            </div>
        </div>
    );
};

export default Formulario;
