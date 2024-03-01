const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { rhistorial } = require('../controllers/rhistorialController');
const { vigencias } = require('../controllers/vigenciasController');
const { inconformidades } = require('../controllers/inconformidadesController');

router.get('/ping', ping);
router.get('/rhistorial', rhistorial);  
router.get('/vigencias', vigencias);  
router.get('/inconformidades', inconformidades);



module.exports = router;