import React from "react";
import "./capacitacion-body.scss";
import people from "./people-studying.png";
import img4 from "./img4.jpg";

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
                            <h1>Descubre el mundo de las auditorías</h1>
                            <p>Las auditorías son herramientas esenciales para evaluar la efectividad, eficiencia y conformidad de los procesos dentro de una organización. Descubre cómo mejorar tus habilidades y conocimientos en este campo emocionante.</p>
                        </div>
                        <div className="left-panel">
                            <div className="contenedor">
                                <div className="logo">
                                   
                                </div>
                                <div className="logo-info">
                                    <h2>Conceptos básicos</h2>
                                    <p>Entiende los principios fundamentales de las auditorías, incluidos los tipos de auditorías, el proceso de auditoría y los roles clave involucrados.</p>
                                </div>
                            </div>
                            <div className="contenedor">
                                <div className="logo">
                                    
                                </div>
                                <div className="logo-info">
                                    <h2>Herramientas y técnicas</h2>
                                    <p>Explora las herramientas y técnicas utilizadas en las auditorías, desde listas de verificación y entrevistas hasta análisis de documentos y pruebas de control.</p>
                                </div>
                            </div>
                            <div className="contenedor">
                                <div className="logo">
                                    
                                </div>
                                <div className="logo-info">
                                    <h2>Mejora continua</h2>
                                    <p>Aprende cómo utilizar los resultados de la auditoría para impulsar la mejora continua en los procesos organizacionales y garantizar el cumplimiento de los estándares y regulaciones.</p>
                                </div>
                            </div>
                            <div className="contenedor">
                                <div className="logo">
                                    
                                </div>
                                <div className="logo-info">
                                    <h2>Auditorías internas vs externas</h2>
                                    <p>Comprende las diferencias entre las auditorías internas y externas, así como sus objetivos y beneficios para una organización.</p>
                                </div>
                            </div>
                            <div className="contenedor">
                                <div className="logo">
                                   
                                </div>
                                <div className="logo-info">
                                    <h2>Aspectos legales y normativos</h2>
                                    <p>Conoce las leyes, regulaciones y estándares relevantes que afectan el proceso de auditoría y aseguran el cumplimiento legal y ético.</p>
                                </div>
                            </div>
                            <div className="contenedor">
                                <div className="logo">
                                   
                                </div>
                                <div className="logo-info">
                                    <h2>Ética en la auditoría</h2>
                                    <p>Explora los principios éticos fundamentales que deben guiar la conducta de los auditores durante el proceso de auditoría y cómo manejar situaciones éticamente delicadas.</p>
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
