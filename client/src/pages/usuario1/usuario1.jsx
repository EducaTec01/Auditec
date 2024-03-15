import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import arrow from "./arrow.png";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import Sidebar from "../../components/sidebar/Sidebar";
import "./usuario1.scss";

const Usuario1 = () => {
  const { id } = useParams(); // Obtener el ID de la asignación de la URL
  const [Usuario, setAsignacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAsignacion(id);
  }, [id]);

  const fetchAsignacion = (id) => {
    fetch(`http://localhost:3001/usuario/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la asignación");
        }
        return response.json();
      })
      .then((data) => {
        setAsignacion(data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setError(error.message);
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <body>
      <div className="section1">
      <Sidebar />
          <div className="section2">
              <div className="encabezado">
                  <div className="titulo">
                      <p>Usuario #{Usuario.id}</p>
                  </div>
                  <div className="info">
                      <a href="/preguntas"><img src={arrow} alt="arrow" /></a>
                  </div>
              </div>
              <div className="cuerpo">
                  <div className="left">
                      <div className="detalles">
                          <div className="detalle">
                              <p>Nombre: {Usuario.nombre}</p>
                          </div>
                          <div className="detalle">
                              <p>Usuario: {Usuario.user}</p>
                          </div>
                          <div className="detalle">
                              <p>Correo Electronico: {Usuario.correoElectronico}</p>
                          </div>
                          <div className="detalle">
                              <p>Contraseña: {Usuario.password}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          </div>
    </body>
  );
};

export default Usuario1;
