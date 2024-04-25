const express = require('express');
const router = express.Router();

const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { rhistorial } = require('../controllers/rhistorialController');
const { preguntas } = require('../controllers/preguntasController');
const { ppreguntas} = require('../controllers/ppreguntasController');    
const { ipreguntas} = require('../controllers/ipreguntasController');   
const { vigencias } = require('../controllers/vigenciasController');    
const { inconformidades } = require('../controllers/inconformidadesController');    
const Asignacion = require('../controllers/asignacionController');
const Departamento = require('../controllers/departamentosController');

const Auditoria = require('../controllers/auditoriasController');

const Usuario = require('../controllers/usuariosController');

const Formulario = require('../controllers/formularioController'); 

router.get('/ping', ping);

/////////////////////////////////////Auditorias/////////////////////////////////////
router.get('/auditorias', Auditoria.getAll)
// Ruta para actualizar una auditoria por su id
router.put('/auditoria/:idAuditoria', Auditoria.updateById);
// Ruta para eliminar la auditoria
router.put('/auditoria/delete/:id', Auditoria.delete);
// Ruta para verificar si un nombre de auditoria ya existe
router.get('/auditoria/check-roomname/:nombreAuditoria/:idAuditoria', Auditoria.checkRoomname);
// Ruta para crear las auditorias
router.post('/auditoria/create', Auditoria.create);
// Ruta para obtener las secciones para la auditoria
router.get('/auditoria/seccion', Auditoria.seccion);
// Ruta para obtener los departamentos sin auditoria
router.get('/auditoria/departamento', Auditoria.findDepartamento);
// Ruta para obtener las subsecciones de la seccion
router.get('/auditoria/subseccion', Auditoria.subseccion);
// Ruta para obtener los auditores para la subseccion de la auditoria
router.get('/auditoria/auditor', Auditoria.auditor);
// Ruta para obtener los auditados para la subseccion de la auditoria
router.get('/auditoria/auditado', Auditoria.auditado);




router.post('/login', login);
router.get('/rhistorial', rhistorial);  
router.get('/preguntas', preguntas);
router.get('/ppreguntas', ppreguntas);
router.get('/ipreguntas', ipreguntas);  
router.get('/vigencias', vigencias);  
router.get('/inconformidades', inconformidades);

router.get('/asignacionesgetAll', Asignacion.getAll);
router.post('/asignacionesCreate', Asignacion.create);
router.get('/asignacion/:id', Asignacion.findById);
router.delete('/asignacion/delete/:id', Asignacion.delete);
router.put('/asignacion/update/:id', Asignacion.updateById);
router.get(`/asignacionesAllAuditor/:nombre`, Asignacion.getAllnom);
router.get('/asignacionesgetAllpast', Asignacion.getAllpast);

router.get('/usuarios', Usuario.getAll);
router.post('/usuario/create', Usuario.create);
router.get('/usuario/:id', Usuario.findById);
router.put('/usuario/delete/:id', Usuario.delete);
router.put('/usuario/update/:id', Usuario.updateById);
router.get('/usuarioNombres', Usuario.getAllNames);
router.get('/usuarioAcceso', Usuario.getAllAcceso);
// Ruta para verificar si un nombre de usuario ya existe
router.get('/usuario/check-username/:nombreUsuario', Usuario.checkUsername);

router.get('/formulario/preguntas', Formulario.Preguntas);
router.get('/formulario/:id/respuestas', Formulario.VerRespuestas);

router.post('/formulario/:id/respuestasUpdate', Formulario.Respuestas);

module.exports = router;