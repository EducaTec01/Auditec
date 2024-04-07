import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebarAuditado/Sidebar";
import "./Inconformidades.scss";

const InconformidadesComponent = () => {
    const [inconformidades, setInconformidades] = useState([]);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        // Realizar la llamada al servidor al montar el componente
        fetch('http://localhost:3001/inconformidades')
            .then(response => response.json())
            .then(data => {
                const historialFormateado = data.map(item => ({
                    ...item,
                    fecha_subida: new Date(item.fecha_subida).toLocaleDateString('es-MX'),
                    // Puedes hacer lo mismo para fecha_final si es necesario
                }));
                setInconformidades(historialFormateado);
                // Mostrar la tabla después de obtener los datos
                setShowTable(true);
            })
            .catch(error => console.error('Error al obtener datos de vigencias:', error));
    }, []); // El segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente

    return (
        <div className="inconformidades-page">
            <Sidebar />
            <div className={`inconformidades-content ${showTable ? 'show' : ''}`}>
                <h1>Inconformidades</h1>

                <table border="1">
                    <caption>Incoformidades</caption>
                    <tr>
                        <th>Reporte</th>
                        <th>Fecha</th>
                        <th>Departamento</th>
                        <th>Opcion</th>
                    </tr>

                    {inconformidades.map((inconformidad, index) => (
                        <tr key={index}>
                            <td>{inconformidad.numero_reporte}</td>
                            <td>{inconformidad.fecha_subida}</td>
                            <td>{inconformidad.departamento}</td>
                            <td><button className="boton-seleccionar"></button></td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default InconformidadesComponent;
