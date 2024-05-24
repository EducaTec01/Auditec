// getEvidencias.js

const db = require('../models/db'); // Ajusta la ruta según la ubicación real del archivo db

const getEvidencias = async (req, res) => {
    try {
        // Verificar si db está definido
        if (!db) {
            throw new Error('No se ha definido la conexión a la base de datos');
        }

        // Lógica para obtener las evidencias seleccionando solo las columnas necesarias
        const evidencias = await db.query('SELECT id, id_auditoria, id_pregunta, evidencia FROM Evidencias');

        res.json(evidencias);
    } catch (error) {
        console.error('Error al obtener las evidencias:', error);
        res.status(500).json({ error: 'Error al obtener las evidencias' });
    }
};

module.exports = {
    getEvidencias,
};
