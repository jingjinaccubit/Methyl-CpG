import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportReportToPdf(elementId: string, filename: string = 'Methyl-CpG-Analysis-Report.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    window.print();
    return;
  }

  try {
    // Render the report element to canvas
    const canvas = await html2canvas(element, {
      scale: 2, // 2x resolution for high sharpness
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (err) {
    console.warn('html2canvas export failed, triggering print dialog:', err);
    window.print();
  }
}
