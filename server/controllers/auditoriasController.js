const db = require('../models/db');

const Auditoria = {};

Auditoria.getAll = (req, res) => {
    db.query("SELECT A.*, D.nombre AS nombre_departamento FROM Auditoria A JOIN Departamentos D ON A.id_departamentos = D.id WHERE A.estado != 'ELIMINADA'", (err, result) => {
        if (err) {
            console.error("Error al obtener las auditorias: ", err);
            res.status(500).json({ error: "Error al obtener las auditorias" });
            return;
        }
        console.log("Auditorias encontradas: ", result);
        res.json(result);
    });
};

Auditoria.checkRoomname = (req, res) => {
    const { nombreAuditoria, idAuditoria } = req.params;
    db.query("SELECT COUNT(*) AS count FROM Auditoria WHERE nombreAuditoria = ? AND id != ?", [nombreAuditoria, idAuditoria], (err, result) => {
        if (err) {
            console.error("Error al verificar el nombre de la auditoria:", err);
            res.status(500).json({ error: "Error al verificar el nombre de la auditoria" });
            return;
        }
        res.json({ exists: result[0].count > 0 });
    });
};

Auditoria.delete = (req, res) => {
    const id_auditoria = req.params.id;

    // Actualizar el estado de la auditoría a 'ELIMINADA'
    db.query("UPDATE Auditoria SET estado = 'ELIMINADA' WHERE id = ?", [id_auditoria], (err, result) => {
        if (err) {
            console.error("Error al cambiar el estado de la auditoría:", err);
            res.status(500).json({ error: "Error al cambiar el estado de la auditoría" });
            return;
        }
        console.log("Estado de la auditoría cambiado a 'ELIMINADA'.");
        res.json({ message: "Estado de la auditoría cambiado a 'ELIMINADA'." });
    });
};



Auditoria.updateById = (req, res) => {
    const { idAuditoria } = req.params;
    const { nombreAuditoria, Descripcion, horarioInicio, horarioFinal } = req.body;

    // Actualizar las citas asociadas a esta auditoria
    db.query(
        "UPDATE Citas SET nombreAuditoria = ?, Descripcion = ?, horarioInicio = ?, horarioFinal = ? WHERE id = ?",
        [nombreAuditoria, Descripcion, horarioInicio, horarioFinal, idAuditoria],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar las citas asociadas a la auditoria: ", err);
                res.status(500).json({ error: "Error al actualizar las citas asociadas a la auditoria" });
                return;
            }
            res.json(result);
        }
    );
};

Auditoria.seccion = (req, res) => {
    db.query("SELECT * FROM Seccion", (err, result) => {
        if (err) {
            console.error("Error al obtener las secciones: ", err);
            res.status(500).json({ error: "Error al obtener las secciones" });
            return;
        }

        res.json(result);
    });
};

Auditoria.subseccion = (req,res)=> {
    const idseccion = req.query.idseccion;
    db.query("SELECT * FROM Subseccion Where idseccion = ?",[idseccion], (err, result) => {
        if (err) {
            console.error("Error al obtener las subsecciones: ", err);
            res.status(500).json({ error: "Error al obtener las subsecciones" });
            return;
        }

        res.json(result);
    });
};

Auditoria.create = (req, res) => {
    const { nombreAuditoria, Descripcion, horarioInicio, horarioFinal } = req.body;
    db.query(
        "INSERT INTO Auditoria (nombreAuditoria, Descripcion, horarioInicio, horarioFinal) VALUES (?, ?, ?, ?)",
        [nombreAuditoria, Descripcion, horarioInicio, horarioFinal],
        (err, result) => {
            if (err) {
                console.error("Error al crear la auditoria: ", err);
                res.status(500).json({ error: "Error al crear la auditoria" });
                return;
            }
            console.log("Auditoria creada: ", result);
            res.json(result);
        }
    );
};

Auditoria.findDepartamento = (req, res) => {
    const fechaInicio = req.query.fechaInicio;
    const fechaFinal = req.query.fechaFinal;
    const idSeccion = req.query.seccion;

    db.query("SELECT d.nombre AS nombre FROM Departamentos d WHERE d.id NOT IN (SELECT a.id_departamento FROM Auditoria a WHERE (a.id_seccion = ? AND a.fecha_inicio <= ? AND a.fecha_final >= ?) OR (a.id_seccion = ? AND a.fecha_inicio <= ? AND a.fecha_final >= ?))",[idSeccion,fechaInicio,fechaInicio,idSeccion,fechaFinal,fechaFinal], (err, result) => {
        if (err) {
            console.error("Error al obtener los departamentos: ", err);
            res.status(500).json({ error: "Error al obtener los departamentos" });
            return;
        }

        console.log("Departamentos encontrados: ", result);
        res.json(result);
    });
};

module.exports = Auditoria;
