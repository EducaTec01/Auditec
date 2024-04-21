-- Crear la base de datos Auditoria
CREATE DATABASE IF NOT EXISTS AuditoriaPrueba;

-- Usar la base de datos Auditoria
USE AuditoriaPrueba;

-- Crear la tabla Login
CREATE TABLE IF NOT EXISTS Login (
    user varchar(50) not null,
    password varchar(50) not null,
    primary key(user, password),
    correoElectronico VARCHAR(255),
    nombre VARCHAR(255),
    id INT AUTO_INCREMENT UNIQUE,
    Acceso ENUM('Jefa', 'Auditor', 'auditado', 'INACTIVO')
);

-- Crear tabla departamentos
CREATE TABLE IF NOT EXISTS Departamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Auditorias (
	id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATE,
    fecha_final DATE,
    id_departamentos INT, -- Crear una llave foránea al id de Departamentos
    estado ENUM ('TERMINADA', 'PENDIENTE', 'ELIMINADA', 'VIGENCIA', 'ACTIVA'),
    FOREIGN KEY (id_departamentos) REFERENCES Departamentos(id)
);

CREATE TABLE IF NOT EXISTS Seccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);

-- Crear la tabla Asignacion
CREATE TABLE IF NOT EXISTS Asignacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_asignacion INT,
    id_auditor INT,
    id_auditado INT, -- encargado?    
    id_seccion INT,
    nomenclatura VARCHAR(100), -- QUE ES ESO
    comentarios TEXT,
    estado ENUM ('TERMINADA','ACTIVA','VIGENCIA'),
    FOREIGN KEY (id_asignacion) REFERENCES Asignacion(id),    
    FOREIGN KEY (id_seccion) REFERENCES Seccion(id),      
    FOREIGN KEY (id_auditado) REFERENCES Login(id),    
    FOREIGN KEY (id_auditor) REFERENCES Login(id) 
);

CREATE TABLE IF NOT EXISTS Seccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Subseccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    idseccion INT,
    link VARCHAR(255),
    FOREIGN KEY (idseccion) REFERENCES Seccion(id)
);

CREATE TABLE IF NOT EXISTS Preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT,
    idseccion INT,
    idsubseccion INT,
    requiere_evidencia BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (idseccion) REFERENCES Seccion(id),
    FOREIGN KEY (idsubseccion) REFERENCES Subseccion(id)
);

CREATE TABLE IF NOT EXISTS Respuestas (
    id_pregunta INT,
    id_asignacion INT,
    respuesta TEXT NOT NULL,
    fecha_respuesta DATE,
    genera_inconformidad BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id_pregunta, id_asignacion),  -- Clave primaria compuesta
    FOREIGN KEY (id_pregunta) REFERENCES Preguntas(id),
    FOREIGN KEY (id_asignacion) REFERENCES Asignacion(id)
);

CREATE TABLE IF NOT EXISTS Evidencias (
    id_pregunta INT,
    id_asignacion INT,
    evidencia MEDIUMBLOB NOT NULL,    
    PRIMARY KEY (id_pregunta, id_asignacion),  -- Clave primaria compuesta
    FOREIGN KEY (id_pregunta) REFERENCES Preguntas(id),
    FOREIGN KEY (id_asignacion) REFERENCES Asignacion(id)
);

-- Inserts de departamentos
INSERT INTO Departamentos (nombre) VALUES 
	('Ing. Industrial'),
	('Mantenimiento y equipo'),
	('Planeación, programación y presupuesto'),
	('Ing. Química y bioquímica'),
	('Recursos Financieros'),
	('Recursos Humanos'),
	('Recursos materiales'),
	('Servicios escolares'),
	('Sistemas computacionales'),
	('Centro de computo'),
	('Centro de graduados'),
	('Ciencias Básicas'),
	('Ciencias de la Tierra'),
	('Ciencias económico administrativas'),
	('Comunicación y Difusión'),
	('Desarrollo académico'),
	('División de estudios profesionales'),
	('Formación integral'),
	('Gestión tecnológica y vinculación');

INSERT INTO Auditorias (fecha_inicio, fecha_final, id_departamentos, estado) VALUES
	('2024-03-01', '2024-03-15', 1, 'ACTIVA'),
	('2024-03-01', '2024-03-15', 2, 'ACTIVA'), 
	('2024-03-01', '2024-03-15', 3, 'ACTIVA');

SELECT * FROM Auditorias;
INSERT INTO Login (user, password, correoElectronico, nombre, Acceso) VALUES
	('usuario1', 'contraseña1', 'usuario1@example.com', 'nombre1', 'Jefa'),
	('usuario2', 'contraseña2', 'usuario2@example.com', 'nombre2', 'Auditor'),
	('usuario3', 'contraseña3', 'usuario3@example.com', 'nombre3', 'Auditor'),
	('usuario4', 'contraseña4', 'usuario4@example.com', 'nombre4','auditado'),
	('usuario5', 'contraseña5', 'usuario5@example.com', 'nombre5','auditado');

-- Insertar datos en Seccion
INSERT INTO Seccion (nombre) VALUES 
	('Planeación'),
	('Calidad'),
	('Administrativos'),
	('Académicos'),
	('Vinculación');

-- Insertar filas en la tabla Asignacion
INSERT INTO Asignacion (id_asignacion, id_auditor, id_auditado, id_seccion, nomenclatura, comentarios, estado) VALUES 
	(1, 1, 2, 3, 'ASIG-001', 'Comentario de la asignación 1', 'ACTIVA'),
	(2, 2, 3, 1, 'ASIG-002', 'Comentario de la asignación 2', 'VIGENCIA'),
	(3, 3, 1, 2, 'ASIG-003', 'Comentario de la asignación 3', 'TERMINADA');


-- Insertar datos en Subseccion con los enlaces en un solo INSERT
INSERT INTO Subseccion (nombre, idseccion, link) VALUES 
    ('ITI-PL-IT-01', (SELECT id FROM Seccion WHERE nombre = 'Planeación'), 'https://drive.google.com/file/d/1p0OK7DstdI7JD4MGVvplGxoVv7UQXiMx/view'),
    ('ITI-PL-IT-02', (SELECT id FROM Seccion WHERE nombre = 'Planeación'), 'https://drive.google.com/file/d/1dEoJnEosVtDuaWKelwTd7e97v7w8Fjmh/view');

-- Insertar datos en Subseccion con el enlace para Calidad
INSERT INTO Subseccion (nombre, idseccion, link) VALUES 
    ('ITT-CA-IT-03 Apartado A', (SELECT id FROM Seccion WHERE nombre = 'Calidad'), 'https://drive.google.com/file/d/10m5zfypl2y73y01y7OZGydUO4Yu1eeYJ/view'),
    ('ITT-CA-IT-03 Apartado B', (SELECT id FROM Seccion WHERE nombre = 'Calidad'), 'https://drive.google.com/file/d/10m5zfypl2y73y01y7OZGydUO4Yu1eeYJ/view'),
    ('ITT-CA-PG-001', (SELECT id FROM Seccion WHERE nombre = 'Calidad'), 'https://drive.google.com/file/d/1goWmBUfobZDyOq7W1_fkBJgV_B5HPbQJ/view'),
    ('ITT-CA-PG-002', (SELECT id FROM Seccion WHERE nombre = 'Calidad'), 'https://drive.google.com/file/d/1XekooLIs3FGYd-_ms6coCw-eUvSy1Bf0/view'),
    ('ITT-CA-PG-003', (SELECT id FROM Seccion WHERE nombre = 'Calidad'), 'https://drive.google.com/file/d/1rEV4_U6CgbgLDgaYtNU9zsXE3J33HOk_/view'),
    ('ITT-CA-PG-004', (SELECT id FROM Seccion WHERE nombre = 'Calidad'), 'https://drive.google.com/file/d/1FvAt9raLY5vA2KNZNtNLBl1BIopkdoN_/view'),
	('ITT-CA-PG-005', (SELECT id FROM Seccion WHERE nombre = 'Calidad'), 'https://drive.google.com/file/d/1uQilmBWegCjXHkMyAj8dWn5im3vcxmvy/view'),
    ('ITT-CA-PO-001', (SELECT id FROM Seccion WHERE nombre = 'Calidad'), 'https://drive.google.com/file/d/1mAhaNFokpUW4uMrBsFIiFAjRb1P6zmAe/view'),
    ('ITT-CA-PO-002', (SELECT id FROM Seccion WHERE nombre = 'Calidad'), 'https://drive.google.com/file/d/1btc1kUobjdweZaiBhCSNVS3KqF17EQV0/view');
    
-- Insertar datos en Subseccion para la sección "Administrativos"
INSERT INTO Subseccion (nombre, idseccion, link) VALUES 
    ('ITT-AD-PO-001', (SELECT id FROM Seccion WHERE nombre = 'Administrativos'), 'https://drive.google.com/file/d/15J18sEJOTk8R9LGaD2r5gM9bEugdJyZt/view'),
    ('ITT-AD-PO-002', (SELECT id FROM Seccion WHERE nombre = 'Administrativos'), 'https://drive.google.com/file/d/1nPU0-8zUDKmG6gP-HHwi7LeVzFmsUaKh/view'),
    ('ITT-AD-PO-003', (SELECT id FROM Seccion WHERE nombre = 'Administrativos'), 'https://drive.google.com/file/d/1dAXCGiRp_YCCHr0CkN9X1tmJMcAi1cYF/view'),
    ('ITT-AD-PO-004', (SELECT id FROM Seccion WHERE nombre = 'Administrativos'), 'https://drive.google.com/file/d/1gX7GK90fKoJnaiy7HY60l8CSOIfTDk7G/view'),
    ('ITT-AD-PO-005', (SELECT id FROM Seccion WHERE nombre = 'Administrativos'), 'https://drive.google.com/file/d/1Nfk8okt2IEsG3U5HwWU-DOfCdp4hiRjW/view'),
    ('ITT-AD-PO-008', (SELECT id FROM Seccion WHERE nombre = 'Administrativos'), 'https://drive.google.com/file/d/1R1JTCVNCknvClrZWmUXpaIUcmeK8r6FU/view'),
    ('ITT-AD-PO-010', (SELECT id FROM Seccion WHERE nombre = 'Administrativos'), 'https://drive.google.com/file/d/1DkXLHZNz72PDfjufQUl3rq2PPHSJGGf6/view'),
    ('ITT-AD-PO-011', (SELECT id FROM Seccion WHERE nombre = 'Administrativos'), 'https://drive.google.com/file/d/13_b_P_B7CJvqyghL7GzSAvCBLWpZlkwY/view'),
    ('ITT-AD-PO-012', (SELECT id FROM Seccion WHERE nombre = 'Administrativos'), 'https://drive.google.com/file/d/184s1vlOqapwCWatKyIx19KmI0sQLJGs-/view');

INSERT INTO Subseccion (nombre, idseccion, link) VALUES 
    ('ITT-AC-PO-001', (SELECT id FROM Seccion WHERE nombre = 'Académicos'), 'https://drive.google.com/file/d/1RrY7u-zYb2rA2dqBwAlce8Fxh0vgbgJx/view'),
    ('ITT-AC-PO-002', (SELECT id FROM Seccion WHERE nombre = 'Académicos'), 'https://drive.google.com/file/d/1J47gYkkokeUD8_rQrXUfDwVICPQlI43p/view'),
    ('ITT-AC-PO-003', (SELECT id FROM Seccion WHERE nombre = 'Académicos'), 'https://drive.google.com/file/d/1iYX_MJ-1JqZqsna0le-m7feTylp67eai/view'),
    ('ITT-AC-PO-004', (SELECT id FROM Seccion WHERE nombre = 'Académicos'), 'https://drive.google.com/file/d/1ezx3f1zA1GeU5e-J_FhwILpebAIMkCQp/view'),
    ('ITT-AC-PO-005', (SELECT id FROM Seccion WHERE nombre = 'Académicos'), 'https://drive.google.com/file/d/1gGfzGGEyWkzwB8rd8HQEeZujOkByzPGZ/view'),
    ('ITT-AC-PO-007', (SELECT id FROM Seccion WHERE nombre = 'Académicos'), 'https://drive.google.com/file/d/1Vu25gi_oeSHYciNFUL4krCzUeCnkZgeH/view'),
    ('ITT-AC-PO-008', (SELECT id FROM Seccion WHERE nombre = 'Académicos'), 'https://drive.google.com/file/d/1FUvK7CsCueVHv-giWxhQH5Ab2p6EDaI6/view'),
    ('ITT-AC-PO-009', (SELECT id FROM Seccion WHERE nombre = 'Académicos'), 'https://drive.google.com/file/d/1tKhuj4-z_2vfqSE962yd7qCJfVPyuCP9/view');

INSERT INTO Subseccion (nombre, idseccion, link) VALUES 
    ('ITT-VI-DCD-PO-01', (SELECT id FROM Seccion WHERE nombre = 'Vinculación'), 'https://drive.google.com/file/d/1V6Bl3AVJwkkSH51j_ONKFB0yhONE2-wz/view'),
    ('ITT-VI-PO-003', (SELECT id FROM Seccion WHERE nombre = 'Vinculación'), 'https://drive.google.com/file/d/1wmRAP546o2gTCb7q_1k4rsv2E4htVgx1/view');

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el objetivo principal del instructivo establecido para la elaboración y gestión de la autorización del Programa de Trabajo Anual (PTA) del Instituto Tecnológico de Tijuana (ITT)?', 1, 1, FALSE),
    ('¿A quién aplica este procedimiento según el alcance establecido?', 1, 1, FALSE),
    ('¿Qué consideraciones deben tenerse en cuenta durante la elaboración del PTA en relación con el Programa de Desarrollo Institucional (PDI) del Instituto Tecnológico y los lineamientos del Tecnológico Nacional de México (TecNM)?', 1, 1, FALSE),
    ('¿Cuál es el calendario establecido para la presentación del Programa de Trabajo Anual (PTA) según las normativas del TecNM?', 1, 1, FALSE),
    ('¿Quiénes son los responsables de gestionar, asesorar, analizar, integrar, dar seguimiento y evaluar el PTA dentro del Instituto Tecnológico de Tijuana (ITT), según lo establecido en las reglas de operación del procedimiento?', 1, 1, FALSE),
    ('¿Cuál es el papel específico de la Secretaría de Planeación, Evaluación y Desarrollo Institucional de TecNM, a través de la Dirección de Planeación y Evaluación, en relación con el seguimiento y autorización del Programa de Trabajo Anual (PTA) del Instituto Tecnológico de Tijuana (ITT), según lo establecido en los lineamientos?', 1, 1, FALSE),
    ('¿Qué responsabilidades tienen los directores de áreas del TecNM con respecto a la elaboración, seguimiento y evaluación de sus Programas Institucionales Anuales y cómo se relacionan estas responsabilidades con el Programa de Trabajo Anual del ITT?', 1, 1, FALSE),
    ('¿Dónde se lleva a cabo la captura, evaluación y seguimiento de las metas del PTA, según lo establecido en los lineamientos?', 1, 1, FALSE),
    ('¿Cómo se utiliza el PTA como referencia en la realización, análisis y evaluación del Programa Operativo Anual (POA) del Instituto Tecnológico de Tijuana, según lo establecido en los procedimientos?', 1, 1, FALSE),
    ('¿Cuál es la base fundamental para la elaboración del PTA, según los lineamientos, y cómo contribuye este análisis al desarrollo de programas, proyectos y acciones dentro de la institución?', 1, 1, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el objetivo principal del instructivo establecido para la elaboración y gestión de la autorización del Programa Operativo Anual (POA) del Instituto Tecnológico de Tijuana (ITT)?', 1, 2, FALSE),
    ('¿A quién aplica este procedimiento según el alcance establecido?', 1, 2, FALSE),
    ('¿Qué normatividad debe seguirse durante la elaboración del POA según las reglas de operación establecidas?', 1, 2, FALSE),
    ('¿Cuál es el papel específico de la Secretaría de Planeación, Evaluación y Desarrollo Institucional, a través de la Dirección de Programación Presupuestal e Infraestructura Física del Tecnológico Nacional de México (TecNM), en relación con el seguimiento, revisión, retroalimentación y autorización del POA del ITT?', 1, 2, FALSE),
    ('¿Qué implicaciones tiene el ejercicio del presupuesto sin la autorización del POA de acuerdo con las reglas de operación establecidas?', 1, 2, FALSE),
    ('¿Cuál es la condición para ejercer la partida del Capítulo 1000 según lo establecido en las reglas de operación?', 1, 2, FALSE),
    ('¿Cuándo se debe llenar el formato del POA para el Desglose de Ingresos Propios Orientados al Mantenimiento Correctivo o Preventivo, y cuál es el monto mínimo establecido para requerir este desglose?', 1, 2, FALSE),
    ('¿Qué requisitos deben cumplirse para ejercer el Capítulo 5000 según las reglas de operación?', 1, 2, FALSE),
    ('¿Cuál es el período mínimo de uso del parque vehicular antes de su renovación, y bajo qué circunstancias podría renovarse antes?', 1, 2, FALSE),
    ('¿Cómo se llevará a cabo el proceso de validación para ciertas partidas relacionadas con tecnologías de información y comunicación, según lo establecido en los lineamientos?', 1, 2, FALSE),
    ('¿Cuál es la responsabilidad del Departamento de Recursos Financieros en relación con la información financiera del Gasto de Ingresos Propios y Gasto Directo, según lo establecido en las reglas de operación?', 1, 2, FALSE),
    ('¿Qué se debe hacer con el POA en caso de que haya ampliaciones, reducciones o reprogramaciones autorizadas por el TecNM?', 1, 2, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Qué tipos de informes se presentan como información de entrada para la Revisión por la Dirección según el procedimiento establecido?', 2, 3, FALSE),
    ('¿Qué formatos se utilizan para recopilar la retroalimentación del cliente y cuál es su objetivo dentro del proceso de revisión?', 2, 3, FALSE),
    ('¿Qué tipo de información se incluye para retroalimentar al Sistema de Gestión de la Calidad (SGC) proveniente de las partes interesadas?', 2, 3, FALSE),
    ('¿Qué aspectos se revisan en relación con el desempeño de los procesos y la conformidad del servicio durante la Revisión por la Dirección?', 2, 3, FALSE),
    ('¿Cuál es la importancia de revisar el estado de las Acciones Correctivas y Preventivas en el contexto de la Revisión por la Dirección?', 2, 3, FALSE),
    ('¿Qué se incluye en las acciones de seguimiento de revisiones anteriores efectuadas por la Dirección durante la Revisión por la Dirección?', 2, 3, FALSE),
    ('¿Por qué es relevante considerar los cambios que pueden afectar al SGC durante la Revisión por la Dirección?', 2, 3, FALSE),
    ('¿Cuál es el propósito de incluir recomendaciones para la mejora como parte de la información de entrada para la Revisión por la Dirección?', 2, 3, FALSE);
    
INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Qué aspectos están incluidos en los resultados de la Revisión por la Dirección en relación con la mejora de la eficacia del SGC y sus procesos?', 2, 4, FALSE),
    ('¿Cómo se asegura que la Revisión por la Dirección contribuya a la mejora del Servicio Educativo en relación con los requisitos del cliente y las partes interesadas?', 2, 4, FALSE);
    
INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el nombre del documento que encabeza todas las páginas del procedimiento y cómo debe ser redactado?', 2, 5, FALSE),
    ('¿Cuál es el código asignado al procedimiento y cómo se especifica su integración?', 2, 5, FALSE),
    ('¿Cómo se indica el nivel de revisión del documento y qué significan las letras utilizadas para este propósito?', 2, 5, FALSE),
    ('¿Qué información se registra en la sección de página del recuadro de identificación?', 2, 5, FALSE),
    ('¿En qué casos se incluye la referencia a la Norma ISO 9001-2015 en el recuadro de identificación y qué indica su presencia?', 2, 5, FALSE),
    ('¿Cuál es el propósito del procedimiento establecido?', 2, 5, FALSE),
    ('¿A quiénes aplica el control de la información documentada según el alcance del procedimiento?', 2, 5, FALSE),
    ('¿Cuál es la política respecto a las copias en papel de los documentos del Sistema de Gestión de la Calidad?', 2, 5, FALSE),
    ('¿Quién es la única persona autorizada para imprimir documentos del SGC y qué debe verificar al hacerlo?', 2, 5, FALSE),
    ('¿Cómo se notifican los cambios y correcciones realizados a los documentos controlados, y quién se encarga de informar a los responsables de los procesos?', 2, 5, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento establecido para el control de registros de calidad?', 2, 6, FALSE),
    ('¿A quiénes aplica este procedimiento según su alcance?', 2, 6, FALSE),
    ('¿Quién es responsable del control de identificación, almacenamiento, protección, recuperación, tiempo de retención y disposición de los registros de calidad?', 2, 6, FALSE),
    ('¿Cómo se convierten los formatos de procedimientos en registros de calidad y qué responsabilidad tienen los usuarios al respecto?', 2, 6, FALSE),
    ('¿Qué se debe hacer en caso de necesitar corregir un registro controlado por folio según la política establecida?', 2, 6, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento establecido para las Auditorías Internas en el Instituto Tecnológico de Tijuana?', 2, 7, FALSE),
    ('¿Quién es responsable de elaborar el programa anual de auditorías internas en el Instituto?', 2, 7, FALSE),
    ('¿Qué se debe considerar para determinar la viabilidad de una auditoría interna?', 2, 7, FALSE),
    ('¿Cuál es la responsabilidad del líder del equipo auditor antes de llevar a cabo las actividades de la auditoría in situ?', 2, 7, FALSE),
    ('¿Qué acciones deben llevarse a cabo después de la entrega del Informe de Auditoría según las políticas establecidas?', 2, 7, FALSE);
    
INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento establecido para el Servicio No Conforme en el Instituto Tecnológico de Tijuana?', 2, 8, FALSE),
    ('¿Qué alcance tiene este procedimiento dentro del Instituto Tecnológico de Tijuana?', 2, 8, FALSE),
    ('¿Quiénes son responsables de identificar, registrar y controlar el Servicio No Conforme según las políticas de operación establecidas?', 2, 8, FALSE),
    ('¿Qué acciones deben aplicarse para tratar el Servicio No Conforme de acuerdo con el plan de calidad?', 2, 8, FALSE),
    ('¿Qué se debe hacer cuando se corrige un Servicio No Conforme para demostrar su conformidad con los requisitos?', 2, 8, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento establecido para las Acciones Correctivas en el Instituto Tecnológico de Tijuana?', 2, 9, FALSE),
    ('¿A qué áreas o procesos del Instituto Tecnológico de Tijuana aplica este procedimiento?', 2, 9, FALSE),
    ('¿Qué fuentes pueden originar las No Conformidades o Servicios No Conformes (SNC) que requieren Acciones Correctivas según las políticas de operación?', 2, 9, FALSE),
    ('¿Quién debe estar informado en todo momento sobre las No Conformidades detectadas y las Acciones Correctivas implementadas?', 2, 9, FALSE),
    ('¿Quién es responsable de realizar el análisis de la Causa Raíz de las No Conformidades y determinar la acción correctiva o corrección correspondiente?', 2, 9, FALSE),
    ('Muestre evidencias de los formatos de acciones correctivas', 2, 9, TRUE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento establecido para atender las Quejas o Sugerencias de los Estudiantes en el Instituto Tecnológico de Tijuana?', 2, 10, FALSE),
    ('¿Qué aspectos del Instituto Tecnológico de Tijuana abarca este procedimiento, desde qué etapa hasta cuál?', 2, 10, FALSE),
    ('¿Cuál es el método establecido para que los estudiantes envíen sus Quejas o Sugerencias al Instituto Tecnológico de Tijuana?', 2, 10, FALSE),
    ('¿Quién es el responsable de consultar diariamente el Buzón virtual de Quejas y/o Sugerencias establecido en el portal del Instituto Tecnológico de Tijuana?', 2, 10, FALSE),
    ('¿Cómo se manejan las Quejas y/o Sugerencias una vez que son registradas en la bitácora electrónica del Instituto Tecnológico de Tijuana?', 2, 10, FALSE),
    ('¿Cuál es la responsabilidad del Coordinador del SGC en relación con las Quejas y/o Sugerencias recibidas?', 2, 10, FALSE),
    ('¿Cómo se garantiza el anonimato de la persona que interpone una Queja y/o Sugerencia según el procedimiento establecido?', 2, 10, FALSE),
    ('¿Qué debe hacer la Subdirección o el Departamento responsable cuando reciben una Queja y/o Sugerencia?', 2, 10, FALSE),
    ('¿Qué responsabilidad tiene el Coordinador del SGC respecto al seguimiento de las acciones tomadas en respuesta a las Quejas y/o Sugerencias?', 2, 10, FALSE),
    ('¿Cuándo y cómo se informa el estado de las Quejas y/o Sugerencias en la Revisión por la Dirección?', 2, 10, FALSE);
    
INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Quién es responsable de elaborar el programa para la aplicación de Auditorías de Servicios en el Instituto Tecnológico de Tijuana?', 2, 11, FALSE),
    ('¿Cuál es la responsabilidad del Coordinador del SGC en relación con la aplicación y evaluación de las Auditorías de Servicios?', 2, 11, FALSE),
    ('¿Cómo se determina la frecuencia de las Encuestas de Servicios en el Instituto?', 2, 11, FALSE),
    ('¿A quiénes se les aplicarán las Encuestas de Servicios en el Instituto Tecnológico de Tijuana?', 2, 11, FALSE),
    ('¿Cómo se pueden llevar a cabo las Encuestas de Servicios, y quiénes pueden ser seleccionados como auditores en caso de aplicarse de manera manual?', 2, 11, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Quién es responsable de verificar la infraestructura y equipo del Instituto Tecnológico semestralmente según las políticas de operación?', 3, 12, FALSE),
    ('¿Cómo se gestionan las solicitudes de mantenimiento de los diferentes departamentos del Instituto Tecnológico?', 3, 12, FALSE),
    ('¿Qué documentos deben elaborar los Jefes de Departamentos de Recursos Materiales y Servicios, Mantenimiento de Equipo y/o Centro de Cómputo para administrar el Programa de Mantenimiento Preventivo? Mostrar evidencia', 3, 12, TRUE),
    ('¿Qué criterios se utilizan para decidir si el mantenimiento será realizado internamente por el personal del Instituto Tecnológico o a través de proveedores externos?', 3, 12, FALSE),
    ('¿Cómo se diferencia el mantenimiento preventivo del correctivo según las políticas establecidas en el procedimiento?', 3, 12, FALSE),
    ('¿Quién tiene la facultad de reasignar el procedimiento de mantenimiento en caso de no contar con los departamentos específicos para realizarlo?', 3, 12, FALSE),
    ('¿Cómo se prioriza la distribución presupuestal de los recursos en el programa de mantenimiento preventivo, según las políticas establecidas?', 3, 12, FALSE),
    ('¿Qué áreas o equipos se consideran prioritarios en la distribución de recursos para el mantenimiento, según las políticas del Instituto Tecnológico?', 3, 12, FALSE),
    ('¿Quiénes son responsables de solicitar mantenimiento para el hardware, material y equipo didáctico del Instituto Tecnológico?', 3, 12, FALSE),
    ('¿Quién debe cubrir los gastos de operación para el mantenimiento prestado por los CRODES?', 3, 12, FALSE);
    
INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento de captación de ingresos propios en el Instituto Tecnológico?', 3, 13, FALSE),
    ('¿A quién aplica el alcance del procedimiento de captación de ingresos propios en el Instituto Tecnológico?', 3, 13, FALSE),
    ('¿Quién es responsable de publicar las cuotas de cobro de servicios autorizadas por el Comité de Planeación del Instituto Tecnológico?', 3, 13, FALSE),
    ('¿A quiénes se aplica el procedimiento de captación de ingresos propios en el Instituto Tecnológico?', 3, 13, FALSE),
    ('¿Qué lineamientos deben seguir el personal encargado de aplicar este procedimiento según las políticas establecidas?', 3, 13, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento de reclutamiento, selección y contratación de personal en el Instituto Tecnológico?', 3, 14, FALSE),
    ('¿Cuál es el alcance del procedimiento de reclutamiento, selección y contratación de personal en el Instituto Tecnológico?', 3, 14, FALSE),
    ('¿Quién es responsable de la aplicación correcta de este procedimiento según las políticas establecidas?', 3, 14, FALSE),
    ('¿Cuál es el papel de la Comisión Dictaminadora en el proceso de reclutamiento, selección y contratación de personal?', 3, 14, FALSE),
    ('¿Qué normatividad se debe seguir al publicar las convocatorias de reclutamiento según las políticas del Instituto Tecnológico?', 3, 14, FALSE);
    
INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento de mantenimiento del Centro de Cómputo en el Instituto Tecnológico de Tijuana?', 3, 15, FALSE),
    ('¿Cuál es el alcance del procedimiento de mantenimiento preventivo y/o correctivo del Centro de Cómputo en el Instituto Tecnológico de Tijuana?', 3, 15, FALSE),
    ('¿Quiénes son responsables de realizar la verificación semestral de la infraestructura y equipo del Centro de Cómputo según las políticas establecidas?', 3, 15, FALSE),
    ('¿Cómo se elabora el Programa de Mantenimiento Preventivo del Equipo en el Centro de Cómputo según las políticas del Instituto Tecnológico de Tijuana?', 3, 15, FALSE),
    ('¿Cómo se determina si el mantenimiento preventivo o correctivo se realizará internamente o a través de proveedores externos según las políticas establecidas?', 3, 15, FALSE),
    ('¿Quién tiene la facultad de reasignar el procedimiento de mantenimiento en caso de no contar con los departamentos correspondientes según la estructura orgánica del Instituto Tecnológico de Tijuana?', 3, 15, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento de determinación y mantenimiento del ambiente de trabajo en la organización?', 3, 16, FALSE),
    ('¿A quién aplica el alcance del procedimiento de determinación y mantenimiento del ambiente de trabajo?', 3, 16, FALSE),
    ('¿Quién es responsable de programar las fechas para la aplicación de la encuesta para Determinar el Ambiente de Trabajo según las políticas de operación?', 3, 16, FALSE),
    ('¿Quién es responsable de aplicar, concentrar y procesar los datos de la organización para determinar el ambiente de trabajo?', 3, 16, FALSE),
    ('¿En qué periodos se debe aplicar la Encuesta para determinar el ambiente de trabajo según las políticas establecidas?', 3, 16, FALSE),
    ('¿Qué autorización se requiere para solicitar una evaluación de ambiente de trabajo extemporánea según las políticas de operación?', 3, 16, FALSE),
    ('¿Cuándo se deben tomar acciones en respuesta a los resultados de la encuesta de ambiente de trabajo y qué actividades abarcan estas acciones?', 3, 16, FALSE),
    ('¿Con qué periodicidad se debe realizar la encuesta de ambiente de trabajo en la organización según las políticas establecidas?', 3, 16, FALSE),
    ('¿Qué sucede si la organización no cuenta con el titular del área responsable de la encuesta de ambiente de trabajo según las políticas establecidas?', 3, 16, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento de formación y capacitación del personal directivo, de apoyo y asistencia a la educación en el Instituto Tecnológico de Tijuana?', 3, 17, FALSE),
    ('¿A quién aplica el alcance del procedimiento de formación y capacitación en el Instituto Tecnológico de Tijuana?', 3, 17, FALSE),
    ('¿Quién es responsable de coordinar los cursos y elaborar un diagnóstico de necesidades de capacitación según las políticas establecidas?', 3, 17, FALSE),
    ('¿Cómo se financia la realización de los eventos de formación y capacitación según las políticas del Instituto Tecnológico de Tijuana?', 3, 17, FALSE),
    ('¿Cómo se determinan las necesidades de formación y capacitación de los directivos, trabajadores de apoyo y asistencia a la educación en la institución?', 3, 17, FALSE),
    ('¿Cuál es el enfoque de los cursos que se imparten según las políticas establecidas?', 3, 17, FALSE),
    ('¿Quién es designado como responsable para coordinar los cursos en el Instituto Tecnológico de Tijuana?', 3, 17, FALSE),
    ('¿Qué responsabilidades tiene el coordinador asignado en relación con la realización de los cursos según las políticas del Instituto Tecnológico de Tijuana?', 3, 17, FALSE),
    ('¿Qué se entiende por "actualización" según las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Cuál es la diferencia entre "capacitación" y "actualización" según las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Qué se entiende por "desarrollo" en el contexto de las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Cuál es la definición de "competencia" según las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Qué es un "curso" según las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Qué significa "TecNM" según las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Qué se entiende por "DNC" según las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Cuál es la importancia de las "estadísticas de seguimiento" en el contexto de la capacitación?', 3, 17, FALSE),
    ('¿Quién es un "instructor(a)" según las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Qué se entiende por "objetivo del curso" según las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Qué significan las siglas "PAC", "PIA" y "POA" según las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Qué es un "programa de formación" según las definiciones proporcionadas?', 3, 17, FALSE),
    ('¿Qué implica el "seguimiento" en el contexto de la capacitación?', 3, 17, FALSE),
    ('¿Qué se entiende por "desempeño energético" según las definiciones proporcionadas?', 3, 17, FALSE);
    
INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento de alta de bienes muebles instrumentales en el Instituto Tecnológico de Tijuana?', 3, 18, FALSE),
    ('¿A quién aplica el alcance del procedimiento de alta de bienes muebles instrumentales en el Instituto Tecnológico de Tijuana?', 3, 18, FALSE),
    ('¿Qué políticas deben seguirse para dar de alta los bienes muebles instrumentales en los registros del Instituto Tecnológico de Tijuana?', 3, 18, FALSE),
    ('¿Cuál es el método establecido para realizar solicitudes de alta de bienes muebles instrumentales en el Instituto Tecnológico de Tijuana?', 3, 18, FALSE),
    ('¿Qué información se debe proporcionar al capturar el folio de la solicitud de alta en el Sistema de bienes instrumentales en la SEP (SIBESEP)?', 3, 18, FALSE),
    ('¿Qué se debe hacer si un bien inmueble instrumental carece de alguno de los datos requeridos durante el proceso de alta?', 3, 18, FALSE),
    ('¿Ante quién se debe solicitar el alta de los bienes muebles instrumentales recibidos en el Instituto Tecnológico de Tijuana?', 3, 18, FALSE),
    ('¿Cómo se asigna el número de inventario a los bienes muebles instrumentales según las políticas establecidas?', 3, 18, FALSE),
    ('¿Qué se debe hacer en caso de que un bien mueble instrumental no tenga una clave correspondiente en el Catálogo de Bienes Muebles (CABM)?', 3, 18, FALSE),
    ('¿Qué requisito debe cumplirse para incluir un bien mueble instrumental en el resguardo individual de un servidor público?', 3, 18, FALSE),
    ('¿Cuál es la responsabilidad del empleado del Instituto Tecnológico de Tijuana con respecto al uso y cuidado de los bienes muebles asignados?', 3, 18, FALSE),
    ('¿Quién es el responsable de la administración y control del activo fijo en el Instituto Tecnológico de Tijuana según las políticas establecidas?', 3, 18, FALSE),
    ('¿Cómo se debe solicitar cualquier registro o movimiento al inventario de los bienes muebles en el Instituto Tecnológico de Tijuana?', 3, 18, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento de trámite y control de viáticos en el Instituto Tecnológico de Tijuana?', 3, 19, FALSE),
    ('¿A quién corresponde la responsabilidad de planear y administrar los viajes de estudio, asistencia a congresos y visitas industriales en el Instituto Tecnológico de Tijuana?', 3, 19, FALSE),
    ('¿Qué documentos se utilizan para otorgar los viáticos según las políticas de operación establecidas?', 3, 19, FALSE),
    ('¿Quién autoriza las comisiones oficiales en el Instituto Tecnológico de Tijuana?', 3, 19, FALSE),
    ('¿Cuál es el criterio para autorizar las comisiones según las políticas de operación establecidas?', 3, 19, FALSE),
    ('¿Qué requisito debe cumplir un servidor público para que se le autoricen viáticos en el Instituto Tecnológico de Tijuana?', 3, 19, FALSE),
    ('¿En qué casos no se pueden autorizar comisiones y, por lo tanto, otorgar pasajes y viáticos según las políticas establecidas?', 3, 19, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el propósito del procedimiento de adquisición de bienes y servicios en el Instituto Tecnológico de Tijuana?', 3, 20, FALSE),
    ('¿Desde qué etapa hasta cuál se aplica este procedimiento?', 3, 20, FALSE),
    ('¿Qué autorización es necesaria para ejercer el presupuesto?', 3, 20, FALSE),
    ('¿Cuál es el umbral de monto para las adquisiciones que pueden realizarse directamente sin considerar el IVA?', 3, 20, FALSE),
    ('¿Qué se requiere cuando la adquisición excede las 300 UMAS o su equivalente en moneda nacional?', 3, 20, FALSE),
    ('¿Cuál es la responsabilidad de la Oficina de Adquisiciones en el Instituto Tecnológico de Tijuana en relación con la selección de proveedores para la adquisición de bienes y servicios?', 3, 20, FALSE),
    ('¿Cómo se evalúa el catálogo de proveedores aprobados y cuándo se lleva a cabo esta reevaluación?', 3, 20, FALSE),
    ('¿Qué datos debe proporcionar un proveedor al entregar una factura electrónica (PDF-XML) al almacén?', 3, 20, FALSE);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
	('¿Se verifica que los solicitantes entreguen la documentación completa requerida para la inscripción, incluyendo la solicitud de inscripción, certificados de bachillerato o equivalente, equivalencia de estudios de licenciatura (si corresponde), comprobante de pago de cuota de inscripción, acta de nacimiento, CURP, certificado médico (si aplicable), y documento firmado?', 4, 21, false),
	('¿Se comprueba que los certificados de bachillerato o equivalentes presentados estén en regla y sean auténticos, verificando la autenticidad de los documentos a través de los organismos pertinentes o instituciones emisoras?', 4, 21, false),
	('¿Se revisa que el contrato firmado por el estudiante cumpla con todos los términos y condiciones establecidos por el instituto Tecnológico de Tijuana, garantizando que el estudiante esté plenamente informado y conforme con las obligaciones y responsabilidades?', 4, 21, false),
	('¿Se confirma que los egresados del CONALEP presenten tanto el certificado equivalente al bachillerato como el certificado técnico otorgado, garantizando que cumplan con todos los requisitos académicos para su inscripción en el instituto?', 4, 21, false),
	('¿Cuántas personas cumplen con el contrato con el/la estudiante?', 4, 21, false),
	('¿Se cumplen los tiempos de entrega de la asignación de número de control en el Instituto Tecnológico de Tijuana? Entregue evidencias.', 4, 21, TRUE),
	('¿Cuáles son los pasos relacionados con la inscripción de aspirantes en el Instituto Tecnológico de Tijuana?', 4, 21, false),
	('¿Quién es responsable de publicar la lista de aspirantes aceptados según las políticas operativas del Instituto Tecnológico de Tijuana? ¿se entregaron a tiempo? ¿Hubo la difusión necesaria?', 4, 21, false),
	('¿Cómo se compone el número de control de un estudiante en el Instituto Tecnológico según la descripción proporcionada?', 4, 21, false),
	('¿Qué significan los dos primeros dígitos del número de control de un estudiante en el Instituto Tecnológico?', 4, 21, false),
	('¿Cómo se determina el número de estudiante dentro del número de control en el Instituto Tecnológico?', 4, 21, false),
	('¿Cómo se gestionan los números de control para los estudiantes de nuevo ingreso en el Instituto Tecnológico durante el periodo actual según las políticas descritas?', 4, 21, false);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
	('¿Se han seguido adecuadamente los lineamientos establecidos para la reinscripción de los estudiantes en el Instituto Tecnológico Tijuana para garantizar que se realice en tiempo y forma? Mostrar evidencia', 4, 22, true),
	('¿Todos los estudiantes que cumplen con los requisitos para la reinscripción según el Manual de Lineamientos Académico Administrativo del Tecnológico Nacional de México 2015 han sido incluidos en el proceso de reinscripción?', 4, 22, false),
	('¿Se ha convocado a todas las áreas pertinentes, como el Departamento de Planeación, Programación y Presupuestación, la División de Estudios Profesionales y el Departamento de Servicios Escolares, para la elaboración y estructuración del Calendario Académico?', 4, 22, false),
	('¿Se ha publicado el orden de reinscripción y las referencias de pago con la anticipación adecuada, según lo establecido en las políticas operativas del Instituto Tecnológico Tijuana?', 4, 22, false),
	('¿Se ha verificado que el pago de la reinscripción se haya realizado correctamente, ya sea en efectivo en la caja designada o a través de la sucursal bancaria indicada por el Instituto Tecnológico, y que se haya obtenido el recibo oficial de cobro antes de la asignación de la carga académica?', 4, 22, false);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
	('¿Conoces las recomendaciones dadas a los alumnos sobre el cuidado de sus documentos, título y cédula? ¿Cuáles son?', 4, 23, false),
	('Los alumnos que reciben su título ¿se les informa de las recomendaciones dadas por parte del tecnológico de Tijuana? Mostrar evidencias', 4, 23, true),
	('¿Se ha garantizado el registro del Título y la expedición de la Cédula profesional para todos los egresados de licenciatura del Instituto Tecnológico de Tijuana que cumplen con los requisitos establecidos para el trámite?', 4, 23, false),
	('¿Se han identificado y seleccionado adecuadamente a los egresados de licenciatura del Instituto Tecnológico de Tijuana que cumplen con los criterios requeridos para iniciar el proceso de titulación y obtención de Cédula profesional?', 4, 23, false),
	('¿Se han realizado todos los pagos correspondientes al trámite administrativo de titulación por parte de los egresados, según lo estipulado en las políticas operativas establecidas?', 4, 23, false),
	('¿Se ha proporcionado una orientación clara y efectiva por parte del Jefe del departamento de División de Estudios Profesionales a los egresados para guiarlos en el proceso de titulación?', 4, 23, false),
	('¿Se ha llevado a cabo de manera oportuna y eficiente la recepción, verificación y trámite de expedientes por parte del jefe de la Dirección de Servicios Escolares Estudiantiles (TecNM) y la Dirección General de Profesiones (DGP), respectivamente, para garantizar la entrega correcta de Título y Cédula profesional a los egresados?', 4, 23, false);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
	('¿Se ha asegurado el cumplimiento de los programas de todas las asignaturas del plan de estudios de cada programa impartido en el Instituto Tecnológico de Tijuana?', 4, 24, false),
	('¿Se ha verificado que todos los docentes que imparten clases a nivel licenciatura en las diferentes áreas académicas del Instituto hayan seguido el procedimiento establecido para garantizar el cumplimiento de los programas de asignaturas?', 4, 24, false),
	('¿Se han aplicado las políticas operativas vigentes para asegurar que todos los programas de asignaturas sean impartidos conforme a la normatividad establecida por el Tecnológico Nacional de México para la acreditación de asignaturas?', 4, 24, false),
	('¿Se ha supervisado que los docentes hayan capturado la planeación del curso en el sistema antes del inicio de clases, y que hayan realizado seguimientos periódicos de la gestión del curso y la instrumentación didáctica en las semanas indicadas?', 4, 24, false),
	('¿Se ha garantizado que la entrega de la planeación del curso y la instrumentación didáctica se haya realizado en tiempo y forma, evitando la consideración de actividades fuera de tiempo para la liberación de actividades frente a grupo? Mostrar evidencias', 4, 24, true),
	('¿Se han mostrado y contabilizado de manera adecuada los horarios del docente, firmados y conforme a las políticas establecidas, como parte del proceso de seguimiento y medición de la gestión de curso en el Instituto Tecnológico de Tijuana?', 4, 24, false);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
	('¿Se han aplicado los instrumentos de Evaluación Docente a por lo menos el 60% de los estudiantes de cada asignatura que cursan en el semestre, en los meses de mayo y noviembre, como lo indica la política operativa del Departamento de Desarrollo Académico?', 5, 25, false),
	('¿Se ha analizado adecuadamente por área académica los resultados de las evaluaciones docentes para integrar el Registro de Retroalimentación del Estudiante en el formato ITT-CA-PO-005-01, como parte del proceso de mejora continua del Sistema de Gestión de la Calidad?', 5, 25, false),
	('¿Se han tomado acciones concretas basadas en la retroalimentación proporcionada por los estudiantes en las evaluaciones docentes, como parte de la revisión por la Dirección, para mejorar el desempeño de los docentes y el proceso educativo en el Instituto Tecnológico?', 5, 25, false);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
	('¿Se ha llevado a cabo la evaluación del desempeño de los docentes conforme a los instrumentos establecidos, con el propósito de obtener información relevante para mejorar el proceso educativo y como una medida de desempeño del Sistema de Gestión de la Calidad en el Instituto Tecnológico?', 4, 26, false),
	('¿Se ha aplicado el procedimiento de evaluación docente a al menos el 60% de los estudiantes de cada asignatura cursada en el semestre, según lo estipulado por el Departamento de Desarrollo Académico, durante el semestre presente?', 4, 26, false),
	('¿Se ha realizado un análisis adecuado de los resultados de las evaluaciones por área académica por parte del Departamento de Desarrollo Académico, con el fin de integrar el Registro de la Retroalimentación del Estudiante para su posterior revisión por la Dirección, según lo establecido en las políticas operativas?', 4, 26, false),
	('Mostrar evidencia de los reportes de residencias profesionales', 4, 26, true),
	('¿Se ha verificado que las actividades realizadas durante la Residencia Profesional estén alineadas con los objetivos establecidos en la normativa para la formación y desarrollo de competencias profesionales del Instituto Tecnológico de Tijuana?', 4, 26, false),
	('¿Se aseguró de que todos los estudiantes inscritos en nivel licenciatura y que son candidatos a realizar Residencia Profesional estén cumpliendo con los requisitos establecidos para su acreditación?', 4, 26, false),
	('¿Se ha comprobado que el proyecto de Residencia Profesional, ya sea individual, grupal o interdisciplinario, esté abordando un problema específico de la realidad social y productiva, como se define en la normativa institucional?', 4, 26, false);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
	('¿Se ha verificado que los egresados con plan de estudios 2009, 2010, 2013 y 2014 del Tecnológico Nacional de México cumplan con los requisitos académicos establecidos para la titulación integral, incluyendo el registro de proyecto, la solicitud correspondiente, y la presentación del trabajo profesional?', 4, 27, false),
	('¿Se han cumplido adecuadamente los requisitos administrativos para la titulación integral, como la obtención del oficio de no Inconveniencia No? 1, la presentación del comprobante de E-firma del registro del SAT, y la entrega de documentos como CURP, acta de nacimiento, y certificados de bachillerato y licenciatura, entre otros?', 4, 27, false),
	('¿Se ha corroborado que los egresados hayan cumplido con los requisitos adicionales, como la acreditación de un programa de lengua extranjera, la presentación de equivalencias, revalidaciones o prórrogas de semestre, y la entrega de una fotografía tamaño credencial, conforme a lo establecido en la política de operación para la titulación integral?', 4, 27, false);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
	('¿Se ha elaborado y puesto en marcha el Programa Institucional de Formación y Actualización Docente y Profesional, conforme a las necesidades detectadas en el Instituto Tecnológico y los resultados de la evaluación docente?', 4, 28, false),
	('¿Se ha coordinado adecuadamente el Departamento de Desarrollo Académico con los Departamentos Académicos para priorizar los contenidos temáticos y facilitadores necesarios para la formación y actualización docente y profesional?', 4, 28, false),
	('¿Se han asignado los recursos económicos necesarios para la implementación de los cursos de actualización docente y profesional requeridos por los profesores, de acuerdo con el Programa Institucional establecido?', 4, 28, false),
	('¿Se ha garantizado la difusión del Programa Institucional de Formación y Actualización Docente y Profesional a todos los Departamentos Académicos y academias, asegurando que los docentes estén informados sobre las oportunidades de formación disponibles?', 4, 28, false),
	('¿Se han cumplido los criterios de asistencia, participación y evaluación establecidos para los docentes comisionados a eventos de formación y actualización, asegurando un mínimo del 90% de asistencia y el cumplimiento de las actividades programadas para obtener el documento de participación?', 4, 28, false);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
    ('¿Cuál es el objetivo principal de la comunicación interna y externa dentro de la institución?', 5, 29, false),
    ('¿Qué alcance tiene este procedimiento en términos de difusión de información?', 5, 29, false),
    ('¿Cuáles son las responsabilidades del Departamento de Comunicación y Difusión en relación con la difusión interna y externa?', 5, 29, false),
    ('¿Qué medios de comunicación se utilizan para difundir la información? ¿Depende de qué tipo de material se va a compartir?', 5, 29, false),
    ('¿Quién es el responsable de la vigencia y el contenido de las publicaciones?', 5, 29, false),
    ('¿Se ha llevado a cabo una revisión exhaustiva de las publicaciones relacionadas con servicios sociales, eventos internos de la comunidad estudiantil, permisos para promociones y ventas dentro de la institución, publicaciones externas y activaciones de marcas para garantizar el cumplimiento de la política establecida?', 5, 29, false),
    ('¿Existe un registro documentado de las autorizaciones otorgadas para la difusión de información relacionada con terceros, conforme a los criterios de publicación establecidos por el Departamento de Comunicación y Difusión?', 5, 29, false),
    ('¿Se ha verificado que las publicaciones externas en las instalaciones del ITT cumplan con los criterios de restricción, excluyendo aquellas que promocionen bebidas alcohólicas, servicios financieros, lenguaje obsceno, entre otros, como se establece en la política?', 5, 29, false),
    ('¿Se ha implementado un sistema de control para asegurar que los posters y anuncios que no cuenten con el sello de aprobación del Departamento de Comunicación y Difusión sean retirados de manera oportuna?', 5, 29, false),
    ('¿Existen mecanismos de seguimiento y revisión periódica para garantizar que las publicaciones y promociones en las instalaciones del ITT se ajusten continuamente a las políticas establecidas y a las necesidades de la comunidad estudiantil y del personal?', 5, 29, false),
    ('¿Se ha presentado un oficio al Jefe del Departamento de Comunicación y Difusión para solicitar la autorización de colocar un módulo o stand promocional dentro del ITT, detallando la actividad y las fechas deseadas para su realización?', 5, 29, false),
    ('¿Se han establecido medidas para asegurar que la promoción dentro de las instalaciones del ITT se realice sin interrumpir las clases, evitando así la interferencia con las actividades académicas?', 5, 29, false),
    ('¿Se ha definido un área específica dentro del ITT para la instalación de los módulos o stands promocionales, y se han implementado restricciones para evitar la distribución de volantes fuera de esta zona designada?', 5, 29, false),
    ('¿Se han adoptado medidas para prevenir la contaminación auditiva durante las actividades promocionales, como la prohibición del uso de dispositivos de audio que puedan generar molestias en el entorno?', 5, 29, false),
    ('¿Existe un protocolo establecido para retirar del campus a aquellos que no cumplan con los lineamientos establecidos para la promoción dentro del ITT, garantizando así el cumplimiento de las normativas internas de comunicación y difusión?', 5, 29, false);

INSERT INTO Preguntas (pregunta, idseccion, idsubseccion, requiere_evidencia) VALUES 
	('¿Se ha implementado un sistema de seguimiento para garantizar la participación de los estudiantes en actividades culturales y deportivas como parte de su formación integral, conforme a lo establecido en las políticas operativas?', 5, 30, false),
	('¿Se han establecido criterios claros para la selección de estudiantes destacados que participarán en eventos culturales, cívicos y deportivos representativos de la institución, asegurando así la aplicación efectiva de las competencias adquiridas?', 5, 30, false),
	('¿Se han desarrollado programas de capacitación y orientación para los responsables de coordinar las actividades extraescolares, con el fin de asegurar su adecuada implementación y alineación con los objetivos de formación del TecNM?', 5, 30, false),
	('¿Se ha diseñado un sistema de evaluación para medir el impacto de las actividades extraescolares en el desarrollo de competencias profesionales de los estudiantes, permitiendo así realizar ajustes y mejoras continuas en los programas?', 5, 30, false),
	('¿Existe una comunicación efectiva entre los diferentes departamentos involucrados en la gestión de actividades extraescolares, garantizando la coordinación y colaboración necesarias para el éxito del programa y el cumplimiento de sus objetivos?', 5, 30, false),
	('¿Cuál es el procedimiento establecido por el Departamento de Actividades Extraescolares para la expedición de la Constancia de Cumplimiento de la Actividad Complementaria a partir del periodo agosto-diciembre 2015?', 5, 30, false),
	('¿Cómo se proporciona la constancia de competencia de actividad complementaria a los estudiantes que hayan cumplido con su actividad extracurricular con valor curricular de 1 crédito según los nuevos lineamientos?', 5, 30, false),
	('¿Qué información se incluirá en el listado de estudiantes que hayan cumplido con su actividad complementaria, y dónde se publicará dicho listado para que los estudiantes puedan consultarlo?', 5, 30, false),
	('¿Quiénes serán los responsables de avalar el listado de estudiantes y qué acciones deberán llevarse a cabo en el Departamento de Servicios Escolares una vez recibido dicho listado?', 5, 30, false),
	('¿Qué procedimiento seguirá el estudiante en caso de que su nombre no aparezca en el listado de cumplimiento de actividad complementaria, o si detecta que fue registrado incorrectamente, según lo establecido por el Departamento de Actividades Extraescolares?', 5, 30, false);





SELECT * FROM subseccion;
SELECT * FROM Preguntas;