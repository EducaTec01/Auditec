import Navbar2 from "../../components/navbar-2/Navbar-2";
import CapacitacionBody from "../../components/capacitacion-body/capacitacion-body";
import "./capacitacion.scss"

const Capacitacion = () => {
    return (
      <body>
        <header>
            <nav>
                <Navbar2 />
            </nav>
        </header>
        <section className="welcome">
          <div className="body">
            <CapacitacionBody />
          </div>
        </section>
      </body>
    );
  };
  
  export default Capacitacion;