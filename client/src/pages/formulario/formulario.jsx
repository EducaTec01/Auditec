import "./formulario.scss";import React, { useState, useEffect } from 'react';
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";

const Formulario = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [seccionActual, setSeccionActual] = useState('Vinculacion');

    useEffect(() => {
        fetchPreguntas();
    }, []);

    const fetchPreguntas = async () => {
        try {
            const response = await fetch('http://localhost:3001/formulario/preguntas');
            const data = await response.json();
            setPreguntas(data);
        } catch (error) {
            console.error('Error fetching preguntas:', error);
        }
    };

    // Filtrar las preguntas por sección actual
    const preguntasSeccionActual = preguntas.filter(pregunta => pregunta.seccion === seccionActual);

    const siguienteSeccion = () => {
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

    const anteriorSeccion = () => {
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

    return (
        <div className="section1">
            <SidebarAuditor />
            <div className="section2">
                <div className="encabezado">
                    <div className="titulo">
                        <p>Asignaciones / Asignacion #1</p>
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
                            {preguntasSeccionActual.map((pregunta, index) => (
                                <div className="pregunta" key={index}>
                                    <p>{index + 1}. {pregunta.pregunta}</p>
                                    <div className="pregunta-contenedor">
                                        <input
                                            type="text"
                                            value={pregunta.respuesta || ''}
                                            onChange={(event) => {
                                                const newPreguntas = [...preguntas];
                                                newPreguntas[index].respuesta = event.target.value;
                                                setPreguntas(newPreguntas);
                                            }}
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                            ))}
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
