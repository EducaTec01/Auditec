const db = require('../models/db');

module.exports.vigencias = (req, res) => {
    const mesActual = new Date().getMonth() + 1; 
    const añoActual = new Date().getFullYear();

    let consult;

    if (mesActual <= 6) {
        // Si estamos en el primer semestre del año
        consult = `SELECT * FROM Asignacion WHERE YEAR(fecha_inicio) = ${añoActual} AND MONTH(fecha_inicio) <= 6`;
    } else {
        // Si estamos en el segundo semestre del año
        consult = `SELECT * FROM Asignacion WHERE YEAR(fecha_inicio) = ${añoActual} AND MONTH(fecha_inicio) > 6`;
    }

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
        console.error('Error:', e);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
}
