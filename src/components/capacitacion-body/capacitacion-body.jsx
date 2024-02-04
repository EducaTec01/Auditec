import React from "react";
import "./capacitacion-body.scss";
import people from "./people-studying.png";
import img4 from "./img4.jpg"

const CapacitacionBody = () => {
    return (
        <>
            <div className="info">
                <div className="logo">
                    <img src={people} alt="Personas Estudiando" />
                </div>
                <div className="frase">
                    <p>Capacitación para </p>
                    <p>Auditorías </p>
                </div>
            </div>
            <section className="section-2">
                <div className="info-container">
                    <div className="left">
                        <div className="left-texto">
                            <h1>Lorem ipsum dolor sit.</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum optio architecto, vitae dolorum et libero quas ex sapiente cum! Suscipit neque quod exercitationem nulla at?</p>
                        </div>
                        <div className="left-panel">
                            <div className="contenedor">
                                <div className="logo">
                                    <img src="" alt="img1" />
                                </div>
                                <div className="logo-info">
                                    <h2>Lorem, ipsum dolor.</h2>
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, soluta consectetur.</p>
                                </div>
                            </div>
                            <div className="contenedor">
                                <div className="logo">
                                    <img src="" alt="img2" />
                                </div>
                                <div className="logo-info">
                                    <h2>Lorem, ipsum dolor.</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, voluptate vel?
                                    </p>
                                </div>
                            </div>
                            <div className="contenedor">
                                <div className="logo">
                                    <img src="" alt="img3" />
                                </div>
                                <div className="logo-info">
                                    <h2>Lorem ipsum dolor sit.</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quis fugiat!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="local">
                            <img src={img4} alt="img4" />
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="footer">
                    <div className="container">
                        <div className="info">
                            <p>
                            Instituto Tecnológico de Tijuana <br />
                            Calzada Del Tecnológico S/N, Fraccionamiento Tomas Aquino. Tijuana, Baja California. C.P. 22414 Teléfono: +52 (664) 607 8400 <br />
                            Tecnológico Nacional de México - Algunos derechos reservados © 2014-2018
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default CapacitacionBody;
