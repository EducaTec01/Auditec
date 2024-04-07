const db = require('../models/db');

// Controlador para obtener preguntas por tipo y año
module.exports.ppreguntas = (req, res) => {
  const { tipo } = req.query;
  const currentYear = new Date().getFullYear();
  const fechaInicio = `${currentYear}-01-01`;
  const fechaFin = `${currentYear}-12-31`;

  const consult = `SELECT * FROM preguntas WHERE tipo = ? AND fecha_subida BETWEEN ? AND ?`;

  db.query(consult, [tipo, fechaInicio, fechaFin], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    } else {
      res.json(results);
    }
  });
};
