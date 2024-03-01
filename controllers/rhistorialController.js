const db = require('../models/db')

module.exports.rhistorial = (req, res) =>{
    const consult = 'SELECT * FROM Auditorias';

    try{
        db.query(consult, (err, results) =>{
            console.log(results)
            res.json(results)
        });

    }catch(e){

    }
}