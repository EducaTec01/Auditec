const db = require('../models/db');

const getPreguntasConInconformidad = (req, res) => {
    const query = `
        SELECT * 
        FROM Preguntas 
        WHERE genera_inconformidad = TRUE;`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error al obtener las preguntas: ", err);
            res.status(500).json({ error: "Error interno del servidor" });
            return;
        }

        res.json(result);
    });
};

module.exports = {
    getPreguntasConInconformidad,
};
