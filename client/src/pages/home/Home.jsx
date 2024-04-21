import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
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

export default Home;
