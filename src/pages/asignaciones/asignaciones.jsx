import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignaciones.scss"
import arrow from "./arrow.png"

const Asignaciones = () => {
    return (
      <body>
        <header>
            <nav>
                <Navbar2 />
            </nav>
        </header>
        <div className="section2">
            <div className="titulo">
                <p>Asignaciones</p>
            </div>
            <table class="content-table">
                <thead>
                    <tr>
                        <th>Asignacion</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Realizar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>02/01/2024</td>
                        <td>Pendiente</td>
                        <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                    </tr>
                    <tr class="active-row">
                        <td>2</td>
                        <td>02/01/2024</td>
                        <td>Pendiente</td>
                        <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>02/01/2024</td>
                        <td>Pendiente</td>
                        <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                    </tr>
                    <tr class="active-row">
                        <td>4</td>
                        <td>02/01/2024</td>
                        <td>Pendiente</td>
                        <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                    </tr><tr>
                        <td>5</td>
                        <td>02/01/2024</td>
                        <td>Pendiente</td>
                        <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                    </tr>
                    <tr class="active-row">
                        <td>6</td>
                        <td>02/01/2024</td>
                        <td>Pendiente</td>
                        <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                    </tr><tr>
                        <td>7</td>
                        <td>02/01/2024</td>
                        <td>Pendiente</td>
                        <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                    </tr>
                    <tr class="active-row">
                        <td>8</td>
                        <td>02/01/2024</td>
                        <td>Pendiente</td>
                        <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                    </tr><tr>
                        <td>9</td>
                        <td>02/01/2024</td>
                        <td>Pendiente</td>
                        <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                    </tr>
                    <tr class="active-row">
                        <td>10</td>
                        <td>02/01/2024</td>
                        <td>Pendiente</td>
                        <a href="/asignacion"><img src={arrow} alt="arrow" /></a>
                    </tr>
                </tbody>
            </table>
        </div>
      </body>
    );
  };
  
  export default Asignaciones;