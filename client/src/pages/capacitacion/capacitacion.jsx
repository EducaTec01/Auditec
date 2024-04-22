import Navbar2 from "../../components/navbar-2/Navbar-2";
import CapacitacionBody from "../../components/capacitacion-body/capacitacion-body";
import "./capacitacion.scss"
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";
import Navbar from "../../components/navbar/Navbar";

const Capacitacion = () => {
    return (
      <body>
        <section className="welcome">          
          <SidebarAuditor />
          <div className="body">
            <Navbar/>
            <CapacitacionBody />
          </div>
        </section>
      </body>
    );
  };
  
  export default Capacitacion;