import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';
import logoImageITT from "../../components/login/ITTLogo.png"; // Ruta proporcionada

const GeneratePDF = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [logoBase64, setLogoBase64] = useState('');
  const [detailedAudit, setDetailedAudit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Convertir la imagen a Base64
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

    toBase64(logoImageITT).then((base64) => setLogoBase64(base64));

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
        setDetailedAudit(data);
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
    const doc = new jsPDF('l', 'pt', 'a4'); // 'l' para landscape (horizontal)
    const marginLeft = 40;
    const marginTop = 40;
    const marginBottom = 40;
    const lineHeight = 20;
    const tableHeaderHeight = 20; // Renombrar variable para evitar conflicto
    const pageHeight = doc.internal.pageSize.height;
    const contentHeight = pageHeight - marginTop - marginBottom; // Altura disponible de la página sin márgenes
    const rowHeight = contentHeight - tableHeaderHeight - lineHeight * 8; // Altura de la fila para que ocupe toda la página

    // Dibujar la tabla de encabezado
    const headerX = marginLeft;
    const headerY = marginTop;
    const headerWidths = [120, 220, 400]; // Ajustar anchos de las columnas
    const headerCellHeight = 60; // Altura de la primera fila de la tabla de encabezado

    // Primera fila del encabezado
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', headerX + 10, headerY + 10, 50, 50);
    }

    doc.setFontSize(12);
    doc.text('Formato para Plan de Auditoría', headerX + headerWidths[0] + 10, headerY + 30);

    // Dibujar bordes de la primera fila del encabezado
    doc.rect(headerX, headerY, headerWidths[0], headerCellHeight); // Borde primera columna
    doc.rect(headerX + headerWidths[0], headerY, headerWidths[1], headerCellHeight); // Borde segunda columna
    doc.rect(headerX + headerWidths[0] + headerWidths[1], headerY, headerWidths[2], headerCellHeight); // Borde tercera columna

    // Información adicional en la tercera columna (dividida en celdas)
    const additionalInfo = [
      { left: 'Responsable: Oficina de Calidad', right: '' },
      { left: 'Código: ITT-CA-PG-003-02', right: 'Página: 2 de 23' },
      { left: 'Revisión: 0', right: '' },
      { left: 'Referencia a la Norma ISO-9001:2015 9.2', right: 'Emisión: Abril de 2018' }
    ];

    let infoY = headerY;
    const infoCellHeight = 20; // Altura de cada celda de información
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

    // Dibujar la tabla de contenido
    const tableStartY = headerY + headerCellHeight + lineHeight; // Ajustar la posición de inicio de la tabla
    const columnWidths = [90, 240, 150, 100, 100];
    const colHeaders = ["HORARIO", "PROCESO/ ACTIVIDAD-REQUISITO/ CRITERIO", "AUDITOR(ES) PARTICIPANTE(S)", "CONTACTO", "ÁREA / SITIO"];

    let currentX = marginLeft;
    colHeaders.forEach((header, index) => {
      doc.setFillColor(200, 200, 200); // Color de fondo gris
      doc.rect(currentX, tableStartY, columnWidths[index], tableHeaderHeight, 'F');
      doc.text(header, currentX + 5, tableStartY + 15);
      currentX += columnWidths[index];
    });

    const currentY = tableStartY + tableHeaderHeight; // Posición inicial de las filas de datos

    if (detailedAudit && detailedAudit.length > 0) {
      detailedAudit.forEach((audit, index) => {
        let rowY = currentY + index * rowHeight;
        const rowData = [
          `${audit.fecha_inicio} - ${audit.fecha_final}`,
          audit.subseccion_nombre,
          `${audit.auditado_nombre} (ID: ${audit.id_auditado})`,
          `${audit.auditor_nombre} (ID: ${audit.id_auditor})`,
          audit.departamento_nombre,
        ];
        rowData.forEach((data, colIndex) => {
          doc.rect(marginLeft + colIndex * columnWidths[colIndex], rowY, columnWidths[colIndex], rowHeight); // Dibujar celda
          const lines = doc.splitTextToSize(data, columnWidths[colIndex] - 10); // Ajuste de texto
          doc.text(lines, marginLeft + colIndex * columnWidths[colIndex] + 5, rowY + 15);
        });
      });
    }

    // Guardar el PDF
    doc.save('document.pdf');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <button onClick={generatePDF} disabled={!logoBase64 || !detailedAudit}>Generar PDF</button>
    </div>
  );
};

export default GeneratePDF;
