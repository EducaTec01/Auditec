import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./tutoriales.scss"
import miniatura from "./miniatura-prueba.png"
import profile from "./profile-picture.png"
import Sidebar from "../../components/sidebar/Sidebar";

const Tutoriales = () => {
    return (
      <body>
            <header>
                
            </header>
            <section className="section2">
                <div className="left">
                    <Sidebar />
                    <div className="video">
                        <div className="titulo">
                            <p>Video</p>
                        </div>
                        <div className="video-container">
                            <div className="video">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/1uOo1ZZIgoU?si=__Ve2nqrfH9dW-yV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      </body>
    );
  };
  
  export default Tutoriales;