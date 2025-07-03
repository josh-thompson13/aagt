'use client';

import { useState } from 'react';
import { Download, FileText, Mail } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LoanCalculatorEngine } from '@/utils/calculatorEngine';
import type { LoanCalculatorInput, LoanCalculatorResult } from '@/types/calculator';

interface Props {
  input: LoanCalculatorInput;
  result: LoanCalculatorResult;
  onEmailReport?: (email: string) => void;
}

export function PDFReport({ input, result, onEmailReport }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');

  const formatCurrency = LoanCalculatorEngine.formatCurrency;
  const formatPercentage = LoanCalculatorEngine.formatPercentage;
  const bankComparison = LoanCalculatorEngine.calculateSavingsVsBanks(result, input);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Header
      pdf.setFillColor(10, 37, 64); // primary-900
      pdf.rect(0, 0, pageWidth, 40, 'F');
      
      // Logo and title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AAGT Private Loans', 20, 20);
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Loan Calculation Report', 20, 30);
      
      // Date
      pdf.setFontSize(10);
      pdf.text(`Generated: ${new Date().toLocaleDateString('en-AU')}`, pageWidth - 60, 20);
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);
      
      let yPosition = 60;
      
      // Loan Summary Section
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Loan Summary', 20, yPosition);
      yPosition += 15;
      
      // Summary box
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.rect(20, yPosition - 5, pageWidth - 40, 30);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      const summaryData = [
        ['Loan Amount:', formatCurrency(input.loanAmount)],
        ['Loan Term:', `${Math.floor(input.loanTermMonths / 12)} years`],
        ['Interest Rate:', formatPercentage(input.interestRate) + ' p.a.'],
        ['Monthly Payment:', formatCurrency(result.monthlyPayment)]
      ];
      
      summaryData.forEach(([label, value], index) => {
        const x = index < 2 ? 25 : pageWidth / 2 + 5;
        const y = yPosition + (index % 2) * 10;
        
        pdf.setFont('helvetica', 'normal');
        pdf.text(label, x, y);
        pdf.setFont('helvetica', 'bold');
        pdf.text(value, x + 40, y);
      });
      
      yPosition += 40;
      
      // Key Metrics Section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Key Metrics', 20, yPosition);
      yPosition += 15;
      
      const metrics = [
        ['Total Repayments:', formatCurrency(result.totalAmount)],
        ['Total Interest:', formatCurrency(result.totalInterest)],
        ['Effective Rate:', formatPercentage(result.effectiveRate) + ' p.a.'],
        ['Approval Time:', `${bankComparison.timeToApprovalDays} day`],
        ['Settlement Time:', `${bankComparison.settlementDays} days`]
      ];
      
      pdf.setFontSize(12);
      metrics.forEach(([label, value], index) => {
        pdf.setFont('helvetica', 'normal');
        pdf.text(label, 25, yPosition);
        pdf.setFont('helvetica', 'bold');
        pdf.text(value, 80, yPosition);
        yPosition += 8;
      });
      
      yPosition += 10;
      
      // Loan Details Section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Loan Details', 20, yPosition);
      yPosition += 15;
      
      const details = [
        ['Loan Purpose:', input.loanPurpose.replace('-', ' ').toUpperCase()],
        ['Security Type:', input.securityType.replace('-', ' ').toUpperCase()],
        ['LTV Ratio:', input.ltv ? `${input.ltv}%` : 'N/A']
      ];
      
      pdf.setFontSize(12);
      details.forEach(([label, value], index) => {
        pdf.setFont('helvetica', 'normal');
        pdf.text(label, 25, yPosition);
        pdf.setFont('helvetica', 'bold');
        pdf.text(value, 80, yPosition);
        yPosition += 8;
      });
      
      yPosition += 20;
      
      // Amortization Schedule (first 12 months)
      if (yPosition + 80 > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Payment Schedule (First 12 Months)', 20, yPosition);
      yPosition += 15;
      
      // Table headers
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      const headers = ['Month', 'Payment', 'Principal', 'Interest', 'Balance'];
      const colWidths = [20, 30, 30, 30, 35];
      let xPos = 20;
      
      headers.forEach((header, index) => {
        pdf.text(header, xPos, yPosition);
        xPos += colWidths[index];
      });
      
      yPosition += 8;
      
      // Table data
      pdf.setFont('helvetica', 'normal');
      result.amortizationSchedule.slice(0, 12).forEach((entry, index) => {
        xPos = 20;
        const rowData = [
          entry.month.toString(),
          formatCurrency(entry.payment).replace('$', ''),
          formatCurrency(entry.principal).replace('$', ''),
          formatCurrency(entry.interest).replace('$', ''),
          formatCurrency(entry.balance).replace('$', '')
        ];
        
        rowData.forEach((data, colIndex) => {
          pdf.text(data, xPos, yPosition);
          xPos += colWidths[colIndex];
        });
        yPosition += 6;
      });
      
      // Footer
      const footerY = pageHeight - 20;
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('This report is generated for informational purposes only. Terms and conditions apply.', 20, footerY);
      pdf.text('AAGT Private Loans - aagtprivateloans.com.au', 20, footerY + 5);
      
      // Save the PDF
      const fileName = `AAGT-Loan-Report-${Date.now()}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEmailReport = () => {
    if (email && onEmailReport) {
      onEmailReport(email);
      setShowEmailForm(false);
      setEmail('');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-primary-600" />
        <h4 className="text-lg font-semibold text-gray-900">Download Report</h4>
      </div>
      
      <p className="text-gray-600 mb-6">
        Generate a comprehensive PDF report with your loan calculations, payment schedule, and comparison data.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download PDF
            </>
          )}
        </button>
        
        <button
          onClick={() => setShowEmailForm(!showEmailForm)}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Email Report
        </button>
      </div>
      
      {showEmailForm && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={handleEmailReport}
              disabled={!email}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Report includes:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Complete loan summary and calculations</li>
          <li>Monthly payment breakdown for first year</li>
          <li>Comparison with major bank rates</li>
          <li>AAGT competitive advantages</li>
        </ul>
      </div>
    </div>
  );
}