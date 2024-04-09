import "./sidebar.scss";
import Logo from "./logo-transparente.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SchoolIcon from '@mui/icons-material/School';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logoImage from './logo.png';
import HelpIcon from '@mui/icons-material/Help';
//Mis logos

const SidebarAuditor = () => {
  const { dispatch } = useContext(DarkModeContext);
  
  return (
    <div className="sidebar">
      <div className="top">
        {
        <Link to="/homeAuditor" style={{ textDecoration: "none" }}>
          <img src={logoImage} alt="Logo" className="logo"/>
        </Link>
        }
      </div>
      <div className="center">
        <ul>
          <p className="title">MENÚ</p>
          <Link to="/homeAuditor" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Inicio</span>
            </li>
          </Link>
          <p className="title">General</p>
          <Link to="/tutoriales" style={{ textDecoration: "none" }}>
            <li>
              <QuestionAnswerIcon className="icon" />
              <span>Tutoriales</span>
            </li>
          </Link>
          <Link to="/asignacionesAuditor" style={{ textDecoration: "none" }}>
            <li>
              <AutoAwesomeMotionIcon className="icon" />
              <span>Asignaciones</span>
            </li>
          </Link>
          <Link to="/capacitacion" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Capacitación</span>
            </li>
          </Link>
          <Link to="/preguntas" style={{ textDecoration: "none" }}>
            <li>
              <HelpIcon className="icon" />
              <span>Preguntas</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAuditor;
