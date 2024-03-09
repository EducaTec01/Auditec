const db = require('../models/db');

const Departamento = function(departamento) {
    this.nombre = departamento.nombre;
};

Departamento.getAll = (req, res) => {
    db.query("SELECT * FROM Departamentos", (err, result) => {
        if (err) {
            console.error("Error al obtener los departamentos: ", err);
            res.status(500).json({ error: "Error al obtener los departamentos" });
            return;
        }

        console.log("Departamentos encontrados: ", result);
        res.json(result);
    });
};

module.exports = Departamento;