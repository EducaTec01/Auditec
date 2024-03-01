const db = require('../models/db');

module.exports.vigencias= (req, res) => {
    const consult = 'SELECT * FROM Asignacion WHERE fecha_inicio >= DATE_ADD(CURDATE(), INTERVAL -4 MONTH)';

    try {
        db.query(consult, (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            } else {
                console.log('Resultados de la consulta:', results);
                res.json(results);
            }
        });
    } catch (e) {
        
    }
};