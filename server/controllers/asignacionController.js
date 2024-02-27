const db = require('../database/db');

const Asignacion = function(asignacion) {
    this.numero = asignacion.numero;
    this.fecha = asignacion.fecha;
    this.estado = asignacion.estado;
};

Asignacion.create = (nuevaAsignacion, result) => {
    db.query("INSERT INTO asignaciones SET ?", nuevaAsignacion, (err, res) => {
        if (err) {
            console.error("Error al crear una nueva asignación: ", err);
            result(err, null);
            return;
        }

        console.log("Nueva asignación creada: ", { id: res.insertId, ...nuevaAsignacion });
        result(null, { id: res.insertId, ...nuevaAsignacion });
    });
};

Asignacion.getAll = result => {
    db.query("SELECT * FROM asignaciones", (err, res) => {
        if (err) {
            console.error("Error al obtener las asignaciones: ", err);
            result(null, err);
            return;
        }

        console.log("Asignaciones encontradas: ", res);
        result(null, res);
    });
};

Asignacion.findById = (asignacionId, result) => {
    db.query(`SELECT * FROM asignaciones WHERE id = ${asignacionId}`, (err, res) => {
        if (err) {
            console.error("Error al encontrar la asignación: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Asignación encontrada: ", res[0]);
            result(null, res[0]);
            return;
        }

        // No se encontró ninguna asignación con el ID especificado
        result({ kind: "not_found" }, null);
    });
};

Asignacion.updateById = (id, asignacion, result) => {
    db.query(
        "UPDATE asignaciones SET numero = ?, fecha = ?, estado = ? WHERE id = ?",
        [asignacion.numero, asignacion.fecha, asignacion.estado, id],
        (err, res) => {
            if (err) {
                console.error("Error al actualizar la asignación: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // No se encontró ninguna asignación con el ID especificado
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Asignación actualizada: ", { id: id, ...asignacion });
            result(null, { id: id, ...asignacion });
        }
    );
};

Asignacion.remove = (id, result) => {
    db.query("DELETE FROM asignaciones WHERE id = ?", id, (err, res) => {
        if (err) {
            console.error("Error al eliminar la asignación: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // No se encontró ninguna asignación con el ID especificado
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Asignación eliminada con ID: ", id);
        result(null, res);
    });
};

module.exports = Asignacion;