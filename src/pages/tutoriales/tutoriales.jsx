import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./tutoriales.scss"

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
                        <p>Contenedor de Video</p>
                    </div>
                </div>
                <div className="contenedor">
                    <p>Archivo.pdf</p>
                </div>
            </div>
            <div className="right">
                <div className="comentarios">
                    <div className="titulo">
                        <p>Comentarios</p>
                        <p>Next Video</p>
                    </div>
                    <div className="container">
                        <p>Contenedor de comentarios</p>
                    </div>
                </div>
            </div>
        </section>
      </body>
    );
  };
  
  export default Tutoriales;