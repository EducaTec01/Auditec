const db = require('../models/db');
const multer = require('multer');

// Configuración de multer para el almacenamiento de archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('evidencia');

// Controlador para subir evidencias
const insertEvidencias = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error al subir el archivo:', err);
            return res.status(500).json({ error: 'Error al subir el archivo' });
        }

        const { id_pregunta, id_auditoria } = req.body;
        const evidencia = req.file.buffer;

        const query = `
            INSERT INTO Evidencias (id_pregunta, id_auditoria, evidencia)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE evidencia = VALUES(evidencia);
        `;

        db.query(query, [id_pregunta, id_auditoria, evidencia], (err, result) => {
            if (err) {
                console.error('Error en la consulta:', err);
                res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            } else {
                console.log('Evidencia subida exitosamente:', result);
                res.status(200).json({ message: 'Evidencia subida exitosamente' });
            }
        });
    });
};

module.exports = {
    insertEvidencias
};
