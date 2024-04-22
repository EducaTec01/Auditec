import SidebarAuditado from "../../components/sidebarAuditado/SidebarAuditado";
import Navbar from "../../components/navbar/Navbar";
import "./HomeAuditado.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const HomeAuditado = () => {
  return (
    <div className="home">
      <SidebarAuditado/>
      <div className="homeContainer">
        <Navbar />
        <div className="containers">
          <div className="containerL">
            <div className="widgets">
              <Widget className="widget" type="asignaciones" />
              <Widget className="widget" type="departamentos" />
            </div>
          </div>
          <div className="containerR">
            <div className="widgets">
              <Widget className="widget" type="graficas" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAuditado;
