import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';
import logoImageITT from "../../components/login/ITTLogo.png";
import logoITT1 from "../../components/login/LogoITT1.png";

const GeneratePDF = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [logosBase64, setLogosBase64] = useState({ logo1: '', logo2: '' });
  const [detailedAudit, setDetailedAudit] = useState(null);
  const [auditInfo, setAuditInfo] = useState(null); // Nuevo estado para guardar la info del segundo fetch
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Convertir las imágenes a Base64
    const toBase64 = (url) => {
      return fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        });
    };

    Promise.all([toBase64(logoImageITT), toBase64(logoITT1)]).then((base64s) => {
      setLogosBase64({ logo1: base64s[0], logo2: base64s[1] });
    });

    // Obtener detalles de la auditoría
    fetchAuditDetails(id);
  }, [id]);

  const fetchAuditDetails = (id) => {
    fetch(`http://localhost:3001/auditoriainfo/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener la auditoría detallada');
        }
        return response.json();
      })
      .then((data) => {
        setDetailedAudit(data[0]); // Asignar el primer elemento del array
        setLoading(false);
        setError(null);
        // Llamar a la función para obtener información adicional
        fetchAuditInfo(data[0].id); // Usar el ID del primer fetch para el segundo fetch
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
        setError(error.message);
      });
  };

  const fetchAuditInfo = (auditId) => {
    fetch(`http://localhost:3001/preguntasByAuditoria/${auditId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener la información de las preguntas');
        }
        return response.json();
      })
      .then((data) => {
        setAuditInfo(data); // Guardar la información de las preguntas
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const generatePDF = () => {
    if (!detailedAudit || !auditInfo) return;

    const doc = new jsPDF('l', 'pt', 'a4'); // 'l' para landscape (horizontal)
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const marginLeft = 40;
    const marginTop = 40;
    const marginBottom = 40;
    const tableStartY = marginTop + 130; // Posición de inicio de la tabla
    const cellPadding = 10;

    // Ajuste para las celdas
    const columnWidths = [
      (pageWidth - 2 * marginLeft) * 0.1, // 10% de la página
      (pageWidth - 2 * marginLeft) * 0.3, // 30% de la página
      (pageWidth - 2 * marginLeft) * 0.2, // 20% de la página
      (pageWidth - 2 * marginLeft) * 0.2, // 20% de la página
      (pageWidth - 2 * marginLeft) * 0.2, // 20% de la página
    ];
    
    // Dibujar la tabla superior con logos y textos hardcodeados
    const headerX = marginLeft;
    const headerY = marginTop;
    const headerWidths = [120, 220, 400]; // Ajustar anchos de las columnas
    const headerCellHeight = 60; // Altura de la primera fila de la tabla de encabezado

    // Añadir logos
    if (logosBase64.logo1) {
      doc.addImage(logosBase64.logo1, 'PNG', headerX + 10, headerY + 10, 50, 50);
    }
    if (logosBase64.logo2) {
      doc.addImage(logosBase64.logo2, 'PNG', headerX + 70, headerY + 10, 50, 50);
    }

    // Dibujar bordes de la primera fila del encabezado
    doc.rect(headerX, headerY, headerWidths[0], headerCellHeight); // Borde primera columna
    doc.rect(headerX + headerWidths[0], headerY, headerWidths[1], headerCellHeight); // Borde segunda columna
    doc.rect(headerX + headerWidths[0] + headerWidths[1], headerY, headerWidths[2], headerCellHeight); // Borde tercera columna

    // Añadir texto en la segunda celda del encabezado
    doc.setFontSize(12);
    doc.text('Formato para plan de auditorías', headerX + headerWidths[0] + 10, headerY + 30);

    // Información adicional en la tercera columna (dividida en celdas)
    const additionalInfo = [
      { left: 'Responsable: Oficina de Calidad', right: '' },
      { left: 'Código: ITT-CA-PG-003-02', right: 'Página: 0 de 0' },
      { left: 'Revisión: 0', right: '' },
      { left: `Referencia a la Norma ISO-9001:2015 9.2`, right: `Emisión: ${new Date(detailedAudit.fecha_inicio).toLocaleDateString()}` }
    ];

    let infoY = headerY + headerCellHeight; // Inicio del Y de las celdas de información
    const infoCellHeight = 20; // Altura de cada celda de información
    doc.setFontSize(10); // Establecer tamaño de fuente a la mitad
    additionalInfo.forEach((info, index) => {
      let cellY = infoY + (index * infoCellHeight);
      if (info.left) {
        doc.rect(headerX + headerWidths[0] + headerWidths[1], cellY, headerWidths[2] / 2, infoCellHeight); // Dibujar celdas de la información izquierda
        doc.text(info.left, headerX + headerWidths[0] + headerWidths[1] + 5, cellY + 15);
      }
      if (info.right) {
        doc.rect(headerX + headerWidths[0] + headerWidths[1] + headerWidths[2] / 2, cellY, headerWidths[2] / 2, infoCellHeight); // Dibujar celdas de la información derecha
        doc.text(info.right, headerX + headerWidths[0] + headerWidths[1] + headerWidths[2] / 2 + 5, cellY + 15);
      }
    });

  // Agregar información adicional solicitada al PDF
  const infoYStart = infoY + additionalInfo.length * infoCellHeight + 20; // Ajustar Y para la nueva sección
  doc.setFontSize(12); // Tamaño de fuente para la nueva sección
  doc.text('Información Adicional', marginLeft, infoYStart); // Título de la nueva sección

  const newInfo = [
    { label: 'No-Auditoria:', value: id }, // ID del primer fetch
    { label: 'Proceso:', value: detailedAudit.seccion_nombre },
    { label: 'Fecha:', value: detailedAudit.fecha_final }, // Asegúrate de que esta propiedad exista
    { label: 'Auditor:', value: detailedAudit.auditor_nombre }, // Asegúrate de que esta propiedad exista
    { label: 'Objetivo:', value: 'Reflejar el estado que guarda el Sistema de Gestión de Calidad (SGC) de la institución, presentar los hallazgos y conclusiones de la Auditoría Interna de Calidad practicada y acordar el periodo en el que el auditado presentará la carpeta de evidencias y el plan de acciones correctivas y/o preventivas.' },
    { label: 'Requisitos:', value: '8.1, 8.2.2, 5.5.1, 8.5.5, 7.1.5, 9.1.1, 8.6, 8.7, 10.2' },
    { label: 'Gestion del curso:', value: 'Horario, Planeación del curso, instrumentacion didáctica, reporte de proyectos individuales, reporte final, seguimiento gestión del curso y constancia de liberación.' },
    { label: 'Residencia Profesionales:', value: 'Asignación de asesor interno, asignación de revisores, dictamen de residencias, boleta de residencias y constancia de revisores.' },
    { label: 'Inscripcion y reinscripcion:', value: 'Asignación de Cargas Académicas.' },
    { label: 'Servicio No conforme:', value: 'Bitácora de Servicio No conforme (Entrega de planeación a tiempo y seguimiento a la gestión del curso).' },
    // Nueva información adicional
    { label: 'Matriz de riesgos y oportunidades:', value: '6.1' },
    { label: 'Identificación de partes interesadas:', value: '4.2' },
    { label: 'Objetivos e indicadores:', value: '6.2' },
    { label: 'Revisión de salones y laboratorios', value: '' },
    { label: 'Proyectos individuales de Maestros', value: '' },
    { label: 'Reporte final y carta de liberación', value: '' },
  ];

  let yOffset = infoYStart + 20; // Espaciado inicial
  newInfo.forEach((item) => {
    doc.setFontSize(10);
    doc.text(`${item.label} ${item.value}`, marginLeft, yOffset);
    yOffset += 15; // Espacio entre líneas
  });

  
    // Tabla con la información de las preguntas
    const questionsYStart = yOffset + 20; // Espacio inicial para la tabla
    const questionsHeader = ['Pregunta', 'Respuesta', 'Observaciones'];

    // Dibujar cabecera de la tabla
    doc.setFontSize(12);
    questionsHeader.forEach((header, index) => {
      doc.text(header, marginLeft + index * columnWidths[index], questionsYStart);
    });

    // Ajustar las preguntas y respuestas, agregando soporte para texto largo
    if (auditInfo) {
      auditInfo.forEach((question, index) => {
        let questionY = questionsYStart + (index + 1) * 15;
        
        // Ajustar texto largo
        const questionText = question.pregunta.length > 60 ? question.pregunta.slice(0, 60) + '...' : question.pregunta;
        const answerText = question.respuesta.length > 60 ? question.respuesta.slice(0, 60) + '...' : question.respuesta;
        const observationText = question.observaciones.length > 60 ? question.observaciones.slice(0, 60) + '...' : question.observaciones;

        doc.text(questionText, marginLeft, questionY);
        doc.text(answerText, marginLeft + columnWidths[1], questionY);
        doc.text(observationText, marginLeft + columnWidths[1] + columnWidths[2], questionY);
      });
    }

    doc.save('auditoria.pdf');
};

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={generatePDF}>Generar PDF</button>
    </div>
  );
};

export default GeneratePDF;
