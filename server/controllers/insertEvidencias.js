const db = require('../models/db');
const fs = require('fs');

const insertEvidencias = (req, res) => {
    const { id_auditoria, respuestas, genera_inconformidad } = req.body;
    const parsedRespuestas = JSON.parse(respuestas);
    const parsedGeneraInconformidad = JSON.parse(genera_inconformidad);
    const files = req.files;

    const query = `
        INSERT INTO Evidencias (id_pregunta, id_auditoria, evidencia)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE evidencia = VALUES(evidencia);
    `;

    const insertPromises = Object.keys(files).map(key => {
        const id_pregunta = key.split('_')[1]; // Obtener el id_pregunta de la clave del archivo
        const file = files[key][0]; // Obtener el objeto de archivo

        // Convertir el archivo PDF a base64
        return new Promise((resolve, reject) => {
            fs.readFile(file.path, (err, data) => {
                if (err) {
                    console.error("Error al leer el archivo PDF: ", err);
                    reject(err);
                } else {
                    const base64Data = Buffer.from(data).toString('base64');
                    db.query(query, [id_pregunta, id_auditoria, base64Data], (err, result) => {
                        if (err) {
                            console.error("Error al insertar o actualizar la evidencia: ", err);
                            reject(err);
                        }
                        resolve(result);
                    });
                }
            });
        });
    });

    Promise.all(insertPromises)
        .then(() => {
            res.status(200).json({ message: "Evidencias insertadas/actualizadas correctamente" });
        })
        .catch(err => {
            res.status(500).json({ error: "Error al insertar/actualizar evidencias" });
        });
};

module.exports = {
    insertEvidencias,
};
