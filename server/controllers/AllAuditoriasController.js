const db = require('../models/db');

const AllAuditoriasController = (req, res) => {
  const query = `
    SELECT DISTINCT Auditoria.id, 
           Auditoria.id_departamento, 
           Departamentos.nombre AS nombre_departamento, 
           Auditoria.id_auditado, 
           Login.nombre AS nombre_auditado, 
           Auditoria.id_seccion, 
           Seccion.nombre AS nombre_seccion, 
           Auditoria.fecha_final,
           R.genera_inconformidad
    FROM Auditoria 
    JOIN Login ON Auditoria.id_auditado = Login.id 
    JOIN Seccion ON Auditoria.id_seccion = Seccion.id 
    JOIN Departamentos ON Auditoria.id_departamento = Departamentos.id
    JOIN Respuestas R ON Auditoria.id = R.id_auditoria;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener las auditorías: ", err);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }
    res.json(result);
  });
};

module.exports = {
  AllAuditoriasController,
};
