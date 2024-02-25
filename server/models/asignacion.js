const Asignacion = require('../models/asignacion');

// Controlador para crear una nueva asignación
exports.create = async (req, res) => {
    try {
        const nuevaAsignacion = new Asignacion(req.body);
        await nuevaAsignacion.save();
        res.status(201).send(nuevaAsignacion);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Controlador para obtener todas las asignaciones
exports.readAll = async (req, res) => {
    try {
        const asignaciones = await Asignacion.find({});
        res.send(asignaciones);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Controlador para obtener una asignación por su ID
exports.readOne = async (req, res) => {
    try {
        const asignacion = await Asignacion.findById(req.params.id);
        if (!asignacion) {
            return res.status(404).send('Asignación no encontrada');
        }
        res.send(asignacion);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Controlador para actualizar una asignación por su ID
exports.update = async (req, res) => {
    try {
        const asignacion = await Asignacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(asignacion);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Controlador para eliminar una asignación por su ID
exports.delete = async (req, res) => {
    try {
        const asignacion = await Asignacion.findByIdAndDelete(req.params.id);
        if (!asignacion) {
            return res.status(404).send('Asignación no encontrada');
        }
        res.send(asignacion);
    } catch (error) {
        res.status(500).send(error);
    }
};