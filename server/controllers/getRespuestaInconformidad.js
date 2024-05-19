const db = require('../models/db');

const getRespuestaInconformidad = (req, res) => {
    const { id_pregunta, id_auditoria } = req.params;

    const query = `SELECT respuesta FROM Respuestas WHERE id_pregunta = ? AND id_auditoria = ?`;

    db.query(query, [id_pregunta, id_auditoria], (err, result) => {
        if (err) {
            console.error("Error al obtener la respuesta de inconformidad:", err);
            res.status(500).json({ error: "Error interno del servidor" });
            return;
        }
        if (result.length === 0) {
            // Si no hay resultados, significa que la respuesta aún no ha sido registrada
            res.json({ respuesta: null });
        } else {
            res.json({ respuesta: result[0].respuesta });
        }
    });
};

module.exports = {
    getRespuestaInconformidad,
};
