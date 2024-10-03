const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user:"root2",
    password:"C0MUN25xz!",
    database:"AuditoriaPrueba",
}); 

module.exports = db;