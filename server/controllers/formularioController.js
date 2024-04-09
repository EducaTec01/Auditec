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

        console.log("Preguntas encontradas para el formulario", ": ", preguntas);
        
        res.json(preguntas);
    });
};

module.exports = Formulario;