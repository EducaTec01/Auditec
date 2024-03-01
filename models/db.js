const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password",
    database: "Auditoria"
});

// Función para verificar el estado de la conexión
function checkDatabaseConnection() {
    if (connection.state === 'authenticated') {
        console.log('La conexión a la base de datos está establecida');
    } else {
        console.log('La conexión a la base de datos no está establecida');
        // Puedes elegir cómo manejar la falta de conexión
        // Por ejemplo, puedes intentar reconectar o mostrar un mensaje de error
    }
}

// Verificar el estado de la conexión en cualquier momento necesario
checkDatabaseConnection();

module.exports = connection;
