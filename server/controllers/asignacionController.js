const db = require('../models/db');

const Asignacion = function(asignacion) {
    this.numero = asignacion.numero;
    this.fecha = asignacion.fecha;
    this.estado = asignacion.estado;
};

Asignacion.create = (nuevaAsignacion, result) => {
    const { fecha_inicio, fecha_final, departamento, auditor, encargado, nomenclatura, comentarios, estado } = nuevaAsignacion;
    db.query("INSERT INTO Asignacion (fecha_inicio, fecha_final, departamento, auditor, encargado, nomenclatura, comentarios, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [fecha_inicio, fecha_final, departamento, auditor, encargado, nomenclatura, comentarios, estado], (err, res) => {
        if (err) {
            console.error("Error al crear una nueva asignación: ", err);
            return result(err, null); // Devolvemos el error a la función de retorno de llamada
        }

        console.log("Nueva asignación creada: ", { id: res.insertId, ...nuevaAsignacion });
        result(null, { id: res.insertId, ...nuevaAsignacion }); // Devolvemos el resultado a la función de retorno de llamada
    });
};

Asignacion.getAll = (req, res) => {
    db.query("SELECT * FROM Asignacion", (err, result) => {
        if (err) {
            console.error("Error al obtener las asignaciones: ", err);
            res.status(500).json({ error: "Error al obtener las asignaciones" });
            return;
        }

        console.log("Asignaciones encontradas: ", result);
        res.json(result);
    });
};

Asignacion.findById = (req, res) => {
    const asignacionId = req.params.id;
    db.query(`SELECT * FROM Asignacion WHERE id = ?`, asignacionId, (err, result) => {
      if (err) {
        console.error("Error al encontrar la asignación: ", err);
        res.status(500).json({ error: "Error al encontrar la asignación" });
        return;
      }
  
      if (result.length === 0) {
        res.status(404).json({ error: "Asignación no encontrada" });
        return;
      }
  
      console.log("Asignación encontrada: ", result[0]);
      res.json(result[0]);
    });
  };
  

Asignacion.updateById = (id, asignacion, result) => {
    db.query(
        "UPDATE Asignacion SET numero = ?, fecha = ?, estado = ? WHERE id = ?",
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
    db.query("DELETE FROM Asignacion WHERE id = ?", id, (err, res) => {
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