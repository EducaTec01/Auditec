const express = require('express');
const router = express.Router();

const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController')
const Asignacion = require('../controllers/asignacionController');
const Departamento = require('../controllers/departamentosController');

const Usuario = require('../controllers/usuariosController');

router.get('/ping', ping);

router.post('/login', login);

router.get('/asignacionesgetAll', Asignacion.getAll);
router.post('/asignacionesCreate', Asignacion.create);
router.get('/asignacion/:id', Asignacion.findById);
router.delete('/asignacion/delete/:id', Asignacion.delete);
router.put('/asignacion/update/:id', Asignacion.updateById);
router.get('/departamentos', Departamento.getAll);

router.get('/usuariogetAll', Usuario.getAll);
router.post('/usuarioCreate', Usuario.create);
router.get('/usuario/:id', Usuario.findById);
router.delete('/usuario/delete/:id', Usuario.delete);
router.put('/usuario/update/:id', Usuario.updateById);
router.get('/usuarioNombres', Usuario.getAllNames);

module.exports = router;