const db = require('../models/db');

const updateRespuestaInconformidad = (id_pregunta, id_auditoria, respuesta, callback) => {
    const query = `UPDATE Respuestas SET respuesta = ?, fecha_respuesta = CURDATE() WHERE id_pregunta = ? AND id_auditoria = ?`;

    db.query(query, [respuesta, id_pregunta, id_auditoria], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
};

module.exports = {
    updateRespuestaInconformidad
};
