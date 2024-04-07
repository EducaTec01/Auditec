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
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logoImage from './logo.png';
import HelpIcon from '@mui/icons-material/Help';
//Mis logos

const SidebarAuditado = () => {
  const { dispatch } = useContext(DarkModeContext);
  
  return (
    <div className="sidebar">
      <div className="top">
        {
        <Link to="/homeAuditado" style={{ textDecoration: "none" }}>
          <img src={logoImage} alt="Logo" className="logo"/>
        </Link>
        }
      </div>
      <div className="center">
        <ul>
          <p className="title">MENÚ</p>
          <Link to="/homeAuditado" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Inicio</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/historialCompanent" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Historial</span>
            </li>
          </Link>
          <Link to="/historialGCompanent" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Historial Preguntas</span>
            </li>
          </Link>
          <Link to="/inconformidadesComponent" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Inconformidades</span>
            </li>
          </Link>
          <Link to="/inconformidadesGComponent" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Inconformidades Preguntas</span>
            </li>
          </Link>
          <Link to="/vigenciasComponent" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>vigencias</span>
            </li>
          </Link>
          <Link to="/vigenciasGComponent" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Vigencias preguntas</span>
            </li>
          </Link>


        </ul>
      </div>
    </div>
  );
};

export default SidebarAuditado;
