-- Crear la base de datos Auditoria
CREATE DATABASE IF NOT EXISTS Auditoria;

-- Usar la base de datos Auditoria
USE Auditoria;


-- Crear la tabla Asignacion
CREATE TABLE IF NOT EXISTS Asignacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATE,
    fecha_final DATE,
    departamento VARCHAR(100),
    auditor VARCHAR(100),
    encargado VARCHAR(100),
    nomenclatura VARCHAR(100),
    comentarios TEXT
);

-- Crear la tabla Login
CREATE TABLE Login (
    user varchar(50) not null,
    password varchar(50) not null,
    primary key(user, password)
    
);

INSERT INTO Login (user, password) VALUES
('usuario1', 'contraseña1'),
('usuario2', 'contraseña2'),
('usuario3', 'contraseña3'),
('usuario4', 'contraseña4'),
('usuario5', 'contraseña5');

