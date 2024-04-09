import React, { useState, useEffect } from 'react';
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";
import "./formulario.scss";
import { useParams } from 'react-router-dom';

const Formulario = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const [seccionActual, setSeccionActual] = useState('Vinculacion');
    
    const [respuestasTemporales, setRespuestasTemporales] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchPreguntas();
        fetchRespuestas(); // Solicitar respuestas al cargar el componente
    }, [id]);

    const fetchPreguntas = async () => {
        try {
            const response = await fetch('http://localhost:3001/formulario/preguntas');
            const data = await response.json();
            setPreguntas(data);
        } catch (error) {
            console.error('Error fetching preguntas:', error);
        }
    };

    const fetchRespuestas = async () => {
        try {
            const response = await fetch(`http://localhost:3001/formulario/${id}/respuestas`);
            const data = await response.json();
            setRespuestas(data);

            // Inicializar las respuestas temporales con las respuestas existentes
            const tempRespuestas = {};
            data.forEach(respuesta => {
                tempRespuestas[respuesta.id_pregunta] = respuesta.respuesta;
            });
            setRespuestasTemporales(tempRespuestas);
        } catch (error) {
            console.error('Error fetching respuestas:', error);
        }
    };

    // Filtrar las preguntas por sección actual
    const preguntasSeccionActual = preguntas.filter(pregunta => pregunta.seccion === seccionActual);

    const siguienteSeccion = async () => {
        // Filtrar las respuestas temporales por la sección actual
        const respuestasSeccionActual = Object.entries(respuestasTemporales)
            .filter(([idPregunta, respuesta]) => {
                const pregunta = preguntas.find(pregunta => pregunta.id === parseInt(idPregunta));
                return pregunta.seccion === seccionActual;
            });
    
        // Enviar las respuestas temporales de la sección actual antes de cambiar de sección
        await Promise.all(respuestasSeccionActual.map(async ([idPregunta, respuesta]) => {
            await enviarRespuesta(idPregunta, respuesta);
        }));
    
        // Determinar la siguiente sección
        switch (seccionActual) {
            case 'Vinculacion':
                setSeccionActual('Academicos');
                break;
            case 'Academicos':
                setSeccionActual('Administrativos');
                break;
            case 'Administrativos':
                setSeccionActual('Planeacion');
                break;
            case 'Planeacion':
                setSeccionActual('Calidad');
                break;
            default:
                break;
        }
        window.scrollTo(0, 0);
    };
    
    const anteriorSeccion = async () => {
        // Filtrar las respuestas temporales por la sección actual
        const respuestasSeccionActual = Object.entries(respuestasTemporales)
            .filter(([idPregunta, respuesta]) => {
                const pregunta = preguntas.find(pregunta => pregunta.id === parseInt(idPregunta));
                return pregunta.seccion === seccionActual;
            });
    
        // Enviar las respuestas temporales de la sección actual antes de cambiar de sección
        await Promise.all(respuestasSeccionActual.map(async ([idPregunta, respuesta]) => {
            await enviarRespuesta(idPregunta, respuesta);
        }));
    
        // Determinar la sección anterior
        switch (seccionActual) {
            case 'Academicos':
                setSeccionActual('Vinculacion');
                break;
            case 'Administrativos':
                setSeccionActual('Academicos');
                break;
            case 'Planeacion':
                setSeccionActual('Administrativos');
                break;
            case 'Calidad':
                setSeccionActual('Planeacion');
                break;
            default:
                break;
        }
        window.scrollTo(0, 0);
    };
    
    
    const enviarRespuesta = async (idPregunta, respuesta) => {
        try {
            console.log(idPregunta + respuesta);
            await fetch(`http://localhost:3001/formulario/${id}/respuestasUpdate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_pregunta: idPregunta, respuesta })
            });
        } catch (error) {
            console.error('Error al enviar la respuesta:', error);
        }
    };

    const handleRespuestaChange = (idPregunta, value) => {
        setRespuestasTemporales({
            ...respuestasTemporales,
            [idPregunta]: value
        });
    };

    return (
        <div className="section1">
            <SidebarAuditor />
            <div className="section2">
                <div className="encabezado">
                    <div className="titulo">
                        <p>Asignaciones / Asignación #{id}</p>
                    </div>
                </div>
                <div className="formulario-body">
                    <div className="pasos">
                        <div className={`paso ${seccionActual === 'Vinculacion' ? 'active' : ''}`}>
                            <div className="numero">
                                <p>1</p>
                            </div>
                            <div className="descripcion">
                                <p>Vinculación</p>
                            </div>
                        </div>
                        <div className={`paso ${seccionActual === 'Academicos' ? 'active' : ''}`}>
                            <div className="numero">
                                <p>2</p>
                            </div>
                            <div className="descripcion">
                                <p>Académicos</p>
                            </div>
                        </div>
                        <div className={`paso ${seccionActual === 'Administrativos' ? 'active' : ''}`}>
                            <div className="numero">
                                <p>3</p>
                            </div>
                            <div className="descripcion">
                                <p>Administrativos</p>
                            </div>
                        </div>
                        <div className={`paso ${seccionActual === 'Planeacion' ? 'active' : ''}`}>
                            <div className="numero">
                                <p>4</p>
                            </div>
                            <div className="descripcion">
                                <p>Planeación</p>
                            </div>
                        </div>
                        <div className={`paso ${seccionActual === 'Calidad' ? 'active' : ''}`}>
                            <div className="numero">
                                <p>5</p>
                            </div>
                            <div className="descripcion">
                                <p>Calidad</p>
                            </div>
                        </div>
                    </div>
                    <div className="preguntas-body">
                        <div className="row-1">
                            {preguntasSeccionActual.map((pregunta, index) => {
                                return (
                                    <div className="pregunta" key={index}>
                                        <p>{index + 1}. {pregunta.pregunta}</p>
                                        <div className="pregunta-contenedor">
                                            <input
                                                type="text"
                                                value={respuestasTemporales[pregunta.id] || ''}
                                                onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)}
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="botones-body">
                        <div className="botones">
                            <div className="boton-1">
                                <button onClick={anteriorSeccion}>
                                    <p>Anterior</p>
                                </button>
                            </div>
                            <div className="boton-2">
                                <button onClick={siguienteSeccion}>
                                    <p>Siguiente</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Formulario;
