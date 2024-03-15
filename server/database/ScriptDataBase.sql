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


INSERT INTO Asignacion (fecha_inicio, fecha_final, departamento, auditor, encargado, nomenclatura, comentarios) VALUES
    ('2012-01-01', '2012-02-01', 'Departamento A', 'Auditor A', 'Encargado A', 'Nomenclatura A', 'Comentario A'),
    ('2013-03-01', '2013-04-01', 'Departamento B', 'Auditor B', 'Encargado B', 'Nomenclatura B', 'Comentario B'),
    ('2014-05-01', '2014-06-01', 'Departamento C', 'Auditor C', 'Encargado C', 'Nomenclatura C', 'Comentario C'),
    ('2015-07-01', '2015-08-01', 'Departamento D', 'Auditor D', 'Encargado D', 'Nomenclatura D', 'Comentario D'),
    ('2016-09-01', '2016-10-01', 'Departamento E', 'Auditor E', 'Encargado E', 'Nomenclatura E', 'Comentario E'),
    ('2017-11-01', '2017-12-01', 'Departamento F', 'Auditor F', 'Encargado F', 'Nomenclatura F', 'Comentario F'),
    ('2018-01-01', '2018-02-01', 'Departamento G', 'Auditor G', 'Encargado G', 'Nomenclatura G', 'Comentario G'),
    ('2019-03-01', '2019-04-01', 'Departamento H', 'Auditor H', 'Encargado H', 'Nomenclatura H', 'Comentario H'),
    ('2020-05-01', '2020-06-01', 'Departamento I', 'Auditor I', 'Encargado I', 'Nomenclatura I', 'Comentario I'),
    ('2021-07-01', '2021-08-01', 'Departamento J', 'Auditor J', 'Encargado J', 'Nomenclatura J', 'Comentario J'),
    ('2022-09-01', '2022-10-01', 'Departamento K', 'Auditor K', 'Encargado K', 'Nomenclatura K', 'Comentario K'),
    ('2023-11-01', '2023-12-01', 'Departamento L', 'Auditor L', 'Encargado L', 'Nomenclatura L', 'Comentario L'),
    ('2024-01-01', '2024-02-01', 'Departamento M', 'Auditor M', 'Encargado M', 'Nomenclatura M', 'Comentario M'),
    ('2025-03-01', '2025-04-01', 'Departamento N', 'Auditor N', 'Encargado N', 'Nomenclatura N', 'Comentario N'),
    ('2026-05-01', '2026-06-01', 'Departamento O', 'Auditor O', 'Encargado O', 'Nomenclatura O', 'Comentario O'),
    ('2027-07-01', '2027-08-01', 'Departamento P', 'Auditor P', 'Encargado P', 'Nomenclatura P', 'Comentario P'),
    ('2028-09-01', '2028-10-01', 'Departamento Q', 'Auditor Q', 'Encargado Q', 'Nomenclatura Q', 'Comentario Q'),
    ('2029-11-01', '2029-12-01', 'Departamento R', 'Auditor R', 'Encargado R', 'Nomenclatura R', 'Comentario R'),
    ('2030-01-01', '2030-02-01', 'Departamento S', 'Auditor S', 'Encargado S', 'Nomenclatura S', 'Comentario S'),
    (CURDATE(), '2031-03-01', 'Departamento T', 'Auditor T', 'Encargado T', 'Nomenclatura T', 'Comentario T'),
    (CURDATE(), '2032-05-01', 'Departamento U', 'Auditor U', 'Encargado U', 'Nomenclatura U', 'Comentario U'),
    (CURDATE(), '2033-07-01', 'Departamento V', 'Auditor V', 'Encargado V', 'Nomenclatura V', 'Comentario V'),
    (CURDATE(), '2034-09-01', 'Departamento W', 'Auditor W', 'Encargado W', 'Nomenclatura W', 'Comentario W'),
    (CURDATE(), '2035-11-01', 'Departamento X', 'Auditor X', 'Encargado X', 'Nomenclatura X', 'Comentario X');


CREATE TABLE IF NOT EXISTS preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT,
    respuesta TEXT,
    tipo ENUM('Vinculacion', 'Administrativos', 'Planeacion', 'Academicos'),
    fecha_subida DATE
);

INSERT INTO preguntas (pregunta, respuesta, tipo, fecha_subida) VALUES
('Pregunta 1', 'Respuesta 1', 'Vinculacion', '2023-01-01'),
('Pregunta 2', 'Respuesta 2', 'Vinculacion', '2022-12-15'),
('Pregunta 3', 'Respuesta 3', 'Administrativos', '2023-06-30'),
('Pregunta 4', 'Respuesta 4', 'Planeacion', '2024-07-20'),
('Pregunta 5', 'Respuesta 5', 'Vinculacion', '2021-05-10'),
('Pregunta 6', 'Respuesta 6', 'Academicos', '2025-02-28'),
('Pregunta 7', 'Respuesta 7', 'Vinculacion', '2025-08-15'),
('Pregunta 8', 'Respuesta 8', 'Administrativos', '2025-11-30'),
('Pregunta 9', 'Respuesta 9', 'Planeacion', '2025-03-10'),
('Pregunta 10', 'Respuesta 10', 'Vinculacion', '2025-09-25');


CREATE TABLE IF NOT EXISTS inconformidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_reporte VARCHAR(100),
    fecha_subida DATE,
    departamento VARCHAR(100)
);

-- Insertar algunos datos de ejemplo en la tabla 'inconformidades'
INSERT INTO inconformidades (numero_reporte, fecha_subida, departamento) VALUES
('INC001', '2024-03-13', 'Departamento A'),
('INC002', '2024-03-14', 'Departamento B'),
('INC003', '2024-03-15', 'Departamento C');

CREATE TABLE IF NOT EXISTS Auditorias (
    ID VARCHAR(10) PRIMARY KEY,
    fecha_subida DATE,
    departamento VARCHAR(100),
    auditor VARCHAR(100),
    estado VARCHAR(20)
);

INSERT INTO Auditorias (ID, fecha_subida, departamento, auditor, estado) VALUES
('A001', '2024-03-01', 'Departamento A', 'Auditor 1', 'Pendiente'),
('A002', '2024-03-05', 'Departamento B', 'Auditor 2', 'Completado'),
('A003', '2024-03-10', 'Departamento C', 'Auditor 3', 'Pendiente'),
('A004', '2024-03-15', 'Departamento A', 'Auditor 2', 'En Proceso'),
('A005', '2024-03-20', 'Departamento B', 'Auditor 1', 'Completado'),
('A006', '2024-03-25', 'Departamento C', 'Auditor 3', 'En Proceso'),
('A007', '2024-03-30', 'Departamento A', 'Auditor 1', 'Completado'),
('A008', '2024-04-02', 'Departamento B', 'Auditor 2', 'Pendiente'),
('A009', '2024-04-07', 'Departamento C', 'Auditor 3', 'Completado'),
('A010', '2024-04-10', 'Departamento A', 'Auditor 2', 'En Proceso');


INSERT INTO Auditoria (fecha_subida, departamento, auditor, estado) VALUES
('2023-05-15', 'Recursos Humanos', 'Juan Perez', 'Pendiente'),
('2023-06-25', 'Finanzas', 'María González', 'Aprobado'),
('2023-08-10', 'Producción', 'Luis García', 'Pendiente'),
('2023-09-05', 'Ventas', 'Ana Martínez', 'Pendiente'),
('2023-10-20', 'Calidad', 'Pedro Sánchez', 'Aprobado'),
('2024-01-12', 'Logística', 'Laura Rodríguez', 'Rechazado'),
('2024-03-08', 'Recursos Humanos', 'Daniel López', 'Pendiente'),
('2024-04-30', 'Finanzas', 'Sofía Ramirez', 'Aprobado'),
('2024-06-18', 'Producción', 'Miguel González', 'Pendiente'),
('2024-08-05', 'Ventas', 'Carolina Martínez', 'Aprobado');