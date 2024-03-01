// Importa React y cualquier otro módulo necesario
import React from 'react';
import './Inconformidades#.scss'

// Define tu componente en formato JSX
const InconformidadesGComponent = () => {
    return (
        <>
            <h1>Inconformidades</h1>

            {/* Primera tabla */}
            <div className="tabla-container">
                <table border="1">
                    <caption>Vinculacion</caption>
                    <tr>
                        <th>Pregunta</th>
                        <th>Respuesta</th>
                    </tr>
                    <tr>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                    </tr>
                    
                </table>
                
            </div>

            {/* Segunda tabla */}
            <div className="tabla-container">
                <table border="1">
                    <caption>Academicos</caption>
                    <tr>
                        <th>Pregunta</th>
                        <th>Respuesta</th>
                    </tr>
                    <tr>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                    </tr>
                    
                </table>
                
            </div>

            {/* Tercera tabla */}
            <div className="tabla-container">
                <table border="1">
                    <caption>Administrativos</caption>
                    <tr>
                        <th>Pregunta</th>
                        <th>Respuesta</th>
                    </tr>
                    <tr>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                    </tr>
                    
                </table>
                
            </div>

            {/* Cuarta tabla */}
            <div className="tabla-container">
                <table border="1">
                    <caption>Planeacion</caption>
                    <tr>
                        <th>Pregunta</th>
                        <th>Respuesta</th>
                    </tr>
                    <tr>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                    </tr>
                    
                </table>
                
            </div>

           
        </>
    );
}

// Exporta tu componente para su uso en otras partes de tu aplicación
export default InconformidadesGComponent;
