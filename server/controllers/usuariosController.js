const db = require('../models/db');

const Usuario = function(usuario) {
  this.id = usuario.id;
  this.nombre = usuario.nombre;
  this.user = usuario.user;
  this.password = usuario.password;
  this.correoElectronico = usuario.correoElectronico;
  this.Acceso = usuario.Acceso;
};

// Método para crear un nuevo usuario
Usuario.create = (req, res) => {
  const { user, password, correoElectronico, nombre, Acceso } = req.body;
  db.query(
      "INSERT INTO Login (user, password, correoElectronico, nombre, Acceso) VALUES (?, ?, ?, ?, ?)",
      [user, password, correoElectronico, nombre, Acceso],
      (err, result) => {
          if (err) {
              console.error("Error al crear el usuario: ", err);
              res.status(500).json({ error: "Error al crear el usuario" });
              return;
          }
          console.log("Usuario creado: ", result);
          res.json(result);
      }
  );
};


Usuario.updateById = (req, res) => {
    const id = req.params.id; // Obtiene el ID de la asignación de los parámetros de la solicitud
  
    const { user, password, correoElectronico, nombre } = req.body;
  
    db.query(
      "UPDATE Login SET user = ?, password = ?, correoElectronico = ?, nombre = ? WHERE id = ?",
      [user, password, correoElectronico, nombre, id],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar el usuario: ", err);
          return res.status(500).json({ error: "Error interno del servidor" });
        }
  
        if (result.affectedRows === 0) {
          // No se encontró ninguna asignación con el ID especificado
          return res.status(404).json({ error: "usuario no encontrado" });
        } else {
          console.log("Usuario actualizado correctamente");
          return res.status(200).json({ message: "Usuario actualizado correctamente" });
        }
      }
    );
};

Usuario.getAll = (req, res) => {
  db.query("SELECT * FROM Login WHERE Acceso != 'Jefa' AND Acceso !='INACTIVO'", (err, result) => {
      if (err) {
          console.error("Error al obtener los usuarios: ", err);
          res.status(500).json({ error: "Error al obtener los usuarios" });
          return;
      }
      console.log("Usuarios encontrados: ", result);
      res.json(result);
  });
};

Usuario.findById = (req, res) => {
    const usuarioId = req.params.id;
    db.query(`SELECT * FROM Login WHERE id = ?`, usuarioId, (err, result) => {
      if (err) {
        console.error("Error al encontrar el usuario: ", err);
        res.status(500).json({ error: "Error al encontrar el usuario" });
        return;
      }
  
      if (result.length === 0) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }
  
      res.json(result[0]);
    });
};

// Método para cambiar el acceso de un usuario a 'INACTIVO' por su ID
Usuario.delete = (req, res) => {
  const { id } = req.params;
  db.query(
      "UPDATE Login SET Acceso = 'INACTIVO' WHERE id = ?",
      [id],
      (err, result) => {
          if (err) {
              console.error("Error al cambiar el acceso del usuario: ", err);
              res.status(500).json({ error: "Error al cambiar el acceso del usuario" });
              return;
          }
          console.log("Acceso del usuario cambiado a INACTIVO: ", result);
          res.json(result);
      }
  );
};

Usuario.getAllNames = (req, res) => {
  db.query("SELECT nombre FROM Login WHERE Acceso = 'Auditor'", (err, result) => {
      if (err) {
          console.error("Error al obtener los nombres de usuario: ", err);
          res.status(500).json({ error: "Error al obtener los nombres de usuario" });
          return;
      }

      console.log("Nombres de usuario encontrados: ", result);
      res.json(result);
  });
};

Usuario.getAllAcceso = (req, res) => {
  db.query("SELECT Acceso FROM Login", (err, result) => {
    if (err) {
        console.error("Error al obtener los nombres de Acceso: ", err);
        res.status(500).json({ error: "Error al obtener los nombres de Acceso" });
        return;
    }

    const nombresAcceso = result.map(row => row.Acceso); // Extrae los nombres de acceso de los resultados

    console.log("Nombres de Acceso encontrados: ", nombresAcceso);
    res.json(nombresAcceso); // Devuelve solo los nombres de acceso
});
};

// Método para verificar si un nombre de usuario ya existe
Usuario.checkUsername = (req, res) => {
  const { nombreUsuario } = req.params;
  db.query(
      "SELECT COUNT(*) AS count FROM Login WHERE user = ?",
      [nombreUsuario],
      (err, result) => {
          if (err) {
              console.error("Error al verificar el nombre de usuario: ", err);
              res.status(500).json({ error: "Error al verificar el nombre de usuario" });
              return;
          }
          const exists = result[0].count > 0;
          res.json({ exists });
      }
  );
};


module.exports = Usuario;