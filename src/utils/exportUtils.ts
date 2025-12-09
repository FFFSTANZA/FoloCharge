import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { FaultAnalysis, CostAnalysis, CostParameters } from '@/types/fault';
import { formatCurrency } from './costCalculator';

export function exportToPDF(
  faults: FaultAnalysis[],
  costAnalysis: CostAnalysis,
  costParams: CostParameters
): void {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('FoloCharge Fault Diagnosis Report', 14, 20);

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

  doc.setFontSize(14);
  doc.text('Summary', 14, 40);

  doc.setFontSize(10);
  doc.text(`Total Faults Detected: ${faults.length}`, 14, 48);
  doc.text(`High Severity: ${faults.filter(f => f.severity === 'High').length}`, 14, 54);
  doc.text(`Medium Severity: ${faults.filter(f => f.severity === 'Medium').length}`, 14, 60);
  doc.text(`Low Severity: ${faults.filter(f => f.severity === 'Low').length}`, 14, 66);

  doc.setFontSize(14);
  doc.text('Revenue Impact', 14, 78);

  doc.setFontSize(10);
  doc.text(`Revenue Lost Today: ${formatCurrency(costAnalysis.revenueToday)}`, 14, 86);
  doc.text(`Revenue Lost This Month: ${formatCurrency(costAnalysis.revenueThisMonth)}`, 14, 92);
  doc.text(`Avg Session Value: ${formatCurrency(costParams.avgSessionValue)}`, 14, 98);
  doc.text(`Avg Sessions/Day: ${costParams.avgSessionsPerDay}`, 14, 104);

  autoTable(doc, {
    startY: 115,
    head: [['Fault Type', 'Timestamp', 'Connector', 'Severity', 'Downtime (hrs)', 'Revenue Loss']],
    body: faults.map(fault => [
      fault.faultType,
      new Date(fault.timestamp).toLocaleString(),
      fault.connectorId,
      fault.severity,
      fault.downtime.toString(),
      formatCurrency((costParams.avgSessionValue * costParams.avgSessionsPerDay / 24) * fault.downtime)
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [37, 99, 235] }
  });

  let finalY = (doc as any).lastAutoTable.finalY || 115;

  if (finalY > 250) {
    doc.addPage();
    finalY = 20;
  } else {
    finalY += 10;
  }

  doc.setFontSize(14);
  doc.text('Top 5 Costliest Faults', 14, finalY);

  autoTable(doc, {
    startY: finalY + 5,
    head: [['Fault Type', 'Occurrences', 'Total Cost']],
    body: costAnalysis.topCostliestFaults.map(fault => [
      fault.faultType,
      fault.occurrences.toString(),
      formatCurrency(fault.totalCost)
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [37, 99, 235] }
  });

  doc.save(`folocharge-fault-report-${Date.now()}.pdf`);
}

export function exportToCSV(faults: FaultAnalysis[], costParams: CostParameters): void {
  const headers = [
    'Fault ID',
    'Fault Type',
    'Timestamp',
    'Connector ID',
    'Severity',
    'Description',
    'Root Cause',
    'Impact',
    'Resolution',
    'Downtime (hours)',
    'Revenue Loss (INR)',
    'Error Code',
    'Temperature',
    'Voltage',
    'Current'
  ];

  const rows = faults.map(fault => {
    const revenueLoss = (costParams.avgSessionValue * costParams.avgSessionsPerDay / 24) * fault.downtime;
    return [
      fault.id,
      fault.faultType,
      fault.timestamp,
      fault.connectorId,
      fault.severity,
      fault.description,
      fault.rootCause,
      fault.impact,
      fault.resolution,
      fault.downtime.toString(),
      revenueLoss.toFixed(2),
      fault.logEntry.errorCode || '',
      fault.logEntry.temperature?.toString() || '',
      fault.logEntry.voltage?.toString() || '',
      fault.logEntry.current?.toString() || ''
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `folocharge-fault-data-${Date.now()}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
