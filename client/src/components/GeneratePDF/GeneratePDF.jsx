import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';
import logoImageITT from "../../components/login/ITTLogo.png";
import logoITT1 from "../../components/login/LogoITT1.png";

const GeneratePDF = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [logosBase64, setLogosBase64] = useState({ logo1: '', logo2: '' });
  const [detailedAudit, setDetailedAudit] = useState(null);
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
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
        setError(error.message);
      });
  };

  const generatePDF = () => {
    if (!detailedAudit) return;

    const doc = new jsPDF('l', 'pt', 'a4'); // 'l' para landscape (horizontal)
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const marginLeft = 40;
    const marginTop = 40;
    const marginBottom = 40;
    const tableStartY = marginTop + 130; // Posición de inicio de la tabla, ajustada para incluir la nueva tabla superior
    const cellPadding = 10;
    const columnWidths = [
      (pageWidth - 2 * marginLeft) * 0.1, // 10% de la página
      (pageWidth - 2 * marginLeft) * 0.3, // 30% de la página
      (pageWidth - 2 * marginLeft) * 0.2, // 20% de la página
      (pageWidth - 2 * marginLeft) * 0.2, // 20% de la página
      (pageWidth - 2 * marginLeft) * 0.2, // 20% de la página
    ];
    const tableHeight = pageHeight - marginTop - marginBottom - 130; // Altura de la tabla, ajustada para incluir la nueva tabla superior

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
    doc.setFontSize(12); // Tamaño de fuente normal para el título
    doc.text('Formato para plan de auditorías', headerX + headerWidths[0] + 10, headerY + 30);

    // Información adicional en la tercera columna (dividida en celdas)
    const additionalInfo = [
      { left: 'Responsable: Oficina de Calidad', right: '' },
      { left: 'Código: ITT-CA-PG-003-02', right: 'Página: 0 de 0' },
      { left: 'Revisión: 0', right: '' },
      { left: `Referencia a la Norma ISO-9001:2015 9.2`, right: `Emisión: ${new Date(detailedAudit.fecha_inicio).toLocaleDateString()}` }
    ];

    let infoY = headerY;
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

    // Dibujar encabezados de la tabla
    const headers = ["Horario", "Proceso/Actividad", "Auditor", "Contacto", "Area/Sitio"];
    let currentX = marginLeft;
    doc.setFontSize(12); // Restaurar tamaño de fuente para el contenido de la tabla principal
    headers.forEach((header, index) => {
      doc.setFillColor(200, 200, 200); // Color de fondo gris para los encabezados
      doc.rect(currentX, tableStartY, columnWidths[index], 40, 'F');
      doc.text(header, currentX + cellPadding, tableStartY + 25);
      currentX += columnWidths[index];
    });

    // Dibujar datos de la tabla
    const rowData = [
      `${new Date(detailedAudit.fecha_final).toLocaleDateString()}`,
      `Procedimiento: ${detailedAudit.subseccion_nombre}`,
      detailedAudit.auditor_nombre,
      detailedAudit.auditado_nombre,
      detailedAudit.departamento_nombre
    ];

    let currentY = tableStartY + 40;
    currentX = marginLeft;
    const rowHeight = tableHeight - 40; // Ajuste de altura de la fila para ocupar toda la tabla

    rowData.forEach((data, index) => {
      doc.rect(currentX, currentY, columnWidths[index], rowHeight);
      const lines = doc.splitTextToSize(data, columnWidths[index] - cellPadding * 2); // Ajuste de texto
      doc.text(lines, currentX + cellPadding, currentY + 25);
      currentX += columnWidths[index];
    });

    // Guardar el PDF con el nombre basado en el ID de la auditoría
    doc.save(`auditoriaNo.${id}.pdf`);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <button onClick={generatePDF} disabled={!logosBase64.logo1 || !logosBase64.logo2 || !detailedAudit}>Generar PDF</button>
    </div>
  );
};

export default GeneratePDF;
