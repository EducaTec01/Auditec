import "./sidebar.scss";
import Logo from "./logo-transparente.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logoImage from './logo.png';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';
import ErrorIcon from '@mui/icons-material/Error';
//Mis logos

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  
  return (
    <div className="sidebar">
      <div className="top">
        {
        <Link to="/home" style={{ textDecoration: "none" }}>
          <img src={logoImage} alt="Logo" className="logo"/>
        </Link>
        }
      </div>
      <div className="center">
        <ul>
          <p className="title">MENÚ</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Inicio</span>
            </li>
          </Link>
          <p className="title">General</p>
          <Link to="/vigenciasComponent" style={{ textDecoration: "none" }}>
            <li>
              <CalendarTodayIcon className="icon" />
              <span>Vigencias</span>
            </li>
          </Link>
          <Link to="/historialComponent" style={{ textDecoration: "none" }}>
            <li>
              <HistoryIcon className="icon" />
              <span>Historial</span>
            </li>
          </Link>
          <Link to="/inconformidadesComponent" style={{ textDecoration: "none" }}>
            <li>
              <ErrorIcon className="icon" />
              <span>Inconformidades</span>
            </li>
          </Link>         
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
