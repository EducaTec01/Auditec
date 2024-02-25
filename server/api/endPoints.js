const express = require('express');
const { ping } = require('../controllers/pingController');
const router = express.Router();

const asignacionController = require('../controller/asignacionController');

// Rutas para CRUD de asignaciones
router.post('/asignacion', asignacionController.create);
router.get('/asignacion', asignacionController.readAll);
router.get('/asignacion/:id', asignacionController.readOne);
router.patch('/asignacion/:id', asignacionController.update);
router.delete('/asignacion/:id', asignacionController.delete);


router.get('/ping', ping);

module.exports = router;