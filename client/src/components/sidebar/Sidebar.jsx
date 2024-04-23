import "./sidebar.scss";
import Logo from "./logo-transparente.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
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
import logoImage from './logo.png';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
//Mis logos


const Sidebar = () => {  
  return (
    <div className="sidebar">
      <div className="top">
        <img src={logoImage} alt="Logo" className="logo"/>
      </div>
      <div className="center">
        <ul>
          <p className="title">Menú</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Inicio</span>
            </li>
          </Link>
          <Link to="/asignacionesJefa" style={{ textDecoration: "none" }}>
            <li>
              <AutoAwesomeMotionIcon  className="icon" />
              <span>Auditorias</span>
            </li>
          </Link>
          <Link to="/historialesJefa" style={{ textDecoration: "none" }}>
            <li>
              <HistoryIcon className="icon" />
              <span>Historial</span>
            </li>
          </Link>
          <Link to="/reportes" style={{ textDecoration: "none" }}>
            <li>
              <AssessmentIcon className="icon" />
              <span>Reportes</span>
            </li>
          </Link>
          <Link to="/ajustes" style={{ textDecoration: "none" }}>
            <li>
              <SettingsIcon className="icon" />
              <span>Modificaciones</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
