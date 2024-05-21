const db = require('../models/db');

const auditoriasByAuditadoController = (req, res) => {
  const { id_auditado } = req.params;

  const query = `
    SELECT Auditoria.id, 
           Auditoria.id_departamento, 
           Departamentos.nombre AS nombre_departamento, 
           Auditoria.id_auditado, 
           Login.nombre AS nombre_auditado, 
           Auditoria.id_seccion, 
           Seccion.nombre AS nombre_seccion, 
           Auditoria.fecha_final,
           Auditoria.estado
    FROM Auditoria 
    JOIN Login ON Auditoria.id_auditado = Login.id 
    JOIN Seccion ON Auditoria.id_seccion = Seccion.id 
    JOIN Departamentos ON Auditoria.id_departamento = Departamentos.id
    WHERE Auditoria.id_auditado = ?;
  `;

  db.query(query, [id_auditado], (err, result) => {
    if (err) {
      console.error("Error al obtener las auditorías: ", err);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }
    res.json(result);
  });
};

module.exports = {
  auditoriasByAuditadoController,
};
