const db = require('../models/db');

const insertRespuestas = (req, res) => {
    const { id_auditoria, respuestas, genera_inconformidad } = req.body;
    const fecha_respuesta = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD

    const queries = Object.entries(respuestas).map(([id_pregunta, respuesta]) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO Respuestas (id_pregunta, id_auditoria, respuesta, genera_inconformidad, fecha_respuesta)
                VALUES (?, ?, ?, ?, CURDATE())
                ON DUPLICATE KEY UPDATE
                respuesta = VALUES(respuesta),
                genera_inconformidad = VALUES(genera_inconformidad),
                fecha_respuesta = VALUES(fecha_respuesta);
            `;
            db.query(query, [id_pregunta, id_auditoria, respuesta, genera_inconformidad[id_pregunta] ? 1 : 0, fecha_respuesta], (err, result) => {
                if (err) {
                    console.error("Error al insertar o actualizar la respuesta: ", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(queries)
        .then(() => res.status(200).json({ message: "Respuestas insertadas o actualizadas correctamente" }))
        .catch((error) => res.status(500).json({ error: "Error en la inserción o actualización de respuestas" }));
};

module.exports = {
    insertRespuestas,
};
