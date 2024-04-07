import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebarAuditado/Sidebar";
import "./Vigencias.scss";

const VigenciasComponent = () => {
    const [historial, setHistorial] = useState([]);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        
        fetch('http://localhost:3001/vigencias')
            .then(response => response.json())
            .then(data => {
                
                const historialFormateado = data.map(item => ({
                    ...item,
                    fecha_subida: new Date(item.fecha_subida).toLocaleDateString('es-MX'),
                   
                }));

               
                setHistorial(historialFormateado);
                setShowTable(true);
            })
            .catch(error => console.error('Error al obtener datos de historial:', error));
    }, []); 

    return (
        <div className="vigencias-page">
            <Sidebar />
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
    );
};

export default VigenciasComponent;
