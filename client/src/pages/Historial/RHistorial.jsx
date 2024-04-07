import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebarAuditado/Sidebar";
import "./RHistorial.scss";

const HistorialComponent = () => {
    const [historial, setHistorial] = useState([]);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/rhistorial')
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
        <div className="historial-page">
            <Sidebar />
            <div className={`historial-content ${showTable ? 'show' : ''}`}>
                <h1>Historial</h1>

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

export default HistorialComponent;
