import Navbar2 from "../../components/navbar-2/Navbar-2";
import CapacitacionBody from "../../components/capacitacion-body/capacitacion-body";
import "./capacitacion.scss"
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";

const Capacitacion = () => {
    return (
      <body>
        <section className="welcome">          
          <SidebarAuditor />
          <div className="body">
            <CapacitacionBody />
          </div>
        </section>
      </body>
    );
  };
  
  export default Capacitacion;