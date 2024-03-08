const db = require('../models/db');

const Asignacion = function(asignacion) {
    this.numero = asignacion.numero;
    this.fecha = asignacion.fecha;
    this.estado = asignacion.estado;
};

Asignacion.create = (nuevaAsignacion, res) => {
    const fecha_inicio = nuevaAsignacion.body.fecha_inicio;
    const fecha_final = nuevaAsignacion.body.fecha_final;
    const departamento = nuevaAsignacion.body.departamento;
    const auditor = nuevaAsignacion.body.auditor;
    const encargado = nuevaAsignacion.body.encargado;
    const nomenclatura = nuevaAsignacion.body.nomenclatura;
    const comentarios = nuevaAsignacion.body.comentarios;
    const estado = nuevaAsignacion.body.estado;

    console.log("Valores de nuevaAsignacion:", nuevaAsignacion.body.estado);
    db.query("INSERT INTO Asignacion (fecha_inicio, fecha_final, departamento, auditor, encargado, nomenclatura, comentarios, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [fecha_inicio, fecha_final, departamento, auditor, encargado, nomenclatura, comentarios, estado],
    (err, result) => {
        if (err) {
            console.error("Error al crear una nueva asignación: ", err);
            return result(err, null); // Devolvemos el error a la función de retorno de llamada
        }
        else{
            res.send("Empleado registrado con éxito");
        }
    
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