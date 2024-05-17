import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./reportes.scss";
import GeneratePDF from '../../components/GeneratePDF/GeneratePDF';


const Reportes = () => {
    
  return (
    <body>
        <div className="container">
          <Sidebar />
          <div className="content-container">
            <div className="titulo">
              <p>Reportes</p>
              <GeneratePDF />
            </div>
          </div>
        </div>
    </body>
  );
};

export default Reportes;
