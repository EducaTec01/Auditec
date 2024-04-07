import "./sidebar.scss";
import Logo from "./logo-transparente.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logoImage from './logo.png';
import AssessmentIcon from '@mui/icons-material/Assessment';
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
          <Link to="/usuario" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Usuarios</span>
            </li>
          </Link>
          <Link to="/asignacionesJefa" style={{ textDecoration: "none" }}>
            <li>
              <AutoAwesomeMotionIcon className="icon" />
              <span>Asignaciones</span>
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

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
