import React from 'react';
import "./Vigencias#.scss"

const VigenciasGComponent = () => {
  return (
    <div>
      <h1>Vigencias</h1>

      {/* Primera tabla */}
      <div className="tabla-container">
        <table border="1">
          <caption>Vinculacion</caption>
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Respuesta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Segunda tabla */}
      <div className="tabla-container">
        <table border="1">
          <caption>Academicos</caption>
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Respuesta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tercera tabla */}
      <div className="tabla-container">
        <table border="1">
          <caption>Administrativos</caption>
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Respuesta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cuarta tabla */}
      <div className="tabla-container">
        <table border="1">
          <caption>Planeacion</caption>
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Respuesta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
          </tbody>
        </table>
        <button className="boton-continuar" onClick={() => continuar()}>Continuar</button>
      </div>
    </div>
  );
};

function continuar() {
  alert("Continuar");
}

export default VigenciasGComponent;
