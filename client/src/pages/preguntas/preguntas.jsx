import "./preguntas.scss"
import arrow from "./arrow.png"

import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";

const Preguntas = () => {
    return (
      <body>
        <div className="section1">
            
        <SidebarAuditor />
        <div className="section2">
            <div className="titulo">
                <p>Preguntas e Instrucciones</p>
            </div>
            <div className="contenedor">
                <div className="descripcion">
                    <p>Preguntas recurrentes</p>
                </div>
            </div>
            <div className="preguntas">
                <div className="left">
                    <div className="container">
                        <div className="pregunta">
                            <p>Pregunta</p>
                        </div>
                        <div className="respuesta">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem sed placeat consectetur culpa. Sapiente, molestias!</p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="pregunta">
                            <p>Pregunta</p>
                        </div>
                        <div className="respuesta">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem sed placeat consectetur culpa. Sapiente, molestias!</p>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="container">
                        <div className="pregunta">
                            <p>Pregunta</p>
                        </div>
                        <div className="respuesta">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem sed placeat consectetur culpa. Sapiente, molestias!</p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="pregunta">
                            <p>Pregunta</p>
                        </div>
                        <div className="respuesta">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem sed placeat consectetur culpa. Sapiente, molestias!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        </div>
        
      </body>
    );
  };
  
  export default Preguntas;