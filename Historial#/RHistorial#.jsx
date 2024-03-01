// Importa React y cualquier otro módulo necesario
import React from 'react';
import "./RHistorial#.scss";

// Define tu componente en formato JSX
const HistorialGComponent = () => {
    return (
        <>
            <h1>Historial#</h1>

            {/* Primera tabla */}
            <div className="tabla-container">
                <table border="1">
                    <caption>Vinculacion</caption>
                    <tr>
                        <th>Pregunta</th>
                        <th>Respuesta</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
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
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
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
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
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
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>

            
        </>
    );
}

// Exporta tu componente para su uso en otras partes de tu aplicación
export default HistorialGComponent;
