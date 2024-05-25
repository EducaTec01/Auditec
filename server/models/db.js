const mysql = require("mysql");

const db = mysql.createConnection({
    host:"nodedatabase.cpskimkeuqq9.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"password",
    database:"nodedatabase",
}); 

module.exports = db;