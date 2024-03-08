const express = require('express');
const router = express.Router();

const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController')
const Asignacion = require('../controllers/asignacionController');

router.get('/ping', ping);

router.post('/login', login);

router.get('/asignacionesgetAll', Asignacion.getAll);
router.post('/asignacionesCreate', Asignacion.create);
router.get('/asignacion/:id', Asignacion.findById);

module.exports = router;