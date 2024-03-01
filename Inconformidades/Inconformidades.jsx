import React, { useState, useEffect } from 'react';
import "./Inconformidades.scss";

const InconformidadesComponent = () => {
    const [inconformidades, setInconformidades] = useState([]);

    useEffect(() => {
        
        fetch('http://localhost:3000/rhistorial')  
            .then(response => response.json())
            .then(data => {
                
                setInconformidades(data);
            })
            .catch(error => console.error('Error al obtener datos de inconformidades:', error));
    }, []); 

    return (
        <>
            <h1>Inconformidades</h1>

            
            <table border="1">
                <caption>Lista de Inconformidades</caption>
                <tr>
                    <th>Reporte</th>
                    <th>Fecha</th>
                    <th>Departamento</th>
                    <th>Cambiar</th>
                </tr>
                
                {inconformidades.map((inconformidad, index) => (
                    <tr key={index}>
                        
                        <td>{inconformidad.auditor}</td>
                        
                        <td>{inconformidad.fecha_inicio}</td>
                        <td>{inconformidad.departamento}</td>
                        
                        <td><button className="boton-cambiar">Seleccionar</button></td>
                    </tr>
                ))}
            </table>
        </>
    );
}

export default InconformidadesComponent;
