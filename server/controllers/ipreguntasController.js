const db = require('../models/db');

module.exports.ipreguntas = (req, res) => {
    // Obtener el tipo de pregunta desde la consulta
    const tipo = req.query.tipo;

    // Construir la consulta SQL con un filtro por tipo de pregunta
    const consult = `SELECT * FROM ipreguntas WHERE tipo = ?`;

    try {
        db.query(consult, [tipo], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            } else {
                console.log('Resultados de la consulta:', results);
                res.json(results);
            }
        });
    } catch (e) {
        console.error('Error en la consulta:', e);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
};
