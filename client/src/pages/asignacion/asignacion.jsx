import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacion.scss"
import arrow from "./arrow.png"
import React, { useState } from 'react';

const Asignacion = () => {
    const [valorCampoNomenclatura, setValorCampoNomenclatura] = useState('');
    const [valorCampoComentario, setValorCampoComentario] = useState('');

    const handleInputChangeNomenclatura = (event) => {
        setValorCampoNomenclatura(event.target.value);
    };

    const handleInputChangeComentario = (event) => {
        setValorCampoComentario(event.target.value);
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
                        <p>Asignacion #1</p>
                    </div>
                    <div className="info">
                        <p>Fecha limite: 07/03/2024</p>
                        <a href="/preguntas"><img src={arrow} alt="arrow" /></a>
                    </div>
                </div>
                <div className="cuerpo">
                    <div className="left">
                        <div className="detalles">
                            <div className="detalle">
                                <p>Departamento: Sistemas Computacionales</p>
                            </div>
                            <div className="detalle">
                                <p>Area: Laboratorios</p>
                            </div>
                            <div className="detalle">
                                <p>Encargado: John Smith</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="container-nomenclatura">
                            <div className="titulo-nomenclatura">
                                <p>Nomenclatura</p>
                            </div>
                            <div className="campo-nomenclatura">
                                <input
                                    type="text"
                                    value={valorCampoNomenclatura}
                                    onChange={handleInputChangeNomenclatura}
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="container-comentario">
                            <div className="titulo-comentario">
                                <p>Comentario</p>
                            </div>
                            <div className="campo-comentario">
                                <input
                                    type="text"
                                    value={valorCampoComentario}
                                    onChange={handleInputChangeComentario}
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
      </body>
    );
  };
  
  export default Asignacion;