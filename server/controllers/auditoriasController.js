const db = require('../models/db');

const Auditoria = {};

Auditoria.getAll = (req, res) => {
    db.query("SELECT a.id AS id, s.nombre AS nombre_seccion, l.nombre AS nombre_auditado, a.fecha_inicio, a.fecha_final, a.id_departamento, d.nombre AS nombre_departamento, a.estado FROM Auditoria a JOIN Seccion s ON a.id_seccion = s.id JOIN Login l ON a.id_auditado = l.id JOIN Departamentos d ON a.id_departamento = d.id WHERE a.estado = 'ACTIVA'", 
    (err, result) => {
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

Auditoria.getAllById = (req, res) => {
    const { id } = req.params; // Extrae el nombre de los parámetros de la ruta
    console.log(id)
    const query = `SELECT Auditoria.id, 
                    Auditoria.id_departamento, 
                    Departamentos.nombre AS nombre_departamento,
                    Auditoria.id_auditado, 
                    Login.nombre As nombre_auditado,
                    Auditoria.id_seccion, 
                    Seccion.nombre AS nombre_seccion, 
                    Auditoria.fecha_final 
                  FROM Auditoria 
                  JOIN Login ON Auditoria.id_auditado = Login.id
                  JOIN Seccion ON Auditoria.id_seccion = Seccion.id 
                  JOIN Departamentos ON Auditoria.id_departamento = Departamentos.id
                  WHERE Auditoria.id_auditor = ?`;
  
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error al obtener las asignaciones: ", err);
            res.status(500).json({ error: "Error al obtener las asignaciones" });
            return;
        }
  
        console.log("Asignaciones encontradas: ", result);
        res.json(result);
    });
  };

Auditoria.getDetailedAuditById = (req, res) => {
    const auditoriaId = req.params.id;
    const query = `
        SELECT 
            a.fecha_final,
            ss.nombre AS subseccion_nombre,
            a.id_auditado,
            auditado.nombre AS auditado_nombre,
            a.id_auditor,
            auditor.nombre AS auditor_nombre,
            s.nombre AS seccion_nombre,
            a.fecha_inicio,
            d.nombre AS departamento_nombre
            asub.nomenclatura AS nomenclatura_audi
        FROM Auditoria a
        JOIN Seccion s ON a.id_seccion = s.id
        JOIN Login auditado ON a.id_auditado = auditado.id
        JOIN Login auditor ON a.id_auditor = auditor.id
        JOIN Auditoria_subsecciones asub ON a.id = asub.id_auditoria
        JOIN Subseccion ss ON asub.id_subseccion = ss.id
        JOIN Departamentos d ON a.id_departamento = d.id
        WHERE a.id = ?
    `;

    db.query(query, [auditoriaId], (err, result) => {
        if (err) {
            console.error("Error al obtener la auditoría detallada: ", err);
            res.status(500).json({ error: "Error al obtener la auditoría detallada" });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: "Auditoría no encontrada" });
            return;
        }

        res.json(result);
    });
};
//Crear la auditoria con cada una de sus subsecciones
Auditoria.create = (req, res) => {
    const { idSeccion, idEncargado, fechaInicio, fechaFinal, idDepartamento, idAuditor, subsecciones } = req.body;

    // Consulta SQL para verificar si ya existe una auditoría para ese departamento, esa sección y esas fechas
    const checkAuditoriaQuery = "SELECT COUNT(*) AS count FROM Auditoria WHERE id_departamento = ? AND estado = 'ACTIVA' AND id_seccion = ? AND ((fecha_inicio BETWEEN ? AND ?) OR (fecha_final BETWEEN ? AND ?))";

    db.query(
        checkAuditoriaQuery,
        [idDepartamento, idSeccion, fechaInicio, fechaFinal, fechaInicio, fechaFinal],
        (err, result) => {
            if (err) {
                console.error("Error al verificar la existencia de la auditoría: ", err);
                res.status(500).json({ error: "Error al verificar la existencia de la auditoría" });
                return;
            }

            const count = result[0].count;

            if (count > 0) {
                console.error("Ya existe una auditoría para este departamento, esta sección y estas fechas.");
                res.status(400).json({ error: "Ya existe una auditoría para este departamento, esta sección y estas fechas." });
                return;
            }

            // Si no existe una auditoría para ese departamento, esa sección y esas fechas, iniciar la transacción
            db.beginTransaction((err) => {
                if (err) {
                    console.error("Error al iniciar la transacción: ", err);
                    res.status(500).json({ error: "Error al iniciar la transacción" });
                    return;
                }

                // Insertar la auditoría principal en la tabla Auditoria
                db.query(
                    "INSERT INTO Auditoria (id_seccion, id_auditado, id_auditor, fecha_inicio, fecha_final, id_departamento, estado) VALUES (?, ?, ?, ?, ?, ?,'ACTIVA')",
                    [idSeccion, idEncargado, idAuditor, fechaInicio, fechaFinal, idDepartamento],
                    (err, result) => {
                        if (err) {
                            console.error("Error al crear la auditoria principal: ", err);
                            db.rollback(() => {
                                res.status(500).json({ error: "Error al crear la auditoria principal" });
                            });
                            return;
                        }

                        console.log("Auditoria principal creada: ", result);

                        // Obtener el ID de la auditoria principal recién creada
                        const idAuditoria = result.insertId;

                        // Insertar las subsecciones en la tabla Auditoria_subsecciones
                        const insertSubseccionesQuery = "INSERT INTO Auditoria_subsecciones (id_auditoria, id_subseccion, comentarios, nomenclatura, estado) VALUES (?, ?, ?, ?, 'ACTIVA')";

                        subsecciones.forEach((subseccion) => {
                            db.query(
                                insertSubseccionesQuery,
                                [idAuditoria, subseccion.idSubseccion, subseccion.comentarios, subseccion.nomenclatura],
                                (err, result) => {
                                    if (err) {
                                        console.error("Error al insertar subsección: ", err);
                                        db.rollback(() => {
                                            res.status(500).json({ error: "Error al insertar subsección" });
                                        });
                                        return;
                                    }

                                    console.log("Subsección insertada: ", result);
                                }
                            );
                        });

                        // Confirmar la transacción
                        db.commit((err) => {
                            if (err) {
                                console.error("Error al confirmar la transacción: ", err);
                                db.rollback(() => {
                                    res.status(500).json({ error: "Error al confirmar la transacción" });
                                });
                                return;
                            }

                            console.log("Transacción completada exitosamente.");
                            res.json({ message: "Auditoría y subsecciones creadas exitosamente" });
                        });
                    }
                );
            });
        }
    );
};



Auditoria.findDepartamento = (req, res) => {
    const fechaInicio = req.query.fechaInicio;
    const fechaFinal = req.query.fechaFinal;
    const idSeccion = req.query.seccion;

    db.query("SELECT * FROM Departamentos d WHERE NOT EXISTS (SELECT 1 FROM Auditoria a WHERE (a.id_departamento = d.id AND a.estado = 'ACTIVA' AND a.fecha_inicio <= ? AND a.fecha_final >= ?) AND a.id_seccion = ?)",
    [fechaFinal,fechaInicio,idSeccion], (err, result) => {    
        if (err) {
            console.error("Error al obtener los departamentos: ", err);
            res.status(500).json({ error: "Error al obtener los departamentos" });
            return;
        }
        res.json(result);
    });
};

Auditoria.auditor = (req, res) => {
    db.query("SELECT id, nombre FROM Login WHERE Acceso = 'Auditor'", (err, result) => {
        if (err) {
            console.error("Error al obtener los auditores: ", err);
            res.status(500).json({ error: "Error al obtener los auditores" });
            return;
        }
        res.json(result);
    });
}

Auditoria.auditado = (req, res) => {
    db.query("SELECT id, nombre FROM Login WHERE Acceso = 'auditado'", (err, result) => {
        if (err) {
            console.error("Error al obtener los auditados: ", err);
            res.status(500).json({ error: "Error al obtener los auditados" });
            return;
        }
        res.json(result);
    });
}

Auditoria.findById = (req, res) => {
    const asignacionId = req.params.id;
    db.query(`
        SELECT 
            aud.id AS id_auditoria,
            aud.fecha_inicio,
            aud.fecha_final,
            aud.estado,
            dep.nombre AS nombre_departamento,
            aud.id_seccion,
            sec.nombre AS nombre_seccion,
            aud.id_auditado,
            aud.id_auditor,
            aud.id_departamento,
            aud.id_seccion,
            au.nombre AS nombre_auditor,
            au2.nombre AS nombre_auditado
        FROM 
            Auditoria aud
        INNER JOIN 
            Departamentos dep ON aud.id_departamento = dep.id
        INNER JOIN 
            Seccion sec ON aud.id_seccion = sec.id
        INNER JOIN 
            Login au ON aud.id_auditor = au.id
        INNER JOIN 
            Login au2 ON aud.id_auditado = au2.id
        WHERE 
            aud.id = ?`, asignacionId, (err, result) => {
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

Auditoria.findsubById = (req, res) => {
    const asignacionId = req.params.id;
    db.query(`SELECT * FROM Auditoria_subsecciones WHERE id = ?`, asignacionId, (err, result) => {
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


module.exports = Auditoria;
