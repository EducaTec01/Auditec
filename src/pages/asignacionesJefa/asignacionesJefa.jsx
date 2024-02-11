import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacionesJefa.scss"
import arrow from "./arrow.png"
import Sidebar from "../../components/sidebar/Sidebar";

const Asignaciones = () => {
    return (
      <body>       
        <div className="section1">
            <Sidebar />
            <div className="section2">
                <Navbar2 />
                <div className="contenedor">
                    <div className="titulo">
                        <p>Asignaciones</p>
                    </div>
                    <button className="boton">Crear asignación</button>
                </div>
                
                <table class="content-table">
                    <thead>
                        <tr>
                            <th>Asignacion</th>
                            <th>Fecha de Vencimiento</th>
                            <th>Departamento</th>
                            <th>Ir</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>02/01/2024</td>
                            <td>Sistemas</td>
                            <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                        </tr>
                        <tr class="active-row">
                            <td>2</td>
                            <td>02/01/2024</td>
                            <td>Sistemas</td>
                            <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>02/01/2024</td>
                            <td>Sistemas</td>
                            <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                        </tr>
                        <tr class="active-row">
                            <td>4</td>
                            <td>02/01/2024</td>
                            <td>Sistemas</td>
                            <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                        </tr><tr>
                            <td>5</td>
                            <td>02/01/2024</td>
                            <td>Sistemas</td>
                            <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                        </tr>
                        <tr class="active-row">
                            <td>6</td>
                            <td>02/01/2024</td>
                            <td>Sistemas</td>
                            <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                        </tr><tr>
                            <td>7</td>
                            <td>02/01/2024</td>
                            <td>Sistemas</td>
                            <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                        </tr>
                        <tr class="active-row">
                            <td>8</td>
                            <td>02/01/2024</td>
                            <td>Sistemas</td>
                            <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                        </tr><tr>
                            <td>9</td>
                            <td>02/01/2024</td>
                            <td>Sistemas</td>
                            <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                        </tr>
                        <tr class="active-row">
                            <td>10</td>
                            <td>02/01/2024</td>
                            <td>Sistemas</td>
                            <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
      </body>
    );
  };
  
  export default Asignaciones;