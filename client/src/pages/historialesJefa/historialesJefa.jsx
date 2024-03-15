import Navbar2 from "../../components/navbar-2/Navbar-2"
import Sidebar from "../../components/sidebar/Sidebar";
import "./historialesJefa.scss"
import arrow from "./arrow.png"

const HistorialesJefa = () => {
    return (
        <div className="historiales-jefa">
      <header>
      </header>
      <div className="container">
        <Sidebar />
        <div className="content-container">
          <div className="titulo">
            <p>Historial</p>
          </div>
          <table className="content-table">
            <thead>
              <tr>
                <th>Asignación</th>
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
                <td><a href="/historialesJefa2"><img src={arrow} alt="arrow" className="arrow" /></a></td>
              </tr>
              {/* Aquí van el resto de las filas */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  };
  
  export default HistorialesJefa;