const db = require('../models/db');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('evidencia');

// Controlador para subir evidencias
const uploadEvidencia = (req, res) => {
    upload(req, res, (err) => {
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

// Controlador para descargar evidencias
const downloadEvidencia = (req, res) => {
    const { id_pregunta, id_auditoria } = req.params;

    const query = `
        SELECT evidencia
        FROM Evidencias
        WHERE id_pregunta = ? AND id_auditoria = ?;
    `;

    db.query(query, [id_pregunta, id_auditoria], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Evidencia no encontrada' });
        } else {
            const evidencia = results[0].evidencia;
            res.setHeader('Content-Disposition', 'attachment; filename=evidencia.pdf');
            res.setHeader('Content-Type', 'application/pdf');
            res.send(evidencia);
        }
    });
};

const checkEvidenciaExistence = (req, res) => {
    const { id_pregunta, id_auditoria } = req.params;

    const query = `
        SELECT COUNT(*) AS count
        FROM Evidencias
        WHERE id_pregunta = ? AND id_auditoria = ?;
    `;

    db.query(query, [id_pregunta, id_auditoria], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        } else {
            const exists = results[0].count > 0;
            res.status(200).json({ exists });
        }
    });
};

module.exports = {
    uploadEvidencia,
    downloadEvidencia,
    checkEvidenciaExistence
};