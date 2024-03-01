const connection = require('../models/db')


module.exports.ping = (req, res) =>{
    const consult = 'SELECT * FROM Login';

    try{
        connection.query(consult, (err, results) =>{
            console.log(results)
            res.json(results)
        });

    }catch(e){
        console.error('Error inesperado:', e);
        res.status(500).json({ error: 'Error inesperado' });
    }
}