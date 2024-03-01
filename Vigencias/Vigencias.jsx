
import React from 'react';
import "./Vigencias.scss"


const VigenciasComponent = () => {
    return (
        <>
            <h1>Vigencias</h1>

            {/* Tabla */}
            <table border="1">
                <caption>Lista de Vigencias</caption>
                <tr>
                    <th>Auditoria</th>
                    <th>Fecha</th>
                    <th>Departamento</th>
                </tr>

                {/* Filas con datos */}
                <tr>
                    <td>Auditoria 1</td>
                    <td>Fecha 1</td>
                    <td>Departamento 1</td>
                </tr>
                <tr>
                    <td>Auditoria 2</td>
                    <td>Fecha 2</td>
                    <td>Departamento 2</td>
                </tr>
                <tr>
                    <td>Auditoria 3</td>
                    <td>Fecha 3</td>
                    <td>Departamento 3</td>
                </tr>
                <tr>
                    <td>Auditoria 4</td>
                    <td>Fecha 4</td>
                    <td>Departamento 4</td>
                </tr>
                <tr>
                    <td>Auditoria 5</td>
                    <td>Fecha 5</td>
                    <td>Departamento 5</td>
                </tr>
                <tr>
                    <td>Auditoria 6</td>
                    <td>Fecha 6</td>
                    <td>Departamento 6</td>
                </tr>
                <tr>
                    <td>Auditoria 7</td>
                    <td>Fecha 7</td>
                    <td>Departamento 7</td>
                </tr>
                <tr>
                    <td>Auditoria 8</td>
                    <td>Fecha 8</td>
                    <td>Departamento 8</td>
                </tr>
                <tr>
                    <td>Auditoria 9</td>
                    <td>Fecha 9</td>
                    <td>Departamento 9</td>
                </tr>
                <tr>
                    <td>Auditoria 10</td>
                    <td>Fecha 10</td>
                    <td>Departamento 10</td>
                </tr>
            </table>
        </>
    );
};

export default VigenciasComponent;
