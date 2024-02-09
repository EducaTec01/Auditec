import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacionFormulario.scss"
import React, { useState } from 'react';

const Formulario = () => {
    const [valorCampoPregunta1, setValorCampoPregunta1] = useState('');

    const handleInputChangePregunta1 = (event) => {
      setValorCampoPregunta1(event.target.value);
    };

    const [valorCampoPregunta2, setValorCampoPregunta2] = useState('');

    const handleInputChangePregunta2 = (event) => {
      setValorCampoPregunta2(event.target.value);
    };

    const [valorCampoPregunta3, setValorCampoPregunta3] = useState('');

    const handleInputChangePregunta3 = (event) => {
      setValorCampoPregunta3(event.target.value);
    };

    const [valorCampoPregunta4, setValorCampoPregunta4] = useState('');

    const handleInputChangePregunta4 = (event) => {
      setValorCampoPregunta4(event.target.value);
    };

    const [valorCampoPregunta5, setValorCampoPregunta5] = useState('');

    const handleInputChangePregunta5 = (event) => {
      setValorCampoPregunta5(event.target.value);
    };

    const [valorCampoPregunta6, setValorCampoPregunta6] = useState('');

    const handleInputChangePregunta6 = (event) => {
      setValorCampoPregunta6(event.target.value);
    };

    return (
      <body>
        <header>
            <nav>
                <Navbar2 />
            </nav>
            <div className="section2">
                <div className="encabezado">
                    <div className="titulo">
                        <p>Asignaciones / Asignacion #1</p>
                    </div>
                </div>
            </div>
        </header>
        <div className="formulario-body">
          <div className="pasos">
            <div className="paso">
              <div className="numero">
                <p>1</p>
              </div>
              <div className="descripcion">
                <p>Paso 1 - Vinculacion</p>
              </div>
            </div>
            <div className="paso">
              <div className="numero">
                <p>2</p>
              </div>
              <div className="descripcion">
                <p>Paso 2 - Academicos</p>
              </div>
            </div>
            <div className="paso">
              <div className="numero">
                <p>3</p>
              </div>
              <div className="descripcion">
                <p>Paso 3 - Administrativos</p>
              </div>
            </div>
            <div className="paso">
              <div className="numero">
                <p>4</p>
              </div>
              <div className="descripcion">
                <p>Paso 4 - Planeacion</p>
              </div>
            </div>
          </div>
          <div className="preguntas-body">
            <div className="row-1">
              <div className="pregunta">
                <p>Pregunta 1</p>
                <div className="pregunta-contenedor">
                  <input
                      type="text"
                      value={valorCampoPregunta1}
                      onChange={handleInputChangePregunta1}
                      placeholder=""
                  />
                </div>
              </div>
              <div className="pregunta">
                <p>Pregunta 2</p>
                <div className="pregunta-contenedor">
                  <input
                        type="text"
                        value={valorCampoPregunta2}
                        onChange={handleInputChangePregunta2}
                        placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="row-2">
              <div className="pregunta">
                <p>Pregunta 3</p>
                <div className="pregunta-contenedor">
                  <input
                          type="text"
                          value={valorCampoPregunta3}
                          onChange={handleInputChangePregunta3}
                          placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="row-3">
              <div className="pregunta">
                <p>Pregunta 4</p>
                <div className="pregunta-contenedor">
                  <input
                          type="text"
                          value={valorCampoPregunta4}
                          onChange={handleInputChangePregunta4}
                          placeholder=""
                  />
                </div>
              </div>
              <div className="pregunta">
                <p>Pregunta 5</p>
                <div className="pregunta-contenedor">
                  <input
                          type="text"
                          value={valorCampoPregunta5}
                          onChange={handleInputChangePregunta5}
                          placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="row-4">
              <div className="pregunta">
                <p>Pregunta 6</p>
                <div className="pregunta-contenedor">
                  <input
                          type="text"
                          value={valorCampoPregunta6}
                          onChange={handleInputChangePregunta6}
                          placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="botones-body">
            <div className="botones">
              <div className="boton-1">
                <button>
                  <p>Anterior</p>
                </button>
              </div>
              <div className="boton-2">
                <button>
                  <p>Siguiente</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  };
  
  export default Formulario;