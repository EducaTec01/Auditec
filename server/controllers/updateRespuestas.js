const db = require('../models/db');

const updateRespuestas = (req, res) => {
    const { id_auditoria, respuestas } = req.body;

    const queries = Object.entries(respuestas).map(([id_pregunta, respuesta]) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE Respuestas
                SET respuesta = ?, fecha_respuesta = CURDATE()
                WHERE id_pregunta = ? AND id_auditoria = ?;
            `;
            db.query(query, [respuesta, id_pregunta, id_auditoria], (err, result) => {
                if (err) {
                    console.error("Error al actualizar la respuesta: ", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(queries)
        .then(() => res.status(200).json({ message: "Respuestas actualizadas correctamente" }))
        .catch((error) => res.status(500).json({ error: "Error en la actualización de respuestas" }));
};

module.exports = {
    updateRespuestas,
};
