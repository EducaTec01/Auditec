import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';
import logoImageITT from "../../components/login/ITTLogo.png";
import logoITT1 from "../../components/login/LogoITT1.png";

const GeneratePDF = () => {
  const { id } = useParams();
  const [logosBase64, setLogosBase64] = useState({ logo1: '', logo2: '' });
  const [detailedAudit, setDetailedAudit] = useState(null);
  const [auditInfo, setAuditInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        setDetailedAudit(data[0]);
        setLoading(false);
        setError(null);
        fetchAuditInfo(data[0].id);
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
        setAuditInfo(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const generatePDF = () => {
    if (!detailedAudit || !auditInfo) return;

    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Márgenes
    const marginLeft = 30;
    const marginRight = 30;
    const marginTop = 30;
    const marginBottom = 30;

    let yOffset = marginTop;

    // Calcular ancho para la tabla
    const tableWidth = pageWidth - marginLeft - marginRight; // Ancho total de la tabla
    const headerTableHeight = 100; // Altura fija para el encabezado de la tabla

    // Dibujar la tabla
    doc.rect(marginLeft, yOffset, tableWidth, headerTableHeight); // Dibujar rectángulo de la tabla

    // Agregar logos
    if (logosBase64.logo1) {
      doc.addImage(logosBase64.logo1, 'PNG', marginLeft + 10, yOffset + 10, 50, 50);
    }
    if (logosBase64.logo2) {
      doc.addImage(logosBase64.logo2, 'PNG', marginLeft + 70, yOffset + 10, 50, 50);
    }

    // Ajustar Y después de los logos
    yOffset += 60;

    // Encabezado
    const titleText = "Formato para informe de auditoría";
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const titleWidth = doc.getTextWidth(titleText);
    doc.text(titleText, (pageWidth - titleWidth) / 2, yOffset); // Centrar el título
    yOffset += 20;

    // Información de la tabla
    const headerTable = [
      { label: 'Oficina de calidad', value: 'Oficina de Calidad' },
      { label: 'Código:', value: 'ITT-CA-PG-003-04' },
      { label: 'Revisión:', value: '0' },
      { label: 'Referencia a la Norma ISO-9001:2015 9.2', value: '' },
      { label: 'Fecha:', value: new Date().toLocaleDateString() }, // Fecha actual
    ];

    // Dibujar la tabla
    yOffset += 10; // Espacio extra antes de la tabla
    doc.rect(marginLeft, yOffset - 10, tableWidth, headerTable.length * 20 + 10); // Ajustar rectángulo de la tabla

    headerTable.forEach((item, index) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      // Columna izquierda
      if (item.label) { // Asegúrate de que el label no sea undefined
        doc.text(item.label, marginLeft, yOffset);
      }

      // Columna derecha
      if (item.value) { // Asegúrate de que el value no sea undefined
        doc.text(item.value, marginLeft + tableWidth / 2, yOffset);
      }

      // Dibujar líneas
      if (index < headerTable.length - 1) {
        doc.line(marginLeft, yOffset + 5, marginLeft + tableWidth, yOffset + 5); // Línea horizontal
      }

      yOffset += 20; // Espacio entre filas
    });

    // Aquí añadimos la nueva tabla
    const auditDetails = [
      { label: 'No-Auditoria:', value: id }, 
      { label: 'Proceso:', value: detailedAudit.seccion_nombre }, 
      { label: 'Fecha:', value: detailedAudit.fecha_final }, 
      { label: 'Auditor:', value: detailedAudit.auditor_nombre },
    ];

    // Ajustar Y después del encabezado
    yOffset += 20; // Espacio extra antes de la nueva tabla

    // Dibujar la nueva tabla
    doc.rect(marginLeft, yOffset - 10, tableWidth, auditDetails.length * 20 + 10); // Ajustar rectángulo de la nueva tabla

    auditDetails.forEach((item, index) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      // Columna izquierda
      if (item.label) { // Asegúrate de que el label no sea undefined
        doc.text(item.label, marginLeft, yOffset);
      }

      // Columna derecha
      if (item.value) { // Asegúrate de que el value no sea undefined
        doc.text(item.value, marginLeft + tableWidth / 2, yOffset);
      }

      // Dibujar líneas
      if (index < auditDetails.length - 1) {
        doc.line(marginLeft, yOffset + 5, marginLeft + tableWidth, yOffset + 5); // Línea horizontal
      }

      yOffset += 20; // Espacio entre filas
    });

    // Continuar con el resto del documento
    yOffset += 10; // Espacio extra después del encabezado

    // Información adicional larga
    const newInfo = [
      { label: 'Objetivo:', value: 'Reflejar el estado que guarda el Sistema de Gestión de Calidad (SGC) de la institución, presentar los hallazgos y conclusiones de la Auditoría Interna de Calidad practicada y acordar el periodo en el que el auditado presentará la carpeta de evidencias y el plan de acciones correctivas y/o preventivas.' },
      { label: 'Requisitos:', value: '8.1, 8.2.2, 5.5.1, 8.5.5, 7.1.5, 9.1.1, 8.6, 8.7, 10.2' },
      { label: 'Gestion del curso:', value: 'Horario, Planeación del curso, instrumentacion didáctica, reporte de proyectos individuales, reporte final, seguimiento gestión del curso y constancia de liberación.' },
      { label: 'Residencia Profesionales:', value: 'Asignación de asesor interno, asignación de revisores, dictamen de residencias, boleta de residencias y constancia de revisores.' },
      { label: 'Inscripcion y reinscripcion:', value: 'Asignación de Cargas Académicas.' },
      { label: 'Servicio No conforme:', value: 'Bitácora de Servicio No conforme (Entrega de planeación a tiempo y seguimiento a la gestión del curso).' },
      { label: 'Matriz de hallazgos:', value: 'Evidencia que se recolecta durante la auditoría, se generará un acta y un informe final, se considerará todo hallazgo para seguimiento, cumplimiento o atención de no conformidades.' }
    ];

    newInfo.forEach(item => {
      doc.setFont('helvetica', 'bold');
      doc.text(item.label, marginLeft, yOffset);
      doc.setFont('helvetica', 'normal');
      const textLines = doc.splitTextToSize(item.value, tableWidth);
      textLines.forEach(line => {
        doc.text(line, marginLeft + 20, yOffset += 10); // Incrementar el Y para las nuevas líneas
      });
      yOffset += 10; // Espacio entre secciones
    });

    // Agregar preguntas
    doc.setFont('helvetica', 'bold');
    doc.text("Preguntas:", marginLeft, yOffset);
    yOffset += 10;

    auditInfo.forEach((question, index) => {
      doc.setFont('helvetica', 'normal');
      doc.text(`${index + 1}. ${question.pregunta}`, marginLeft, yOffset);
      yOffset += 10;
    });

    // Guardar el documento
    doc.save(`Auditoría_${detailedAudit.numero_auditoria}.pdf`);
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
