// Importa React y cualquier otro módulo necesario
import React from 'react';
import "./Inconformidades.scss"

// Define tu componente en formato JSX
const InconformidadesComponent = () => {
    return (
        <>
            <h1>Inconformidades</h1>

            {/* Tabla */}
            <table border="1">
                <caption>Lista de Inconformidades</caption>
                <tr>
                    <th>Reporte</th>
                    <th>Fecha</th>
                    <th>Departamento</th>
                    <th>Cambiar</th>
                </tr>
                {/* Espacios con botones "cambiar" */}
                <tr>
                    <td>Reporte 1</td>
                    <td>Fecha 1</td>
                    <td>Departamento 1</td>
                    <td><button className="boton-cambiar">-</button></td>
                </tr>
                <tr>
                    <td>Reporte 2</td>
                    <td>Fecha 2</td>
                    <td>Departamento 2</td>
                    <td><button className="boton-cambiar">-</button></td>
                </tr>
                <tr>
                    <td>Reporte 3</td>
                    <td>Fecha 3</td>
                    <td>Departamento 3</td>
                    <td><button className="boton-cambiar">-</button></td>
                </tr>
                <tr>
                    <td>Reporte 4</td>
                    <td>Fecha 4</td>
                    <td>Departamento 4</td>
                    <td><button className="boton-cambiar">-</button></td>
                </tr>
                <tr>
                    <td>Reporte 5</td>
                    <td>Fecha 5</td>
                    <td>Departamento 5</td>
                    <td><button className="boton-cambiar">-</button></td>
                </tr>
                <tr>
                    <td>Reporte 6</td>
                    <td>Fecha 6</td>
                    <td>Departamento 6</td>
                    <td><button className="boton-cambiar">-</button></td>
                </tr>
                <tr>
                    <td>Reporte 7</td>
                    <td>Fecha 7</td>
                    <td>Departamento 7</td>
                    <td><button className="boton-cambiar">-</button></td>
                </tr>
                <tr>
                    <td>Reporte 8</td>
                    <td>Fecha 8</td>
                    <td>Departamento 8</td>
                    <td><button className="boton-cambiar">-</button></td>
                </tr>
                <tr>
                    <td>Reporte 9</td>
                    <td>Fecha 9</td>
                    <td>Departamento 9</td>
                    <td><button className="boton-cambiar">-</button></td>
                </tr>
                <tr>
                    <td>Reporte 10</td>
                    <td>Fecha 10</td>
                    <td>Departamento 10</td>
                    <td><button className="boton-cambiar">-</button></td>
                </tr>
            </table>
        </>
    );
}

// Exporta tu componente para su uso en otras partes de tu aplicación
export default InconformidadesComponent;
