const db = require('../models/db');

const getPreguntasByAuditoria = (req, res) => {
    const auditoriaId = req.params.id; // Obtiene la ID de la auditoría desde los parámetros de la ruta
    
    const query = `
        SELECT P.*, S.id AS subseccion_id, S.nombre AS subseccion_nombre, SE.id AS seccion_id, SE.nombre AS seccion_nombre
        FROM Preguntas P
        JOIN Subseccion S ON P.idseccion = S.idseccion AND P.idsubseccion = S.id
        JOIN Auditoria_subsecciones AS ASUB ON S.id = ASUB.id_subseccion
        JOIN Seccion SE ON S.idseccion = SE.id
        WHERE ASUB.id_auditoria = ?;
    `;
    
    db.query(query, [auditoriaId], (err, result) => {
        if (err) {
            console.error("Error al obtener las preguntas: ", err);
            res.status(500).json({ error: "Error interno del servidor" });
            return;
        }

        res.json(result);
    });
};

module.exports = {
    getPreguntasByAuditoria,
};
