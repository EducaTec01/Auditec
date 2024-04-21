import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);  
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [rolUsuario, setRolUsuario] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const navigate = useNavigate(); // Utiliza useNavigate en lugar de useHistory

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 10000); // Actualizar la fecha y hora cada 10 segundos

    // Obtener el rol de usuario y nombre de sessionStorage
    const rol = sessionStorage.getItem('Acceso');
    const nombre = sessionStorage.getItem('nombre');
    setRolUsuario(rol);
    setNombreUsuario(nombre);

    return () => clearInterval(interval);
  }, []);

  const handleProfileClick = () => {
    setOpenProfile(prevState => !prevState);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      // Elimina los datos de sesión
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('Acceso');
      sessionStorage.removeItem('nombre');
      // Redirige al usuario a la página de inicio de sesión
      navigate('/login'); // Utiliza navigate en lugar de history.push
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="center-text">  
          <div className="rol">  
            <p>{rolUsuario}</p> {/* Mostrar el rol de usuario */}
          </div>
          <div className="nombre">  
            <p>{nombreUsuario}</p>   {/* Mostrar el nombre de usuario */}
          </div>             
        </div>       
        
        <div className="items">     
          <div className="item center-text">
            <p>{formatDateTime(currentDateTime)}</p> {/* Muestra fecha y hora en formato personalizado */}
          </div>      
          <div className="item">
            <LogoutIcon className="avatar" onClick={handleLogout} /> {/* Agrega el manejador de evento para cerrar sesión */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Función para formatear la fecha y hora
const formatDateTime = (dateTime) => {
  return dateTime.toLocaleString('es-ES', {
    month: 'long',   // Mes en formato largo
    day: '2-digit',  // Día del mes en formato de dos dígitos
    year: 'numeric', // Año en formato numérico
    hour: '2-digit', // Hora en formato de dos dígitos
    minute: '2-digit' // Minuto en formato de dos dígitos
  });
};

export default Navbar;