import "./sidebar.scss";
import Logo from "./logo-transparente.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logoImage from './logo.png';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
//Mis logos


const SidebarAuditor  = () => {  
  return (
    <div className="sidebar">
      <div className="top">
        <img src={logoImage} alt="Logo" className="logo"/>
      </div>
      <div className="center">
        <ul>
          <p className="title">Menú</p>
          <Link to="/homeAuditor" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Inicio</span>
            </li>
          </Link>
          <Link to="/tutoriales" style={{ textDecoration: "none" }}>
            <li>
              <QuestionAnswerIcon  className="icon" />
              <span>Tutoriales</span>
            </li>
          </Link>
          <Link to="/asignacionesAuditor" style={{ textDecoration: "none" }}>
            <li>
              <HistoryIcon className="icon" />
              <span>Asignaciones</span>
            </li>
          </Link>
          <Link to="/capacitacion" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Capacitacion</span>
            </li>
          </Link>
        </ul>
        <hr className="linea" />
        <ul className="general">
          <p className="title">General</p>          
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