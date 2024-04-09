const db = require('../models/db');

const Formulario = function(formulario) {
    
};

Formulario.Preguntas = (req, res) => {
    // Suponiendo que el formulario solo tiene un ID único

    db.query("SELECT * FROM Preguntas", (err, preguntas) => {
        if (err) {
            console.error("Error al obtener las preguntas del formulario: ", err);
            res.status(500).json({ error: "Error al obtener las preguntas del formulario" });
            return;
        }
        
        res.json(preguntas);
    });
};

Formulario.VerRespuestas= async (req, res) => {
    const idAsignacion = req.params.id;
    const query = "SELECT * FROM Respuestas WHERE id_asignacion = ?";

    db.query(query, [idAsignacion], (err, result) => {
        if (err) {
            console.error("Error al obtener las respuestas: ", err);
            res.status(500).json({ error: "Error al obtener las respuestas" });
            return;
        } 
        res.json(result);
  });
}

Formulario.Respuestas = (req, res) => {
    const idAsignacion = req.params.id;
    const { id_pregunta, respuesta } = req.body; // Suponiendo que recibes id_pregunta y respuesta en el cuerpo de la solicitud
    console.log(idAsignacion);
    const query = `INSERT INTO Respuestas (id_pregunta, id_asignacion, respuesta)
                   VALUES (?, ?, ?)
                   ON DUPLICATE KEY UPDATE respuesta = VALUES(respuesta);`;

    db.query(query, [id_pregunta, idAsignacion, respuesta], (err, result) => {
        if (err) {
            console.error("Error al insertar o actualizar respuesta:", err);
            res.status(500).json({ error: "Error al insertar o actualizar respuesta" });
            return;
        } 

        console.log("Respuesta insertada o actualizada correctamente.");
        res.json(result);
    });
}

module.exports = Formulario;