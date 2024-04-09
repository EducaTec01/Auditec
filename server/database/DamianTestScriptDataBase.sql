-- Crear la base de datos Auditoria
CREATE DATABASE IF NOT EXISTS Auditoria;

-- Usar la base de datos Auditoria
USE Auditoria;

Select * from Departamentos;

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
    primary key(user, password),
    Acceso ENUM('Jefa', 'Auditor', 'auditado')
);

-- Insertar filas en la tabla Asignacion
INSERT INTO Asignacion (fecha_inicio, fecha_final, departamento, auditor, encargado, nomenclatura, comentarios, estado) 
VALUES 
('2024-02-25', '2024-03-10', 'Departamento A', 'Auditor 1', 'Encargado 1', 'Nomenclatura 1', 'Comentario 1', 'completado'),
('2024-03-01', '2024-03-15', 'Departamento B', 'Auditor 2', 'Encargado 2', 'Nomenclatura 2', 'Comentario 2', 'Iniciado'),
('2024-03-05', '2024-03-20', 'Departamento C', 'Auditor 3', 'Encargado 3', 'Nomenclatura 3', 'Comentario 3','pausa');


SET SQL_SAFE_UPDATES = 1;
SELECT * FROM Login;

ALTER TABLE Login
ADD correoElectronico VARCHAR(255),
ADD nombre VARCHAR(255),
ADD id INT AUTO_INCREMENT UNIQUE;

INSERT INTO Login (user, password, correoElectronico, nombre, Acceso) VALUES
('usuario1', 'contraseña1', 'usuario1@example.com', 'nombre1', 'Jefa'),
('usuario2', 'contraseña2', 'usuario2@example.com', 'nombre2', 'Auditor'),
('usuario3', 'contraseña3', 'usuario3@example.com', 'nombre3', 'Auditor'),
('usuario4', 'contraseña4', 'usuario4@example.com', 'nombre4','auditado'),
('usuario5', 'contraseña5', 'usuario5@example.com', 'nombre5','auditado');

DROP TABLE Asignacion;
DELETE FROM Asignacion WHERE id = 4;
SELECT * FROM Login;

SELECT * FROM Asignacion;

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

use Auditoria;
CREATE TABLE PreguntasVigencia (
    ID INT  AUTO_INCREMENT PRIMARY KEY ,
    Tipo VARCHAR(255),
    Pregunta VARCHAR(255),
    Respuesta VARCHAR(255)
);

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


CREATE TABLE IF NOT EXISTS preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT,
    respuesta TEXT,
    tipo ENUM('Vinculacion', 'Administrativos', 'Planeacion', 'Academicos'),
    fecha_subida DATE
);

CREATE TABLE IF NOT EXISTS ipreguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT,
    respuesta TEXT,
    tipo ENUM('Vinculacion', 'Administrativos', 'Planeacion', 'Academicos'),
    fecha_subida DATE
);
INSERT INTO ipreguntas (pregunta, respuesta, tipo, fecha_subida) VALUES
('i Pregunta 1', 'i Respuesta 1', 'Vinculacion', '2023-01-01'),
('i Pregunta 2', 'i Respuesta 2', 'Vinculacion', '2024-04-15'),
('i Pregunta 3', 'i Respuesta 3', 'Administrativos', '2023-06-30'),
('i Pregunta 4', 'i Respuesta 4', 'Planeacion', '2024-07-20'),
('i Pregunta 5', 'i Respuesta 5', 'Vinculacion', '2021-05-10'),
('i Pregunta 6', 'i Respuesta 6', 'Vinculacion', '2025-02-28'),
('i Pregunta 7', 'i Respuesta 7', 'Vinculacion', '2025-08-15'),
('i Pregunta 8', 'i Respuesta 8', 'Administrativos', '2025-11-30'),
('i Pregunta 9', 'i Respuesta 9', 'Planeacion', '2025-03-10'),
('i Pregunta 10', 'i Respuesta 10', 'Vinculacion', '2025-09-25');




INSERT INTO preguntas (pregunta, respuesta, tipo, fecha_subida) VALUES
('Pregunta 1', 'Respuesta 1', 'Vinculacion', '2023-01-01'),
('Pregunta 2', 'Respuesta 2', 'Vinculacion', '2024-04-15'),
('Pregunta 3', 'Respuesta 3', 'Administrativos', '2023-06-30'),
('Pregunta 4', 'Respuesta 4', 'Planeacion', '2024-07-20'),
('Pregunta 5', 'Respuesta 5', 'Vinculacion', '2021-05-10'),
('Pregunta 6', 'Respuesta 6', 'Vinculacion', '2025-02-28'),
('Pregunta 7', 'Respuesta 7', 'Vinculacion', '2025-08-15'),
('Pregunta 8', 'Respuesta 8', 'Administrativos', '2025-11-30'),
('Pregunta 9', 'Respuesta 9', 'Planeacion', '2025-03-10'),
('Pregunta 10', 'Respuesta 10', 'Vinculacion', '2024-09-25');
select * fROM Asignacion;
CREATE TABLE IF NOT EXISTS Auditorias (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    n_auditoria VARCHAR(100),
    fecha_subida DATE,
    departamento VARCHAR(100),
    auditor VARCHAR(100),
    estado VARCHAR(20)
);
INSERT INTO Auditorias (n_auditoria, fecha_subida, departamento, auditor, estado) 
VALUES 
('Auditoria001', '2024-03-15', 'Recursos Humanos', 'Juan Perez', 'Pendiente'),
('Auditoria002', '2024-03-16', 'Contabilidad', 'Maria Rodriguez', 'En proceso'),
('Auditoria003', '2024-03-17', 'Ventas', 'Carlos Sanchez', 'Completada'),
('Auditoria004', '2024-03-18', 'Producción', 'Laura Fernandez', 'Pendiente'),
('Auditoria005', '2024-03-19', 'Compras', 'Pedro Gomez', 'En proceso'),
('Auditoria006', '2024-03-20', 'Logística', 'Ana Martinez', 'Completada'),
('Auditoria007', '2024-03-21', 'Marketing', 'Sofia Lopez', 'Pendiente'),
('Auditoria008', '2024-03-22', 'Tecnología', 'David Ramirez', 'En proceso'),
('Auditoria009', '2024-03-23', 'Calidad', 'Elena Garcia', 'Pendiente');

INSERT INTO Auditorias (n_auditoria, fecha_subida, departamento, auditor, estado) 
VALUES 
('Auditoria010', '2021-03-15', 'Recursos Humanos', 'Juan Perez', 'Pendiente'),
('Auditoria011', '2022-03-16', 'Contabilidad', 'Maria Rodriguez', 'En proceso'),
('Auditoria012', '2000-03-17', 'Ventas', 'Carlos Sanchez', 'Completada'),
('Auditoria013', '2004-03-18', 'Producción', 'Laura Fernandez', 'Pendiente');
Drop table preguntas;
CREATE TABLE IF NOT EXISTS Preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT,
    seccion ENUM('Vinculacion', 'Academicos', 'Administrativos', 'Planeacion', 'Calidad') NOT NULL   
);

CREATE TABLE IF NOT EXISTS Respuestas (
    id_pregunta INT,
    id_asignacion INT,
    respuesta TEXT NOT NULL,
    fecha_respuesta DATE,
    evidencia MEDIUMBLOB NULL, 
    PRIMARY KEY (id_pregunta, id_asignacion),  -- Clave primaria compuesta
    FOREIGN KEY (id_pregunta) REFERENCES Preguntas(id),
    FOREIGN KEY (id_asignacion) REFERENCES Asignacion(id)
);


INSERT INTO Respuestas (id_pregunta, id_asignacion, respuesta, fecha_respuesta)
VALUES (1, 9, 'Esta es una respuesta de ejemplo', '2024-04-09');
drop table Respuestas;
SELECT * FROM Respuestas;
INSERT INTO Respuestas (id_pregunta, id_asignacion, respuesta, evidencia) 
VALUES (2, 9, 'Esta es la respuesta a la pregunta 1', NULL);

INSERT INTO Preguntas (pregunta, seccion) VALUES
('¿Cuál es el objetivo principal del instructivo establecido para la elaboración y gestión de la autorización del Programa de Trabajo Anual (PTA) del Instituto Tecnológico de Tijuana (ITT)?', 'Planeacion'),
('¿A quién aplica este procedimiento según el alcance establecido?', 'Planeacion'),
('¿Qué consideraciones deben tenerse en cuenta durante la elaboración del PTA en relación con el Programa de Desarrollo Institucional (PDI) del Instituto Tecnológico y los lineamientos del Tecnológico Nacional de México (TecNM)?', 'Planeacion'),
('¿Cuál es el calendario establecido para la presentación del Programa de Trabajo Anual (PTA) según las normativas del TecNM?', 'Planeacion'),
('¿Quiénes son los responsables de gestionar, asesorar, analizar, integrar, dar seguimiento y evaluar el PTA dentro del Instituto Tecnológico de Tijuana (ITT), según lo establecido en las reglas de operación del procedimiento?', 'Planeacion'),
('¿Cuál es el papel específico de la Secretaría de Planeación, Evaluación y Desarrollo Institucional de TecNM, a través de la Dirección de Planeación y Evaluación, en relación con el seguimiento y autorización del Programa de Trabajo Anual (PTA) del Instituto Tecnológico de Tijuana (ITT), según lo establecido en los lineamientos?', 'Planeacion'),
('¿Qué responsabilidades tienen los directores de áreas del TecNM con respecto a la elaboración, seguimiento y evaluación de sus Programas Institucionales Anuales y cómo se relacionan estas responsabilidades con el Programa de Trabajo Anual del ITT?', 'Planeacion'),
('¿Dónde se lleva a cabo la captura, evaluación y seguimiento de las metas del PTA, según lo establecido en los lineamientos?', 'Planeacion'),
('¿Cómo se utiliza el PTA como referencia en la realización, análisis y evaluación del Programa Operativo Anual (POA) del Instituto Tecnológico de Tijuana, según lo establecido en los procedimientos?', 'Planeacion'),
('¿Cuál es la base fundamental para la elaboración del PTA, según los lineamientos, y cómo contribuye este análisis al desarrollo de programas, proyectos y acciones dentro de la institución?', 'Planeacion'),
('¿Cuál es el objetivo principal del instructivo establecido para la elaboración y gestión de la autorización del Programa Operativo Anual (POA) del Instituto Tecnológico de Tijuana (ITT)?', 'Planeacion'),
('¿A quién aplica este procedimiento según el alcance establecido?', 'Planeacion'),
('¿Qué normatividad debe seguirse durante la elaboración del POA según las reglas de operación establecidas?', 'Planeacion'),
('¿Cuál es el papel específico de la Secretaría de Planeación, Evaluación y Desarrollo Institucional, a través de la Dirección de Programación Presupuestal e Infraestructura Física del Tecnológico Nacional de México (TecNM), en relación con el seguimiento, revisión, retroalimentación y autorización del POA del ITT?', 'Planeacion'),
('¿Qué implicaciones tiene el ejercicio del presupuesto sin la autorización del POA de acuerdo con las reglas de operación establecidas?', 'Planeacion'),
('¿Cuál es la condición para ejercer la partida del Capítulo 1000 según lo establecido en las reglas de operación?', 'Planeacion'),
('¿Cuándo se debe llenar el formato del POA para el Desglose de Ingresos Propios Orientados al Mantenimiento Correctivo o Preventivo, y cuál es el monto mínimo establecido para requerir este desglose?', 'Planeacion'),
('¿Qué requisitos deben cumplirse para ejercer el Capítulo 5000 según las reglas de operación?', 'Planeacion'),
('¿Cuál es el período mínimo de uso del parque vehicular antes de su renovación, y bajo qué circunstancias podría renovarse antes?', 'Planeacion'),
('¿Cómo se llevará a cabo el proceso de validación para ciertas partidas relacionadas con tecnologías de información y comunicación, según lo establecido en los lineamientos?', 'Planeacion'),
('¿Cuál es la responsabilidad del Departamento de Recursos Financieros en relación con la información financiera del Gasto de Ingresos Propios y Gasto Directo, según lo establecido en las reglas de operación?', 'Planeacion'),
('¿Qué se debe hacer con el POA en caso de que haya ampliaciones, reducciones o reprogramaciones autorizadas por el TecNM?', 'Planeacion');

INSERT INTO Preguntas (pregunta, seccion) VALUES
('¿Qué tipos de informes se presentan como información de entrada para la Revisión por la Dirección según el procedimiento establecido?', 'Calidad'),
('¿Qué formatos se utilizan para recopilar la retroalimentación del cliente y cuál es su objetivo dentro del proceso de revisión?', 'Calidad'),
('¿Qué tipo de información se incluye para retroalimentar al Sistema de Gestión de la Calidad (SGC) proveniente de las partes interesadas?', 'Calidad'),
('¿Qué aspectos se revisan en relación con el desempeño de los procesos y la conformidad del servicio durante la Revisión por la Dirección?', 'Calidad'),
('¿Cuál es la importancia de revisar el estado de las Acciones Correctivas y Preventivas en el contexto de la Revisión por la Dirección?', 'Calidad'),
('¿Qué se incluye en las acciones de seguimiento de revisiones anteriores efectuadas por la Dirección durante la Revisión por la Dirección?', 'Calidad'),
('¿Por qué es relevante considerar los cambios que pueden afectar al SGC durante la Revisión por la Dirección?', 'Calidad'),
('¿Cuál es el propósito de incluir recomendaciones para la mejora como parte de la información de entrada para la Revisión por la Dirección?', 'Calidad'),
('¿Qué aspectos están incluidos en los resultados de la Revisión por la Dirección en relación con la mejora de la eficacia del SGC y sus procesos?', 'Calidad'),
('¿Cómo se asegura que la Revisión por la Dirección contribuya a la mejora del Servicio Educativo en relación con los requisitos del cliente y las partes interesadas?', 'Calidad'),
('¿Cuál es el nombre del documento que encabeza todas las páginas del procedimiento y cómo debe ser redactado?', 'Calidad'),
('¿Cuál es el código asignado al procedimiento y cómo se especifica su integración?', 'Calidad'),
('¿Cómo se indica el nivel de revisión del documento y qué significan las letras utilizadas para este propósito?', 'Calidad'),
('¿Qué información se registra en la sección de página del recuadro de identificación?', 'Calidad'),
('¿En qué casos se incluye la referencia a la Norma ISO 9001-2015 en el recuadro de identificación y qué indica su presencia?', 'Calidad'),
('¿Cuál es el propósito del procedimiento establecido?', 'Calidad'),
('¿A quiénes aplica el control de la información documentada según el alcance del procedimiento?', 'Calidad'),
('¿Cuál es la política respecto a las copias en papel de los documentos del Sistema de Gestión de la Calidad?', 'Calidad'),
('¿Quién es la única persona autorizada para imprimir documentos del SGC y qué debe verificar al hacerlo?', 'Calidad'),
('¿Cómo se notifican los cambios y correcciones realizados a los documentos controlados, y quién se encarga de informar a los responsables de los procesos?', 'Calidad'),
('¿Cuál es el propósito del procedimiento establecido para el control de registros de calidad?', 'Calidad'),
('¿A quiénes aplica este procedimiento según su alcance?', 'Calidad'),
('¿Quién es responsable del control de identificación, almacenamiento, protección, recuperación, tiempo de retención y disposición de los registros de calidad?', 'Calidad'),
('¿Cómo se convierten los formatos de procedimientos en registros de calidad y qué responsabilidad tienen los usuarios al respecto?', 'Calidad'),
('¿Qué se debe hacer en caso de necesitar corregir un registro controlado por folio según la política establecida?', 'Calidad'),
('¿Cuál es el propósito del procedimiento establecido para las Auditorías Internas en el Instituto Tecnológico de Tijuana?', 'Calidad'),
('¿Quién es responsable de elaborar el programa anual de auditorías internas en el Instituto?', 'Calidad'),
('¿Qué se debe considerar para determinar la viabilidad de una auditoría interna?', 'Calidad'),
('¿Cuál es la responsabilidad del líder del equipo auditor antes de llevar a cabo las actividades de la auditoría in situ?', 'Calidad'),
('¿Qué acciones deben llevarse a cabo después de la entrega del Informe de Auditoría según las políticas establecidas?', 'Calidad'),
('¿Cuál es el propósito del procedimiento establecido para el Servicio No Conforme en el Instituto Tecnológico de Tijuana?', 'Calidad'),
('¿Qué alcance tiene este procedimiento dentro del Instituto Tecnológico de Tijuana?', 'Calidad'),
('¿Quiénes son responsables de identificar, registrar y controlar el Servicio No Conforme según las políticas de operación establecidas?', 'Calidad'),
('¿Qué acciones deben aplicarse para tratar el Servicio No Conforme de acuerdo con el plan de calidad?', 'Calidad'),
('¿Qué se debe hacer cuando se corrige un Servicio No Conforme para demostrar su conformidad con los requisitos?', 'Calidad'),
('¿Cuál es el propósito del procedimiento establecido para las Acciones Correctivas en el Instituto Tecnológico de Tijuana?', 'Calidad'),
('¿A qué áreas o procesos del Instituto Tecnológico de Tijuana aplica este procedimiento?', 'Calidad'),
('¿Qué fuentes pueden originar las No Conformidades o Servicios No Conformes (SNC) que requieren Acciones Correctivas según las políticas de operación?', 'Calidad'),
('¿Quién debe estar informado en todo momento sobre las No Conformidades detectadas y las Acciones Correctivas implementadas?', 'Calidad'),
('¿Quién es responsable de realizar el análisis de la Causa Raíz de las No Conformidades y determinar la acción correctiva o corrección correspondiente?', 'Calidad'),
('¿Cuál es el propósito del procedimiento establecido para atender las Quejas o Sugerencias de los Estudiantes en el Instituto Tecnológico de Tijuana?', 'Calidad'),
('¿Qué aspectos del Instituto Tecnológico de Tijuana abarca este procedimiento, desde qué etapa hasta cuál?', 'Calidad'),
('¿Cuál es el método establecido para que los estudiantes envíen sus Quejas o Sugerencias al Instituto Tecnológico de Tijuana?', 'Calidad'),
('¿Quién es el responsable de consultar diariamente el Buzón virtual de Quejas y/o Sugerencias establecido en el portal del Instituto Tecnológico de Tijuana?', 'Calidad'),
('¿Cómo se manejan las Quejas y/o Sugerencias una vez que son registradas en la bitácora electrónica del Instituto Tecnológico de Tijuana?', 'Calidad'),
('¿Cuál es la responsabilidad del Coordinador del SGC en relación con las Quejas y/o Sugerencias recibidas?', 'Calidad'),
('¿Cómo se garantiza el anonimato de la persona que interpone una Queja y/o Sugerencia según el procedimiento establecido?', 'Calidad'),
('¿Qué debe hacer la Subdirección o el Departamento responsable cuando reciben una Queja y/o Sugerencia?', 'Calidad'),
('¿Qué responsabilidad tiene el Coordinador del SGC respecto al seguimiento de las acciones tomadas en respuesta a las Quejas y/o Sugerencias?', 'Calidad'),
('¿Cuándo y cómo se informa el estado de las Quejas y/o Sugerencias en la Revisión por la Dirección?', 'Calidad'),
('¿Quién es responsable de elaborar el programa para la aplicación de Auditorías de Servicios en el Instituto Tecnológico de Tijuana?', 'Calidad'),
('¿Cuál es la responsabilidad del Coordinador del SGC en relación con la aplicación y evaluación de las Auditorías de Servicios?', 'Calidad'),
('¿Cómo se determina la frecuencia de las Encuestas de Servicios en el Instituto?', 'Calidad'),
('¿A quiénes se les aplicarán las Encuestas de Servicios en el Instituto Tecnológico de Tijuana?', 'Calidad'),
('¿Cómo se pueden llevar a cabo las Encuestas de Servicios, y quiénes pueden ser seleccionados como auditores en caso de aplicarse de manera manual?', 'Calidad');

INSERT INTO Preguntas (pregunta, seccion) VALUES
('¿Quién es responsable de verificar la infraestructura y equipo del Instituto Tecnológico semestralmente según las políticas de operación?', 'Administrativos'),
('¿Cómo se gestionan las solicitudes de mantenimiento de los diferentes departamentos del Instituto Tecnológico?', 'Administrativos'),
('¿Qué documentos deben elaborar los Jefes de Departamentos de Recursos Materiales y Servicios, Mantenimiento de Equipo y/o Centro de Cómputo para administrar el Programa de Mantenimiento Preventivo?', 'Administrativos'),
('¿Qué criterios se utilizan para decidir si el mantenimiento será realizado internamente por el personal del Instituto Tecnológico o a través de proveedores externos?', 'Administrativos'),
('¿Cómo se diferencia el mantenimiento preventivo del correctivo según las políticas establecidas en el procedimiento?', 'Administrativos'),
('¿Quién tiene la facultad de reasignar el procedimiento de mantenimiento en caso de no contar con los departamentos específicos para realizarlo?', 'Administrativos'),
('¿Cómo se prioriza la distribución presupuestal de los recursos en el programa de mantenimiento preventivo, según las políticas establecidas?', 'Administrativos'),
('¿Qué áreas o equipos se consideran prioritarios en la distribución de recursos para el mantenimiento, según las políticas del Instituto Tecnológico?', 'Administrativos'),
('¿Quiénes son responsables de solicitar mantenimiento para el hardware, material y equipo didáctico del Instituto Tecnológico?', 'Administrativos'),
('¿Quién debe cubrir los gastos de operación para el mantenimiento prestado por los CRODES?', 'Administrativos'),
('¿Cuál es el propósito del procedimiento de captación de ingresos propios en el Instituto Tecnológico?', 'Administrativos'),
('¿A quién aplica el alcance del procedimiento de captación de ingresos propios en el Instituto Tecnológico?', 'Administrativos'),
('¿Quién es responsable de publicar las cuotas de cobro de servicios autorizadas por el Comité de Planeación del Instituto Tecnológico?', 'Administrativos'),
('¿A quiénes se aplica el procedimiento de captación de ingresos propios en el Instituto Tecnológico?', 'Administrativos'),
('¿Qué lineamientos deben seguir el personal encargado de aplicar este procedimiento según las políticas establecidas?', 'Administrativos'),
('¿Cuál es el propósito del procedimiento de reclutamiento, selección y contratación de personal en el Instituto Tecnológico?', 'Administrativos'),
('¿Cuál es el alcance del procedimiento de reclutamiento, selección y contratación de personal en el Instituto Tecnológico?', 'Administrativos'),
('¿Quién es responsable de la aplicación correcta de este procedimiento según las políticas establecidas?', 'Administrativos'),
('¿Cuál es el papel de la Comisión Dictaminadora en el proceso de reclutamiento, selección y contratación de personal?', 'Administrativos'),
('¿Qué normatividad se debe seguir al publicar las convocatorias de reclutamiento según las políticas del Instituto Tecnológico?', 'Administrativos'),
('¿Cuál es el propósito del procedimiento de mantenimiento del Centro de Cómputo en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Cuál es el alcance del procedimiento de mantenimiento preventivo y/o correctivo del Centro de Cómputo en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Quiénes son responsables de realizar la verificación semestral de la infraestructura y equipo del Centro de Cómputo según las políticas establecidas?', 'Administrativos'),
('¿Cómo se elabora el Programa de Mantenimiento Preventivo del Equipo en el Centro de Cómputo según las políticas del Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Cómo se determina si el mantenimiento preventivo o correctivo se realizará internamente o a través de proveedores externos según las políticas establecidas?', 'Administrativos'),
('¿Quién tiene la facultad de reasignar el procedimiento de mantenimiento en caso de no contar con los departamentos correspondientes según la estructura orgánica del Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Cuál es el propósito del procedimiento de determinación y mantenimiento del ambiente de trabajo en la organización?', 'Administrativos'),
('¿A quién aplica el alcance del procedimiento de determinación y mantenimiento del ambiente de trabajo?', 'Administrativos'),
('¿Quién es responsable de programar las fechas para la aplicación de la encuesta para Determinar el Ambiente de Trabajo según las políticas de operación?', 'Administrativos'),
('¿Quién es responsable de aplicar, concentrar y procesar los datos de la organización para determinar el ambiente de trabajo?', 'Administrativos'),
('¿En qué periodos se debe aplicar la Encuesta para determinar el ambiente de trabajo según las políticas establecidas?', 'Administrativos'),
('¿Qué autorización se requiere para solicitar una evaluación de ambiente de trabajo extemporánea según las políticas de operación?', 'Administrativos'),
('¿Cuándo se deben tomar acciones en respuesta a los resultados de la encuesta de ambiente de trabajo y qué actividades abarcan estas acciones?', 'Administrativos'),
('¿Con qué periodicidad se debe realizar la encuesta de ambiente de trabajo en la organización según las políticas establecidas?', 'Administrativos'),
('¿Qué sucede si la organización no cuenta con el titular del área responsable de la encuesta de ambiente de trabajo según las políticas establecidas?', 'Administrativos'),
('¿Cuál es el propósito del procedimiento de formación y capacitación del personal directivo, de apoyo y asistencia a la educación en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿A quién aplica el alcance del procedimiento de formación y capacitación en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Quién es responsable de coordinar los cursos y elaborar un diagnóstico de necesidades de capacitación según las políticas establecidas?', 'Administrativos'),
('¿Cómo se financia la realización de los eventos de formación y capacitación según las políticas del Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Cómo se determinan las necesidades de formación y capacitación de los directivos, trabajadores de apoyo y asistencia a la educación en la institución?', 'Administrativos'),
('¿Cuál es el enfoque de los cursos que se imparten según las políticas establecidas?', 'Administrativos'),
('¿Quién es designado como responsable para coordinar los cursos en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Qué responsabilidades tiene el coordinador asignado en relación con la realización de los cursos según las políticas del Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Cuál es el propósito del procedimiento de alta de bienes muebles instrumentales en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿A quién aplica el alcance del procedimiento de alta de bienes muebles instrumentales en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Qué políticas deben seguirse para dar de alta los bienes muebles instrumentales en los registros del Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Cuál es el método establecido para realizar solicitudes de alta de bienes muebles instrumentales en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Qué información se debe proporcionar al capturar el folio de la solicitud de alta en el Sistema de bienes instrumentales en la SEP (SIBESEP)?', 'Administrativos'),
('¿Qué se debe hacer si un bien inmueble instrumental carece de alguno de los datos requeridos durante el proceso de alta?', 'Administrativos'),
('¿Ante quién se debe solicitar el alta de los bienes muebles instrumentales recibidos en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Cómo se asigna el número de inventario a los bienes muebles instrumentales según las políticas establecidas?', 'Administrativos'),
('¿Qué se debe hacer en caso de que un bien mueble instrumental no tenga una clave correspondiente en el Catálogo de Bienes Muebles (CABM)?', 'Administrativos'),
('¿Qué requisito debe cumplirse para incluir un bien mueble instrumental en el resguardo individual de un servidor público?', 'Administrativos'),
('¿Cuál es la responsabilidad del empleado del Instituto Tecnológico de Tijuana con respecto al uso y cuidado de los bienes muebles asignados?', 'Administrativos'),
('¿Quién es el responsable de la administración y control del activo fijo en el Instituto Tecnológico de Tijuana según las políticas establecidas?', 'Administrativos'),
('¿Cómo se debe solicitar cualquier registro o movimiento al inventario de los bienes muebles en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Cuál es el propósito del procedimiento de trámite y control de viáticos en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿A quién corresponde la responsabilidad de planear y administrar los viajes de estudio, asistencia a congresos y visitas industriales en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Qué documentos se utilizan para otorgar los viáticos según las políticas de operación establecidas?', 'Administrativos'),
('¿Quién autoriza las comisiones oficiales en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Cuál es el criterio para autorizar las comisiones según las políticas de operación establecidas?', 'Administrativos'),
('¿Qué requisito debe cumplir un servidor público para que se le autoricen viáticos en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿En qué casos no se pueden autorizar comisiones y, por lo tanto, otorgar pasajes y viáticos según las políticas establecidas?', 'Administrativos'),
('¿Cuál es el propósito del procedimiento de adquisición de bienes y servicios en el Instituto Tecnológico de Tijuana?', 'Administrativos'),
('¿Desde qué etapa hasta cuál se aplica este procedimiento?', 'Administrativos'),
('¿Qué autorización es necesaria para ejercer el presupuesto?', 'Administrativos'),
('¿Cuál es el umbral de monto para las adquisiciones que pueden realizarse directamente sin considerar el IVA?', 'Administrativos'),
('¿Qué se requiere cuando la adquisición excede las 300 UMAS o su equivalente en moneda nacional?', 'Administrativos'),
('¿Cuál es la responsabilidad de la Oficina de Adquisiciones en el Instituto Tecnológico de Tijuana en relación con la selección de proveedores para la adquisición de bienes y servicios?', 'Administrativos'),
('¿Cómo se evalúa el catálogo de proveedores aprobados y cuándo se lleva a cabo esta reevaluación?', 'Administrativos'),
('¿Qué datos debe proporcionar un proveedor al entregar una factura electrónica (PDF-XML) al almacén?', 'Administrativos');

INSERT INTO Preguntas (pregunta, seccion) VALUES
('¿Se verifica que los solicitantes entreguen la documentación completa requerida para la inscripción, incluyendo la solicitud de inscripción, certificados de bachillerato o equivalente, equivalencia de estudios de licenciatura (si corresponde), comprobante de pago de cuota de inscripción, acta de nacimiento, CURP, certificado médico (si aplicable), y documento firmado?', 'Academicos'),
('¿Se comprueba que los certificados de bachillerato o equivalentes presentados estén en regla y sean auténticos, verificando la autenticidad de los documentos a través de los organismos pertinentes o instituciones emisoras?', 'Academicos'),
('¿Se revisa que el contrato firmado por el estudiante cumpla con todos los términos y condiciones establecidos por el instituto Tecnológico de Tijuana, garantizando que el estudiante esté plenamente informado y conforme con las obligaciones y responsabilidades?', 'Academicos'),
('¿Se confirma que los egresados del CONALEP presenten tanto el certificado equivalente al bachillerato como el certificado técnico otorgado, garantizando que cumplan con todos los requisitos académicos para su inscripción en el instituto?', 'Academicos'),
('¿Cuántas personas cumplen con el contrato con el/la estudiante?', 'Academicos'),
('¿Se cumplen los tiempos de entrega de la asignación de número de control en el Instituto Tecnológico de Tijuana?', 'Academicos'),
('¿Cuáles son los pasos relacionados con la inscripción de aspirantes en el Instituto Tecnológico de Tijuana?', 'Academicos'),
('¿Quién es responsable de publicar la lista de aspirantes aceptados según las políticas operativas del Instituto Tecnológico de Tijuana? ¿se entregaron a tiempo? ¿Hubo la difusión necesaria?', 'Academicos'),
('¿Cómo se compone el número de control de un estudiante en el Instituto Tecnológico según la descripción proporcionada?', 'Academicos'),
('¿Qué significan los dos primeros dígitos del número de control de un estudiante en el Instituto Tecnológico?', 'Academicos'),
('¿Cómo se determina el número de estudiante dentro del número de control en el Instituto Tecnológico?', 'Academicos'),
('¿Cómo se gestionan los números de control para los estudiantes de nuevo ingreso en el Instituto Tecnológico durante el periodo actual según las políticas descritas?', 'Academicos'),
('¿Se han seguido adecuadamente los lineamientos establecidos para la reinscripción de los estudiantes en el Instituto Tecnológico Tijuana para garantizar que se realice en tiempo y forma?', 'Academicos'),
('¿Todos los estudiantes que cumplen con los requisitos para la reinscripción según el Manual de Lineamientos Académico Administrativo del Tecnológico Nacional de México 2015 han sido incluidos en el proceso de reinscripción?', 'Academicos'),
('¿Se ha convocado a todas las áreas pertinentes, como el Departamento de Planeación, Programación y Presupuestación, la División de Estudios Profesionales y el Departamento de Servicios Escolares, para la elaboración y estructuración del Calendario Académico?', 'Academicos'),
('¿Se ha publicado el orden de reinscripción y las referencias de pago con la anticipación adecuada, según lo establecido en las políticas operativas del Instituto Tecnológico Tijuana?', 'Academicos'),
('¿Se ha verificado que el pago de la reinscripción se haya realizado correctamente, ya sea en efectivo en la caja designada o a través de la sucursal bancaria indicada por el Instituto Tecnológico, y que se haya obtenido el recibo oficial de cobro antes de la asignación de la carga académica?', 'Academicos'),
('¿Conoces las recomendaciones dadas a los alumnos sobre el cuidado de sus documentos, titulo y cedula? ¿Cuáles son?', 'Academicos'),
('Los alumnos que reciben su título ¿se les Informa de las recomendaciones dadas por parte del tecnológico de Tijuana?', 'Academicos'),
('¿Se ha garantizado el registro del Título y la expedición de la Cédula profesional para todos los egresados de licenciatura del Instituto Tecnológico de Tijuana que cumplen con los requisitos establecidos para el trámite?', 'Academicos'),
('¿Se han identificado y seleccionado adecuadamente a los egresados de licenciatura del Instituto Tecnológico de Tijuana que cumplen con los criterios requeridos para iniciar el proceso de titulación y obtención de Cédula profesional?', 'Academicos'),
('¿Se han realizado todos los pagos correspondientes al trámite administrativo de titulación por parte de los egresados, según lo estipulado en las políticas operativas establecidas?', 'Academicos'),
('¿Se ha proporcionado una orientación clara y efectiva por parte del Jefe del departamento de División de Estudios Profesionales a los egresados para guiarlos en el proceso de titulación?', 'Academicos'),
('¿Se ha llevado a cabo de manera oportuna y eficiente la recepción, verificación y trámite de expedientes por parte del jefe de la Dirección de Servicios Escolares Estudiantiles (TecNM) y la Dirección General de Profesiones (DGP), respectivamente, para garantizar la entrega correcta de Título y Cédula profesional a los egresados?', 'Academicos'),
('¿Se ha asegurado el cumplimiento de los programas de todas las asignaturas del plan de estudios de cada programa impartido en el Instituto Tecnológico de Tijuana?', 'Academicos'),
('¿Se ha verificado que todos los docentes que imparten clases a nivel licenciatura en las diferentes áreas académicas del Instituto hayan seguido el procedimiento establecido para garantizar el cumplimiento de los programas de asignaturas?', 'Academicos'),
('¿Se han aplicado las políticas operativas vigentes para asegurar que todos los programas de asignaturas sean impartidos conforme a la normatividad establecida por el Tecnológico Nacional de México para la acreditación de asignaturas?', 'Academicos'),
('¿Se ha supervisado que los docentes hayan capturado la planeación del curso en el sistema antes del inicio de clases, y que hayan realizado seguimientos periódicos de la gestión del curso y la instrumentación didáctica en las semanas indicadas?', 'Academicos'),
('¿Se ha garantizado que la entrega de la planeación del curso y la instrumentación didáctica se haya realizado en tiempo y forma, evitando la consideración de actividades fuera de tiempo para la liberación de actividades frente a grupo?', 'Academicos'),
('¿Se han mostrado y contabilizado de manera adecuada los horarios del docente, firmados y conforme a las políticas establecidas, como parte del proceso de seguimiento y medición de la gestión de curso en el Instituto Tecnológico de Tijuana?', 'Academicos'),
('¿Se han aplicado los instrumentos de Evaluación Docente a por lo menos el 60% de los estudiantes de cada asignatura que cursan en el semestre, en los meses de mayo y noviembre, como lo indica la política operativa del Departamento de Desarrollo Académico?', 'Academicos'),
('¿Se ha analizado adecuadamente por área académica los resultados de las evaluaciones docentes para integrar el Registro de Retroalimentación del Estudiante en el formato ITT-CA-PO-005-01, como parte del proceso de mejora continua del Sistema de Gestión de la Calidad?', 'Academicos'),
('¿Se han tomado acciones concretas basadas en la retroalimentación proporcionada por los estudiantes en las evaluaciones docentes, como parte de la revisión por la Dirección, para mejorar el desempeño de los docentes y el proceso educativo en el Instituto Tecnológico?', 'Academicos'),
('¿Se ha llevado a cabo la evaluación del desempeño de los docentes conforme a los instrumentos establecidos, con el propósito de obtener información relevante para mejorar el proceso educativo y como una medida de desempeño del Sistema de Gestión de la Calidad en el Instituto Tecnológico?', 'Academicos'),
('¿Se ha aplicado el procedimiento de evaluación docente a al menos el 60% de los estudiantes de cada asignatura cursada en el semestre, según lo estipulado por el Departamento de Desarrollo Académico, durante el semestre presente?', 'Academicos'),
('¿Se ha realizado un análisis adecuado de los resultados de las evaluaciones por área académica por parte del Departamento de Desarrollo Académico, con el fin de integrar el Registro de la Retroalimentación del Estudiante para su posterior revisión por la Dirección, según lo establecido en las políticas operativas?', 'Academicos'),
('¿Se ha verificado que las actividades realizadas durante la Residencia Profesional estén alineadas con los objetivos establecidos en la normativa para la formación y desarrollo de competencias profesionales del Instituto Tecnológico de Tijuana?', 'Academicos'),
('¿Se aseguró de que todos los estudiantes inscritos en nivel licenciatura y que son candidatos a realizar Residencia Profesional estén cumpliendo con los requisitos establecidos para su acreditación?', 'Academicos'),
('¿Se ha comprobado que el proyecto de Residencia Profesional, ya sea individual, grupal o interdisciplinario, esté abordando un problema específico de la realidad social y productiva, como se define en la normativa institucional?', 'Academicos'),
('¿Se ha verificado que los egresados con plan de estudios 2009, 2010, 2013 y 2014 del Tecnológico Nacional de México cumplan con los requisitos académicos establecidos para la titulación integral, incluyendo el registro de proyecto, la solicitud correspondiente, y la presentación del trabajo profesional?', 'Academicos'),
('¿Se han cumplido adecuadamente los requisitos administrativos para la titulación integral, como la obtención del oficio de no Inconveniencia No? 1, la presentación del comprobante de E-firma del registro del SAT, y la entrega de documentos como CURP, acta de nacimiento, y certificados de bachillerato y licenciatura, entre otros?', 'Academicos'),
('¿Se ha corroborado que los egresados hayan cumplido con los requisitos adicionales, como la acreditación de un programa de lengua extranjera, la presentación de equivalencias, revalidaciones o prórrogas de semestre, y la entrega de una fotografía tamaño credencial, conforme a lo establecido en la política de operación para la titulación integral?', 'Academicos'),
('¿Se ha elaborado y puesto en marcha el Programa Institucional de Formación y Actualización Docente y Profesional, conforme a las necesidades detectadas en el Instituto Tecnológico y los resultados de la evaluación docente?', 'Academicos'),
('¿Se ha coordinado adecuadamente el Departamento de Desarrollo Académico con los Departamentos Académicos para priorizar los contenidos temáticos y facilitadores necesarios para la formación y actualización docente y profesional?', 'Academicos'),
('¿Se han asignado los recursos económicos necesarios para la implementación de los cursos de actualización docente y profesional requeridos por los profesores, de acuerdo con el Programa Institucional establecido?', 'Academicos'),
('¿Se ha garantizado la difusión del Programa Institucional de Formación y Actualización Docente y Profesional a todos los Departamentos Académicos y academias, asegurando que los docentes estén informados sobre las oportunidades de formación disponibles?', 'Academicos'),
('¿Se han cumplido los criterios de asistencia, participación y evaluación establecidos para los docentes comisionados a eventos de formación y actualización, asegurando un mínimo del 90% de asistencia y el cumplimiento de las actividades programadas para obtener el documento de participación?', 'Academicos');
SELECT COUNT(*) FROM Preguntas;

INSERT INTO Preguntas (pregunta, seccion) VALUES
('¿Cuál es el objetivo principal de la comunicación interna y externa dentro de la institución?', 'Vinculacion'),
('¿Qué alcance tiene este procedimiento en términos de difusión de información?', 'Vinculacion'),
('¿Cuáles son las responsabilidades del Departamento de Comunicación y Difusión en relación con la difusión interna y externa?', 'Vinculacion'),
('¿Qué medios de comunicación se utilizan para difundir la información? ¿Depende de qué tipo de material se va a compartir?', 'Vinculacion'),
('¿Quién es el responsable de la vigencia y el contenido de las publicaciones?', 'Vinculacion'),
('¿Se ha llevado a cabo una revisión exhaustiva de las publicaciones relacionadas con servicios sociales, eventos internos de la comunidad estudiantil, permisos para promociones y ventas dentro de la institución, publicaciones externas y activaciones de marcas para garantizar el cumplimiento de la política establecida?', 'Vinculacion'),
('¿Existe un registro documentado de las autorizaciones otorgadas para la difusión de información relacionada con terceros, conforme a los criterios de publicación establecidos por el Departamento de Comunicación y Difusión?', 'Vinculacion'),
('¿Se ha verificado que las publicaciones externas en las instalaciones del ITT cumplan con los criterios de restricción, excluyendo aquellas que promocionen bebidas alcohólicas, servicios financieros, lenguaje obsceno, entre otros, como se establece en la política?', 'Vinculacion'),
('¿Se ha implementado un sistema de control para asegurar que los posters y anuncios que no cuenten con el sello de aprobación del Departamento de Comunicación y Difusión sean retirados de manera oportuna?', 'Vinculacion'),
('¿Existen mecanismos de seguimiento y revisión periódica para garantizar que las publicaciones y promociones en las instalaciones del ITT se ajusten continuamente a las políticas establecidas y a las necesidades de la comunidad estudiantil y del personal?', 'Vinculacion'),
('¿Se ha presentado un oficio al Jefe del Departamento de Comunicación y Difusión para solicitar la autorización de colocar un módulo o stand promocional dentro del ITT, detallando la actividad y las fechas deseadas para su realización?', 'Vinculacion'),
('¿Se han establecido medidas para asegurar que la promoción dentro de las instalaciones del ITT se realice sin interrumpir las clases, evitando así la interferencia con las actividades académicas?', 'Vinculacion'),
('¿Se ha definido un área específica dentro del ITT para la instalación de los módulos o stands promocionales, y se han implementado restricciones para evitar la distribución de volantes fuera de esta zona designada?', 'Vinculacion'),
('¿Se han adoptado medidas para prevenir la contaminación auditiva durante las actividades promocionales, como la prohibición del uso de dispositivos de audio que puedan generar molestias en el entorno?', 'Vinculacion'),
('¿Existe un protocolo establecido para retirar del campus a aquellos que no cumplan con los lineamientos establecidos para la promoción dentro del ITT, garantizando así el cumplimiento de las normativas internas de comunicación y difusión?', 'Vinculacion'),
('¿Se ha implementado un sistema de seguimiento para garantizar la participación de los estudiantes en actividades culturales y deportivas como parte de su formación integral, conforme a lo establecido en las políticas operativas?', 'Vinculacion'),
('¿Se han establecido criterios claros para la selección de estudiantes destacados que participarán en eventos culturales, cívicos y deportivos representativos de la institución, asegurando así la aplicación efectiva de las competencias adquiridas?', 'Vinculacion'),
('¿Se han desarrollado programas de capacitación y orientación para los responsables de coordinar las actividades extraescolares, con el fin de asegurar su adecuada implementación y alineación con los objetivos de formación del TecNM?', 'Vinculacion'),
('¿Se ha diseñado un sistema de evaluación para medir el impacto de las actividades extraescolares en el desarrollo de competencias profesionales de los estudiantes, permitiendo así realizar ajustes y mejoras continuas en los programas?', 'Vinculacion'),
('¿Existe una comunicación efectiva entre los diferentes departamentos involucrados en la gestión de actividades extraescolares, garantizando la coordinación y colaboración necesarias para el éxito del programa y el cumplimiento de sus objetivos?', 'Vinculacion'),
('¿Cuál es el procedimiento establecido por el Departamento de Actividades Extraescolares para la expedición de la Constancia de Cumplimiento de la Actividad Complementaria a partir del periodo agosto-diciembre 2015?', 'Vinculacion'),
('¿Cómo se proporciona la constancia de competencia de actividad complementaria a los estudiantes que hayan cumplido con su actividad extracurricular con valor curricular de 1 crédito según los nuevos lineamientos?', 'Vinculacion'),
('¿Qué información se incluirá en el listado de estudiantes que hayan cumplido con su actividad complementaria, y dónde se publicará dicho listado para que los estudiantes puedan consultarlo?', 'Vinculacion'),
('¿Quiénes serán los responsables de avalar el listado de estudiantes y qué acciones deberán llevarse a cabo en el Departamento de Servicios Escolares una vez recibido dicho listado?', 'Vinculacion'),
('¿Qué procedimiento seguirá el estudiante en caso de que su nombre no aparezca en el listado de cumplimiento de actividad complementaria, o si detecta que fue registrado incorrectamente, según lo establecido por el Departamento de Actividades Extraescolares?', 'Vinculacion');