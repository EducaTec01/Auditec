import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./tutoriales.scss"
import miniatura from "./miniatura-prueba.png"
import profile from "./profile-picture.png"

const Tutoriales = () => {
    return (
      <body>
            <header>
                <nav>
                    <Navbar2 />
                </nav>
            </header>
            <section className="section2">
                <div className="left">
                    <div className="video">
                        <div className="titulo">
                            <p>Tutorial de como hacer un tutorial</p>
                        </div>
                        <div className="video-container">
                            <img src={miniatura} alt="miniatura" />
                        </div>
                    </div>
                    <div className="contenedor">
                        <p></p>
                    </div>
                </div>
                <div className="right">
                    <div className="comentarios">
                        <div className="titulo">
                            <p>Comentarios</p>
                            <p className="next-video">Next Video</p>
                        </div>
                        <div className="container">
                            <div className="comentario">
                                <div className="izq">
                                    <div className="img">
                                        <img className="user-picture" alt="Logo" src={profile} />

                                    </div>
                                </div>
                                <div className="der">
                                    <div className="usuario">
                                        <p>Usuario</p>
                                    </div>
                                    <div className="mensaje">
                                        <p>Nice video!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="comentario">
                                <div className="izq">
                                    <div className="img">
                                        <img className="user-picture" alt="Logo" src={profile} />

                                    </div>
                                </div>
                                <div className="der">
                                    <div className="usuario">
                                        <p>Usuario</p>
                                    </div>
                                    <div className="mensaje">
                                        <p>Excellent Performance</p>
                                    </div>
                                </div>
                            </div>
                            <div className="comentario">
                                <div className="izq">
                                    <div className="img">
                                        <img className="user-picture" alt="Logo" src={profile} />

                                    </div>
                                </div>
                                <div className="der">
                                    <div className="usuario">
                                        <p>Usuario</p>
                                    </div>
                                    <div className="mensaje">
                                        <p>Asumecha</p>
                                    </div>
                                </div>
                            </div>
                            <div className="comentario">
                                <div className="izq">
                                    <div className="img">
                                        <img className="user-picture" alt="Logo" src={profile} />

                                    </div>
                                </div>
                                <div className="der">
                                    <div className="usuario">
                                        <p>Usuario</p>
                                    </div>
                                    <div className="mensaje">
                                        <p>Cual es el mejor Batman del cine?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      </body>
    );
  };
  
  export default Tutoriales;