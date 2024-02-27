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
    comentarios TEXT,
    estado VARCHAR(20)
);

-- Crear la tabla Login
CREATE TABLE Login (
    user varchar(50) not null,
    password varchar(50) not null,
    primary key(user, password)
    
);

-- Insertar filas en la tabla Asignacion
INSERT INTO Asignacion (fecha_inicio, fecha_final, departamento, auditor, encargado, nomenclatura, comentarios, estado) 
VALUES 
('2024-02-25', '2024-03-10', 'Departamento A', 'Auditor 1', 'Encargado 1', 'Nomenclatura 1', 'Comentario 1', 'completado'),
('2024-03-01', '2024-03-15', 'Departamento B', 'Auditor 2', 'Encargado 2', 'Nomenclatura 2', 'Comentario 2', 'Iniciado'),
('2024-03-05', '2024-03-20', 'Departamento C', 'Auditor 3', 'Encargado 3', 'Nomenclatura 3', 'Comentario 3','pausa');


INSERT INTO Login (user, password) VALUES
('usuario1', 'contraseña1'),
('usuario2', 'contraseña2'),
('usuario3', 'contraseña3'),
('usuario4', 'contraseña4'),
('usuario5', 'contraseña5');

