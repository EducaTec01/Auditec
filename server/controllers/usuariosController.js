const db = require('../models/db');

const Usuario = function(usuario) {
  this.id = usuario.id;
  this.nombre = usuario.nombre;
  this.user = usuario.user;
  this.password = usuario.password;
  this.correoElectronico = usuario.correoElectronico;
};

Usuario.create = (nuevoUsuario, res) => {
    const password = nuevoUsuario.body.contraseña;
    const nombre = nuevoUsuario.body.nombre;
    const user = nuevoUsuario.body.usuario;
    const correoElectronico = nuevoUsuario.body.correo;

    // console.log("Valores de nuevoUsuario:", nuevoUsuario.body.estado);
    db.query("INSERT INTO Login (user, password, correoElectronico, nombre) VALUES (?, ?, ?, ?)", [user, password, correoElectronico, nombre],
    (err, result) => {
        if (err) {
            console.error("Error al crear un nuevo usuario: ", err);
            return result(err, null); // Devolvemos el error a la función de retorno de llamada
        }
        else{
            res.send("Empleado registrado con éxito");
        }
    
    });
};

Usuario.updateById = (req, res) => {
    const id = req.params.id; // Obtiene el ID de la asignación de los parámetros de la solicitud
    const usuario = req.body; // Obtiene los datos actualizados de la asignación del cuerpo de la solicitud
  
    const { user, password, correoElectronico, nombre } = usuario;
  
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
  
      console.log("Usuario encontrado: ", result[0]);
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

        console.log("Usuario eliminado con ID: ", asignacionId);
        res.json({ message: "Usuario eliminado correctamente" });
    });
};

module.exports = Usuario;