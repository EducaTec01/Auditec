const express = require('express');
const router = express.Router();

const asignacionController = require('../controllers/asignacionController');

// Rutas para CRUD de asignaciones
   router.post('/asignaciones', asignacionController.create);
   router.get('/asignaciones', asignacionController.getAll);
   router.get('/asignaciones/:id', asignacionController.findById);
   router.patch('/asignaciones/:id', asignacionController.updateById);
   router.delete('/asignaciones/:id', asignacionController.remove);



module.exports = router;