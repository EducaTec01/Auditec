import "./navbar-2.scss";
import logo from "./logo.png";
import profile from "./profile-picture.png";

const Navbar2 = () => {
    return (
        <nav className="nav">
            <ul className="lista1">
                <li className="lista-elemento"><a href="#"><img className="logo" alt="Logo" src={logo} /></a></li>
            </ul>
            <ul className="lista2">
                <li className="lista-elemento"><a href="#">Tutoriales</a></li>
                <li className="lista-elemento"><a href="#">Asignaciones</a></li>
                <li className="lista-elemento"><a href="#">Preguntas</a></li>
                <li className="lista-elemento"><a href="#">Inconformidades</a></li>
                <li className="lista-elemento"><a href="#">Sucursales</a></li>
                <li className="lista-elemento"><a href="#"><img className="profile-picture" alt="Logo" src={profile} /></a></li>
            </ul>
        </nav>
    );
};

export default Navbar2;
