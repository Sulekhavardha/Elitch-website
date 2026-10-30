import { jsPDF } from 'jspdf';
import { PANEL_REGIONS } from '../data/companyData';

export const generatePanelBookPDF = () => {
  // 1. Instant direct download via pre-rendered static asset (fastest & 100% reliable)
  try {
    const link = document.createElement('a');
    link.href = '/downloads/Elicit-Research-Global-Panel-Book-2026.pdf';
    link.setAttribute('download', 'Elicit-Research-Global-Panel-Book-2026.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  } catch (err) {
    console.warn('Direct file download fallback to jsPDF engine:', err);
  }

  // 2. Client-side dynamic jsPDF synthesis fallback matching official specifications
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Dark luxury background (#0A0E17)
  doc.setFillColor(10, 14, 23);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Cyan geometric accent
  doc.setFillColor(0, 240, 255);
  doc.rect(20, 25, 8, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('ELICIT RESEARCH', 34, 37);

  doc.setFontSize(13);
  doc.setTextColor(0, 240, 255);
  doc.text('& INSIGHTS INC.', 34, 45);

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('GLOBAL PANEL SPECIFICATIONS & SAMPLING CAPABILITIES 2026', 34, 53);

  // Decorative divider
  doc.setDrawColor(40, 50, 70);
  doc.setLineWidth(0.3);
  doc.line(20, 68, pageWidth - 20, 68);

  // Core Statistics Banner (#111C33)
  doc.setFillColor(17, 28, 51);
  doc.roundedRect(20, 78, pageWidth - 40, 48, 4, 4, 'F');

  doc.setTextColor(0, 240, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('5M+', 35, 98);
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('Panel Members', 35, 106);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('Double Opt-In Global', 35, 112);

  doc.setTextColor(16, 185, 129);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('10K+', 90, 98);
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('Surveys Completed', 90, 106);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('Enterprise Studies', 90, 112);

  doc.setTextColor(168, 85, 247);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('30M+', 145, 98);
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('Rewarded So Far', 145, 106);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('Incentives Distributed', 145, 112);

  // Executive Description
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('About Our Superior Global Panel', 20, 144);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);

  const p1 = 'Our globally acknowledged panel houses solution-based research, contributed by business professionals as well as consumers. Without differentiating between any sort of data, our unbiased approach incorporates numerous questions every year which includes demographical data, adverse market characteristics, media outreach, and also personal preferences, which efficiently helps businesses gain a better understanding of diverse customer segments.';
  const p2 = 'Our dynamic sampling platform is directly linked to the audience representing the actual population delivering online and offline B2B and B2C samples. The platform helps businesses to access diverse and comprehensive opinions of global audiences. While it accelerates the overall data research process, the final report inculcates trustworthy, accurate, and extremely precise analytics.';

  const splitP1 = doc.splitTextToSize(p1, pageWidth - 40);
  doc.text(splitP1, 20, 153);

  const p1Height = splitP1.length * 4.5;
  const splitP2 = doc.splitTextToSize(p2, pageWidth - 40);
  doc.text(splitP2, 20, 153 + p1Height + 3);

  // Regional Reach Table Section
  const tableY = 214;
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Regional Sampling Footprint', 20, tableY);

  const regions = [
    { region: 'North America', members: '1.8M+ panelists', coverage: '88% B2B C-Suite reach in US/CA' },
    { region: 'Europe & UK (EMEA)', members: '1.4M+ panelists', coverage: 'GDPR/UK-DPA strictly audited' },
    { region: 'Asia-Pacific (APAC)', members: '1.3M+ panelists', coverage: 'Native language translation & localized incentives' },
    { region: 'Latin America (LATAM)', members: '500K+ panelists', coverage: 'Hyper-localized regional dialing & online access' }
  ];

  let currentY = tableY + 8;
  regions.forEach((r) => {
    doc.setFillColor(13, 21, 39);
    doc.roundedRect(20, currentY, pageWidth - 40, 11, 2, 2, 'F');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 240, 255);
    doc.text(r.region, 24, currentY + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    doc.text(r.members, 78, currentY + 7.5);

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.text(r.coverage, 122, currentY + 7.5);

    currentY += 13.5;
  });

  // Footer Contact on Page 1
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Official Document | Elicit Research & Insights Inc. | RFQ Desk: RFQ@elicitresearch.com | info@elicitresearch.com', 20, 285);

  doc.save('Elicit-Research-Global-Panel-Book-2026.pdf');
};
