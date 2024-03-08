import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import arrow from "./arrow.png";
import Navbar2 from "../../components/navbar-2/Navbar-2";
import "./asignacion.scss";

const Asignacion = () => {
  const { id } = useParams(); // Obtener el ID de la asignación de la URL
  const [asignacion, setAsignacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [valorCampoNomenclatura, setValorCampoNomenclatura] = useState('');
  const [valorCampoComentario, setValorCampoComentario] = useState('');

  useEffect(() => {
    fetchAsignacion(id);
  }, [id]);

  const fetchAsignacion = (id) => {
    fetch(`http://localhost:3001/asignacion/${id}`)
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

  const handleInputChangeNomenclatura = (event) => {
    setValorCampoNomenclatura(event.target.value);
  };

  const handleInputChangeComentario = (event) => {
    setValorCampoComentario(event.target.value);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <body>
      <header>
          <nav>
              <Navbar2 />
          </nav>
          <div className="section2">
              <div className="encabezado">
                  <div className="titulo">
                      <p>Asignación #{asignacion.id}</p>
                  </div>
                  <div className="info">
                      <p>Fecha límite: {formatDate(asignacion.fecha_final)}</p>
                      <a href="/preguntas"><img src={arrow} alt="arrow" /></a>
                  </div>
              </div>
              <div className="cuerpo">
                  <div className="left">
                      <div className="detalles">
                          <div className="detalle">
                              <p>Departamento: {asignacion.departamento}</p>
                          </div>
                          <div className="detalle">
                              <p>Auditor: {asignacion.auditor}</p>
                          </div>
                          <div className="detalle">
                              <p>Encargado: {asignacion.encargado}</p>
                          </div>
                      </div>
                  </div>
                  <div className="right">
                      <div className="container-nomenclatura">
                          <div className="titulo-nomenclatura">
                              <p>Nomenclatura</p>
                          </div>
                          <div className="campo-nomenclatura">
                              <input
                                  type="text"
                                  value={valorCampoNomenclatura}
                                  onChange={handleInputChangeNomenclatura}
                                  placeholder=""
                              />
                          </div>
                      </div>
                      <div className="container-comentario">
                          <div className="titulo-comentario">
                              <p>Comentario</p>
                          </div>
                          <div className="campo-comentario">
                              <input
                                  type="text"
                                  value={valorCampoComentario}
                                  onChange={handleInputChangeComentario}
                                  placeholder=""
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </header>
    </body>
  );
};

export default Asignacion;