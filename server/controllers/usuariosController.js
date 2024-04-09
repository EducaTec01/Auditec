const db = require('../models/db');

const Usuario = function(usuario) {
  this.id = usuario.id;
  this.nombre = usuario.nombre;
  this.user = usuario.user;
  this.password = usuario.password;
  this.correoElectronico = usuario.correoElectronico;
  this.Acceso = usuario.Acceso;
};

Usuario.create = (nuevoUsuario, res) => {
    const password = nuevoUsuario.body.contraseña;
    const nombre = nuevoUsuario.body.nombre;
    const user = nuevoUsuario.body.usuario;
    const correoElectronico = nuevoUsuario.body.correoElectronico;
    const Acceso = nuevoUsuario.body.acceso

    if (!contraseña || !nombre || !usuario || !correoElectronico || !acceso) {
      return res.status(400).send("Todos los campos son obligatorios.");
  }
    // console.log("Valores de nuevoUsuario:", nuevoUsuario.body.estado);
    db.query("INSERT INTO Login (user, password, correoElectronico, nombre, Acceso) VALUES (?, ?, ?, ?, ?)", [usuario, contraseña, correoElectronico, nombre, acceso],
    (err, result) => {
        if (err) {
            console.error("Error al crear un nuevo usuario: ", err);
            return res.status(500).send("Error al crear un nuevo usuario."); // Devolvemos el error al frontend
        }
        else{
            res.status(200).send("Empleado registrado con éxito");
        }
    
    });
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
    db.query("SELECT * FROM Login", (err, result) => {
        if (err) {
            console.error("Error al obtener los Usuarios: ", err);
            res.status(500).json({ error: "Error al obtener los Usuarios" });
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

// Función para eliminar una asignación por ID
Usuario.delete = (req, res) => {
    const usuarioId = req.params.id;
    const q = "DELETE FROM Login WHERE id = ?"
    db.query(q, [usuarioId], (err, result) => {
        if (err) {
            console.error("Error al eliminar el usuario: ", err);
            res.status(500).json({ error: "Error al eliminar el usuario" });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }

        console.log("Usuario eliminado con ID: ", usuarioId);
        res.json({ message: "Usuario eliminado correctamente" });
    });
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

module.exports = Usuario;