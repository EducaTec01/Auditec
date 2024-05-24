const descargarEvidencia = async (req, res) => {
    const { id_auditoria, id_pregunta } = req.params;

    try {
        const [evidencia] = await db.pool.query('SELECT evidencia FROM Evidencias WHERE id_auditoria = ? AND id_pregunta = ?', [id_auditoria, id_pregunta]);
        
        if (!evidencia || evidencia.length === 0) {
            return res.status(404).json({ error: 'Evidencia no encontrada' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="evidencia_pregunta_${id_pregunta}.pdf"`);
        res.send(evidencia[0].evidencia);
    } catch (error) {
        console.error('Error al descargar la evidencia:', error);
        res.status(500).json({ error: 'Error al descargar la evidencia' });
    }
};

module.exports = {
    descargarEvidencia,
};
