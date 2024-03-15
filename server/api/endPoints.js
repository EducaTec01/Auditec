const express = require('express');
const router = express.Router();

const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { rhistorial } = require('../controllers/rhistorialController');
const { preguntas } = require('../controllers/preguntasController');
const {ppreguntas} = require('../controllers/ppreguntasController');    
const {ipreguntas} = require('../controllers/ipreguntasController');   
const { vigencias } = require('../controllers/vigenciasController');    
const { inconformidades } = require('../controllers/inconformidadesController');    
const Asignacion = require('../controllers/asignacionController');

router.get('/ping', ping);

router.post('/login', login);
router.get('/rhistorial', rhistorial);  
router.get('/preguntas', preguntas);
router.get('/ppreguntas', ppreguntas);
router.get('/ipreguntas', ipreguntas);  
router.get('/vigencias', vigencias);  
router.get('/inconformidades', inconformidades);

router.get('/asignacionesgetAll', Asignacion.getAll);
router.post('/asignacionesCreate', Asignacion.create);

module.exports = router;