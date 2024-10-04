import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.scss";
import Logo from './logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [rolUsuario, setRolUsuario] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');

  const menuRef = useRef(null);
  const menuToggleRef = useRef(null); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 10000); // Actualizar la fecha y hora cada 10 segundos

    // Obtener el rol de usuario y nombre de sessionStorage
    const rol = sessionStorage.getItem('Acceso');
    const nombre = sessionStorage.getItem('Nombre');
    setRolUsuario(rol);
    setNombreUsuario(nombre);
    console.log(nombre);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false); 
    setShowSubmenu(false); 
    setActiveDropdown(null); 
    setMobileMenuOpen(false); 
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

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
    setActiveDropdown(null); 
  };

  const handleSubmenuEnter = () => {
    setShowSubmenu(true);
  };

  const handleSubmenuLeave = () => {
    setShowSubmenu(false);
  };

  const handleDropdownEnter = (dropdownName) => {
    setActiveDropdown(dropdownName);
  };

  const isActive = (path) => location.pathname === path;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav container">    
        <div className="nav">  
          <NavLink to="/about" className="nav__logo">
            <img src={Logo} alt="Auditec Logo" className="nav__logo-img" />
          </NavLink>
          <div className="nav__logo-text">  
            <p>{nombreUsuario}</p>   {/* Mostrar el nombre de usuario */}
          </div>             
        </div>          
        <ul className="nav__list">          
          <li className="nav__item" onClick={handleLogout}>
            <span className="nav__link">CERRAR SESIÓN</span>
          </li>            
        </ul>        
      </nav>
    </header>
  );
};

export default Navbar;
