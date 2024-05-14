const db = require('../models/db');

const insertRespuestas = (req, res) => {
    const { id_auditoria, respuestas } = req.body;
    const fecha_respuesta = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD

    const queries = Object.entries(respuestas).map(([id_pregunta, respuesta]) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO Respuestas (id_pregunta, id_auditoria, respuesta, fecha_respuesta)
                VALUES (?, ?, ?, CURDATE());
            `;
            db.query(query, [id_pregunta, id_auditoria, respuesta], (err, result) => {
                if (err) {
                    console.error("Error al insertar la respuesta: ", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(queries)
        .then(() => res.status(200).json({ message: "Respuestas insertadas correctamente" }))
        .catch((error) => res.status(500).json({ error: "Error en la inserción de respuestas" }));
};

module.exports = {
    insertRespuestas,
};
