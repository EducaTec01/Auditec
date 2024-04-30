import React, { useState } from 'react';
import Sidebar from "../../components/sidebarAuditado/SidebarAuditado";
import Navbar from "../../components/navbar/Navbar";
import "./Vigencias.scss"; // Importamos los estilos si es necesario

const VigenciasComponent = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [respuestas, setRespuestas] = useState({});

    const preguntasITT_AC_PO_001 = [
        '¿Cuál es el objetivo principal del instructivo establecido para la elaboración y gestión de la autorización del Programa de Trabajo Anual (PTA) del Instituto Tecnológico de Tijuana (ITT)?',
        '¿A quién aplica este procedimiento según el alcance establecido?',
        '¿Qué consideraciones deben tenerse en cuenta durante la elaboración del PTA en relación con el Programa de Desarrollo Institucional (PDI) del Instituto Tecnológico y los lineamientos del Tecnológico Nacional de México (TecNM)?',
        '¿Cuál es el calendario establecido para la presentación del Programa de Trabajo Anual (PTA) según las normativas del TecNM?',
        '¿Quiénes son los responsables de gestionar, asesorar, analizar, integrar, dar seguimiento y evaluar el PTA dentro del Instituto Tecnológico de Tijuana (ITT), según lo establecido en las reglas de operación del procedimiento?',
        '¿Cuál es el papel específico de la Secretaría de Planeación, Evaluación y Desarrollo Institucional de TecNM, a través de la Dirección de Planeación y Evaluación, en relación con el seguimiento y autorización del Programa de Trabajo Anual (PTA) del Instituto Tecnológico de Tijuana (ITT), según lo establecido en los lineamientos?',
        '¿Qué responsabilidades tienen los directores de áreas del TecNM con respecto a la elaboración, seguimiento y evaluación de sus Programas Institucionales Anuales y cómo se relacionan estas responsabilidades con el Programa de Trabajo Anual del ITT?',
        '¿Dónde se lleva a cabo la captura, evaluación y seguimiento de las metas del PTA, según lo establecido en los lineamientos?',
        '¿Cómo se utiliza el PTA como referencia en la realización, análisis y evaluación del Programa Operativo Anual (POA) del Instituto Tecnológico de Tijuana, según lo establecido en los procedimientos?',
        '¿Cuál es la base fundamental para la elaboración del PTA, según los lineamientos, y cómo contribuye este análisis al desarrollo de programas, proyectos y acciones dentro de la institución?'
    ];
    
    const preguntasITT_AC_PO_002 = [
        '¿Cuál es el objetivo principal del instructivo establecido para la elaboración y gestión de la autorización del Programa Operativo Anual (POA) del Instituto Tecnológico de Tijuana (ITT)?',
        '¿A quién aplica este procedimiento según el alcance establecido?',
        '¿Qué normatividad debe seguirse durante la elaboración del POA según las reglas de operación establecidas?',
        '¿Cuál es el papel específico de la Secretaría de Planeación, Evaluación y Desarrollo Institucional, a través de la Dirección de Programación Presupuestal e Infraestructura Física del Tecnológico Nacional de México (TecNM), en relación con el seguimiento, revisión, retroalimentación y autorización del POA del ITT?',
        '¿Qué implicaciones tiene el ejercicio del presupuesto sin la autorización del POA de acuerdo con las reglas de operación establecidas?',
        '¿Cuál es la condición para ejercer la partida del Capítulo 1000 según lo establecido en las reglas de operación?',
        '¿Cuándo se debe llenar el formato del POA para el Desglose de Ingresos Propios Orientados al Mantenimiento Correctivo o Preventivo, y cuál es el monto mínimo establecido para requerir este desglose?',
        '¿Qué requisitos deben cumplirse para ejercer el Capítulo 5000 según las reglas de operación?',
        '¿Cuál es el período mínimo de uso del parque vehicular antes de su renovación, y bajo qué circunstancias podría renovarse antes?',
        '¿Cómo se llevará a cabo el proceso de validación para ciertas partidas relacionadas con tecnologías de información y comunicación, según lo establecido en los lineamientos?',
        '¿Cuál es la responsabilidad del Departamento de Recursos Financieros en relación con la información financiera del Gasto de Ingresos Propios y Gasto Directo, según lo establecido en las reglas de operación?',
        '¿Qué se debe hacer con el POA en caso de que haya ampliaciones, reducciones o reprogramaciones autorizadas por el TecNM?'
    ];
    
    const preguntasITT_AC_PO_003 = [
        '¿Qué tipos de informes se presentan como información de entrada para la Revisión por la Dirección según el procedimiento establecido?',
        '¿Qué formatos se utilizan para recopilar la retroalimentación del cliente y cuál es su objetivo dentro del proceso de revisión?',
        '¿Qué tipo de información se incluye para retroalimentar al Sistema de Gestión de la Calidad (SGC) proveniente de las partes interesadas?',
        '¿Qué aspectos se revisan en relación con el desempeño de los procesos y la conformidad del servicio durante la Revisión por la Dirección?',
        '¿Cuál es la importancia de revisar el estado de las Acciones Correctivas y Preventivas en el contexto de la Revisión por la Dirección?',
        '¿Qué se incluye en las acciones de seguimiento de revisiones anteriores efectuadas por la Dirección durante la Revisión por la Dirección?',
        '¿Por qué es relevante considerar los cambios que pueden afectar al SGC durante la Revisión por la Dirección?',
        '¿Cuál es el propósito de incluir recomendaciones para la mejora como parte de la información de entrada para la Revisión por la Dirección?'
    ];
    
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleRespuestaChange = (index, respuesta) => {
        setRespuestas({ ...respuestas, [index]: respuesta });
    };

    const renderQuestions = (preguntas) => {
        return preguntas.map((pregunta, index) => (
            <li key={index}>
                {pregunta}
                <input
                    type="text"
                    value={respuestas[index] || ''}
                    onChange={(e) => handleRespuestaChange(index, e.target.value)}
                />
            </li>
        ));
    };

    const handleFinishForm = () => {
        alert('¡Formulario terminado!');
    };

    return (
        <div className="vigencias-page">
            <Sidebar />
            <div className="vigencias-content">
                <Navbar />
                <h1>Formulario Actual </h1>
                <h1>Otras opciones: </h1>
                <div className="option-buttons">
                    <button className="blue-button" onClick={() => handleOptionSelect('ITT-AC-PO-001')}>ITT-AC-PO-001</button>
                    <button className="blue-button" onClick={() => handleOptionSelect('ITT-AC-PO-002')}>ITT-AC-PO-002</button>
                    <button className="blue-button" onClick={() => handleOptionSelect('ITT-AC-PO-003')}>ITT-AC-PO-003</button>
                </div>
                {selectedOption && (
                    <div className="question-list">
                        <h2>Preguntas:</h2>
                        <ul>
                            {selectedOption === 'ITT-AC-PO-001' && renderQuestions(preguntasITT_AC_PO_001)}
                            {selectedOption === 'ITT-AC-PO-002' && renderQuestions(preguntasITT_AC_PO_002)}
                            {selectedOption === 'ITT-AC-PO-003' && renderQuestions(preguntasITT_AC_PO_003)}
                        </ul>
                    </div>
                )}
                <button onClick={handleFinishForm}>Finalizar</button>
            </div>
        </div>
    );
};

export default VigenciasComponent;
