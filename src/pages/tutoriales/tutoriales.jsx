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
                            <p>Video de Prueba</p>
                        </div>
                        <div className="video-container">
                            <img src={miniatura} alt="miniatura" />
                        </div>
                    </div>
                    <div className="contenedor">
                        
                    </div>
                </div>
            </section>
      </body>
    );
  };
  
  export default Tutoriales;