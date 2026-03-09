import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface StudentData {
  name: string;
  nie: string;
  classCode: string;
}

export const generatePDF = (student: StudentData, score: number, level: string, exercisesCompleted: number) => {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleString();

  // Header
  doc.setFillColor(79, 70, 229); // Indigo-600
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Detective de lo Esencial', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Reporte de Laboratorio de Abstracción', 105, 30, { align: 'center' });

  // Student Info Section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Información del Estudiante', 20, 55);
  
  doc.setDrawColor(224, 231, 255);
  doc.line(20, 58, 190, 58);

  const studentInfo = [
    ['Nombre Completo:', student.name],
    ['NIE:', student.nie],
    ['Código de Clase:', student.classCode],
    ['Fecha de Emisión:', timestamp]
  ];

  autoTable(doc, {
    startY: 65,
    body: studentInfo,
    theme: 'plain',
    styles: { fontSize: 11, cellPadding: 3 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } }
  });

  // Results Section
  const finalY = (doc as any).lastAutoTable.finalY;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Resultados del Desafío', 20, finalY + 15);
  
  doc.line(20, finalY + 18, 190, finalY + 18);

  const maxScore = level === 'basic' ? 70 : level === 'medium' ? 90 : 100;
  const resultsInfo = [
    ['Nivel Seleccionado:', level.toUpperCase()],
    ['Ejercicios Completados:', `${exercisesCompleted} de 5`],
    ['Puntaje Obtenido:', `${score} pts`],
    ['Puntaje Máximo Posible:', `${maxScore} pts`],
    ['Porcentaje de Logro:', `${Math.round((score / maxScore) * 100)}%`]
  ];

  autoTable(doc, {
    startY: finalY + 25,
    body: resultsInfo,
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] },
    styles: { fontSize: 11, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } }
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'Este documento es una evidencia oficial de la práctica de Pensamiento Computacional.',
      105,
      285,
      { align: 'center' }
    );
    doc.text(`Página ${i} de ${pageCount}`, 190, 285, { align: 'right' });
  }

  // Save the PDF
  doc.save(`Reporte_Abstraccion_${student.name.replace(/\s+/g, '_')}.pdf`);
};
