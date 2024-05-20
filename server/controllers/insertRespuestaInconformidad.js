const db = require('../models/db');

const insertRespuestaInconformidad = (id_pregunta, id_auditoria, respuesta, callback) => {
    const query = `INSERT INTO Respuestas (id_pregunta, id_auditoria, respuesta, fecha_respuesta) VALUES (?, ?, ?, CURDATE())`;

    db.query(query, [id_pregunta, id_auditoria, respuesta], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
};

module.exports = {
    insertRespuestaInconformidad
};
