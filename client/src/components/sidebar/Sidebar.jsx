import "./sidebar.scss";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';


const Sidebar = () => {  
  /*
<Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Inicio</span>
            </li>
          </Link>
  */
  return (
    <div className="sidebar">
      <div className="center">
        <ul>
          <p className="title">Menú</p>
          
          <Link to="/asignacionesJefa" style={{ textDecoration: "none" }}>
            <li>
              <AutoAwesomeMotionIcon  className="icon" />
              <span>Auditorias</span>
            </li>
          </Link>
          {/* <Link to="/historialesJefa" style={{ textDecoration: "none" }}>
            <li>
              <HistoryIcon className="icon" />
              <span>Historial</span>
            </li>
          </Link> */}
          <Link to="/reportes" style={{ textDecoration: "none" }}>
            <li>
              <AssessmentIcon className="icon" />
              <span>Reportes</span>
            </li>
          </Link>
          <Link to="/ajustes" style={{ textDecoration: "none" }}>
            <li>
              <SettingsIcon className="icon" />
              <span>Gestión de Asignaciones / Usuarios</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
