
import React from 'react';
import "./RHistorial.scss";
// Define tu componente en formato JSX
const HistorialComponent = () => {
    return (
        <>
            <h1>Historial</h1>

            <table border="1">
                <caption>Historial de Auditorías</caption>
                <tr>
                    <th>Auditoría</th>
                    <th>Fecha</th>
                    <th>Departamento</th>
                    <th>Seleccionar</th>
                </tr>

                <tr>
                    <td>Auditoría 1</td>
                    <td>Fecha 1</td>
                    <td>Departamento 1</td>
                    <td><button className="boton-seleccionar">Seleccionar</button></td>
                </tr>
                <tr>
                    <td>Auditoría 2</td>
                    <td>Fecha 2</td>
                    <td>Departamento 2</td>
                    <td><button className="boton-seleccionar">Seleccionar</button></td>
                </tr>
                <tr>
                    <td>Auditoría 3</td>
                    <td>Fecha 3</td>
                    <td>Departamento 3</td>
                    <td><button className="boton-seleccionar">Seleccionar</button></td>
                </tr>
                <tr>
                    <td>Auditoría 4</td>
                    <td>Fecha 4</td>
                    <td>Departamento 4</td>
                    <td><button className="boton-seleccionar">Seleccionar</button></td>
                </tr>
                <tr>
                    <td>Auditoría 5</td>
                    <td>Fecha 5</td>
                    <td>Departamento 5</td>
                    <td><button className="boton-seleccionar">Seleccionar</button></td>
                </tr>
                <tr>
                    <td>Auditoría 6</td>
                    <td>Fecha 6</td>
                    <td>Departamento 6</td>
                    <td><button className="boton-seleccionar">Seleccionar</button></td>
                </tr>
                <tr>
                    <td>Auditoría 7</td>
                    <td>Fecha 7</td>
                    <td>Departamento 7</td>
                    <td><button className="boton-seleccionar">Seleccionar</button></td>
                </tr>
                <tr>
                    <td>Auditoría 8</td>
                    <td>Fecha 8</td>
                    <td>Departamento 8</td>
                    <td><button className="boton-seleccionar">Seleccionar</button></td>
                </tr>
                <tr>
                    <td>Auditoría 9</td>
                    <td>Fecha 9</td>
                    <td>Departamento 9</td>
                    <td><button className="boton-seleccionar">Seleccionar</button></td>
                </tr>
                <tr>
                    <td>Auditoría 10</td>
                    <td>Fecha 10</td>
                    <td>Departamento 10</td>
                    <td><button className="boton-seleccionar">Seleccionar</button></td>
                </tr>
            </table>
        </>
    );
}

export default HistorialComponent;

/*
import React from 'react';
import "./RHistorial.scss";
import Axios from "axios";


const [rhistoriallist, setRhistoriallist] = useState([]);
const getRHitorial = ()=>{
    Axios.get('http://localhost:3001/rhistorial').then((response)=>{
      setRhistoriallist(response.data);
    })  
}
// Define tu componente en formato JSX
const HistorialComponent = () => {
    return (
        <>
            <h1>Historial</h1>

            <table border="1">
                
                <caption>Historial de Auditorías</caption>
                <tr>
                    <th>Auditoría</th>
                    <th>Fecha</th>
                    <th>Departamento</th>
                    <th>Seleccionar</th>
                </tr>
                {
                    rhistoriallist.map((val,key)=>{
                        return(
                            <tr>
                                <th scope = "row">{val.id}</th>
                                <td>{val.Auditoria}</td>
                                <td>{val.Fecha}</td>
                                <td>{val.Departamento}</td>
                                <td><button>Seleccionar</button></td>
                            </tr>
                        )
                    })
                }
                    
                
                
            </table>
        </>
    );
}

export default HistorialComponent;

*/

