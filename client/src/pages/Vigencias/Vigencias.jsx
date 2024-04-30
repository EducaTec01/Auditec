import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebarAuditado/SidebarAuditado";
import "./Vigencias.scss";
import Navbar from "../../components/navbar/Navbar";

const VigenciasComponent = () => {
    const [historial, setHistorial] = useState([]);
    const [showTable, setShowTable] = useState(false);

<<<<<<< Updated upstream
    useEffect(() => {
        
        fetch('http://localhost:3001/vigencias')
            .then(response => response.json())
            .then(data => {
                
                const historialFormateado = data.map(item => ({
                    ...item,
                    fecha_subida: new Date(item.fecha_subida).toLocaleDateString('es-MX'),
                   
                }));
=======
    const preguntasITT_AC_PO_001 = [
        '¿Cuál es el objetivo principal del instructivo establecido para la elaboración y gestión de la autorización del Programa de Trabajo Anual (PTA) del Instituto Tecnológico de Tijuana (ITT)?',
        '¿A quién aplica este procedimiento según el alcance establecido?'
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
>>>>>>> Stashed changes

               
                setHistorial(historialFormateado);
                setShowTable(true);
            })
            .catch(error => console.error('Error al obtener datos de historial:', error));
    }, []); 

    return (
        <div className="vigencias-page">
            <Sidebar />
            <div className='nav'>
                <Navbar/>
                <div className={`vigencias-content ${showTable ? 'show' : ''}`}>
                    <h1>Vigencias</h1>

                    <table border="1">
                        <caption>Historial de Auditorías</caption>
                        <tr>
                            <th>Auditoria</th>
                            <th>Fecha de Asignacion</th>
                            <th>Departamento</th>
                            <th>Seleccionar</th>
                        </tr>

                        {historial.map((rhistorial, index) => (
                            <tr key={index}>
                                <td>{rhistorial.n_auditoria}</td>
                                <td>{rhistorial.fecha_subida}</td>
                                <td>{rhistorial.departamento}</td>
                                <td><button className="boton-seleccionar"></button></td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VigenciasComponent;
