import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Converts CSS oklch() color functions into standard sRGB hex/rgb strings
 * using a 2D canvas context, preventing html2canvas from throwing unsupported color errors.
 */
function sanitizeOklchColors(doc: Document): void {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');

  function toRgb(color: string): string {
    if (!color || typeof color !== 'string' || !color.includes('oklch')) return color;
    if (!ctx) return color;
    try {
      ctx.fillStyle = '#000000';
      ctx.fillStyle = color;
      return ctx.fillStyle;
    } catch {
      return color;
    }
  }

  const elements = doc.querySelectorAll('*');
  const colorProps = ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'fill', 'stroke'];
  elements.forEach(el => {
    const htmlEl = el as HTMLElement;
    try {
      const style = window.getComputedStyle(htmlEl);
      colorProps.forEach(prop => {
        const val = (style as any)[prop];
        if (val && typeof val === 'string' && val.includes('oklch')) {
          htmlEl.style.setProperty(prop, toRgb(val), 'important');
        }
      });
    } catch {
      // Ignore pseudo-elements or inaccessible styles
    }
  });
}

export async function exportReportToPdf(
  elementId: string,
  filename: string = 'Methyl-CpG-Analysis-Report.pdf'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    window.print();
    return;
  }

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    await pdf.html(element, {
      x: 10,
      y: 10,
      width: 190,
      windowWidth: 1200,
      autoPaging: 'text',
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc: Document) => {
          sanitizeOklchColors(clonedDoc);
        }
      }
    });

    pdf.save(filename);
  } catch (err) {
    console.warn('High-fidelity PDF generation encountered an issue, falling back to canvas slicing:', err);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc: Document) => {
          sanitizeOklchColors(clonedDoc);
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 190;
      const pageHeight = 277; // A4 297mm minus 20mm margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
    } catch (fallbackErr) {
      console.warn('Canvas export fallback failed, triggering browser print dialog:', fallbackErr);
      window.print();
    }
  }
}
