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

Asignacion.updateById = (req, res) => {
    const id = req.params.id; // Obtiene el ID de la asignación de los parámetros de la solicitud
    const asignacion = req.body; // Obtiene los datos actualizados de la asignación del cuerpo de la solicitud
  
    const { fecha_inicio, fecha_final, departamento, auditor, encargado, nomenclatura, comentarios, estado } = asignacion;
  
    db.query(
      "UPDATE Asignacion SET fecha_inicio = ?, fecha_final = ?, departamento = ?, auditor = ?, encargado = ?, nomenclatura = ?, comentarios = ?, estado = ? WHERE id = ?",
      [fecha_inicio, fecha_final, departamento, auditor, encargado, nomenclatura, comentarios, estado, id],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar la asignación: ", err);
          return res.status(500).json({ error: "Error interno del servidor" });
        }
  
        if (result.affectedRows === 0) {
          // No se encontró ninguna asignación con el ID especificado
          return res.status(404).json({ error: "Asignación no encontrada" });
        } else {
          console.log("Asignación actualizada correctamente");
          return res.status(200).json({ message: "Asignación actualizada correctamente" });
        }
      }
    );
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

Asignacion.getAllnom = (req, res) => {
  const { nombre } = req.params; // Extrae el nombre de los parámetros de la ruta
  console.log(nombre)
  const query = "SELECT * FROM Asignacion WHERE auditor = ?";

  db.query(query, [nombre], (err, result) => {
      if (err) {
          console.error("Error al obtener las asignaciones: ", err);
          res.status(500).json({ error: "Error al obtener las asignaciones" });
          return;
      }

      console.log("Asignaciones encontradas: ", result);
      res.json(result);
  });
};

Asignacion.getAllpast = (req, res) => {
  const query = "SELECT * FROM Asignacion WHERE fecha_final < CURDATE()";

  db.query(query, (err, result) => {
      if (err) {
          console.error("Error al obtener las asignaciones pasadas: ", err);
          res.status(500).json({ error: "Error al obtener las asignaciones pasadas" });
          return;
      }

      console.log("Asignaciones pasadas encontradas: ", result);
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

// Función para eliminar una asignación por ID
Asignacion.delete = (req, res) => {
    const asignacionId = req.params.id;
    const q = "DELETE FROM Asignacion WHERE id = ?"
    db.query(q, [asignacionId], (err, result) => {
        if (err) {
            console.error("Error al eliminar la asignación: ", err);
            res.status(500).json({ error: "Error al eliminar la asignación" });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Asignación no encontrada" });
            return;
        }

        console.log("Asignación eliminada con ID: ", asignacionId);
        res.json({ message: "Asignación eliminada correctamente" });
    });
};

module.exports = Asignacion;