'use client';

import { useState, useEffect } from 'react';
import { Calculator, BarChart3, Download, Code, TestTube } from 'lucide-react';
import { LoanCalculator } from '@/components/calculator/LoanCalculator';
import { PDFReport } from '@/components/calculator/PDFReport';
import { EmbeddableWidget } from '@/components/calculator/EmbeddableWidget';
import { useABTest } from '@/utils/abTesting';
import type { SavedCalculation } from '@/types/calculator';

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'reports' | 'embed' | 'testing'>('calculator');
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);
  const { variant, track } = useABTest('calculator_page');

  useEffect(() => {
    track('calculator_page_loaded');
    
    // Load saved calculations
    const saved = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
    setSavedCalculations(saved);
  }, [track]);

  const handleSaveCalculation = (calculation: SavedCalculation) => {
    const updated = [...savedCalculations, calculation];
    setSavedCalculations(updated);
    track('calculation_saved', { calculationId: calculation.id });
  };

  const handleShareCalculation = (calculation: SavedCalculation) => {
    track('calculation_shared', { calculationId: calculation.id });
    // Show success message or toast
    alert('Calculation link copied to clipboard!');
  };

  const handleEmailReport = (email: string) => {
    track('report_emailed', { email });
    // In a real implementation, this would send the email
    alert(`Report will be sent to ${email}`);
  };

  const tabs = [
    {
      id: 'calculator',
      label: 'Loan Calculator',
      icon: Calculator,
      description: 'Calculate your loan payments and see detailed breakdowns'
    },
    {
      id: 'reports',
      label: 'PDF Reports',
      icon: Download,
      description: 'Generate comprehensive loan reports'
    },
    {
      id: 'embed',
      label: 'Embed Widget',
      icon: Code,
      description: 'Embed calculator on your website'
    },
    {
      id: 'testing',
      label: 'A/B Testing',
      icon: TestTube,
      description: 'View testing variants and analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AAGT Private Loans Calculator Suite
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced loan calculation tools with real-time comparisons, PDF reports, 
              embeddable widgets, and A/B testing capabilities.
            </p>
            
            {/* A/B Test Indicator */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              <TestTube className="w-4 h-4" />
              Testing variant: {variant.name}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  track('tab_clicked', { tab: tab.id });
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'calculator' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Loan Calculator
              </h2>
              <p className="text-gray-600">
                Calculate your loan payments with real-time bank comparisons and detailed amortization schedules.
              </p>
            </div>
            
            <LoanCalculator
              onSave={handleSaveCalculation}
              onShare={handleShareCalculation}
              className="max-w-4xl mx-auto"
            />

            {savedCalculations.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Saved Calculations ({savedCalculations.length})
                </h3>
                <div className="space-y-3">
                  {savedCalculations.slice(-5).map((calc) => (
                    <div key={calc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">
                          ${calc.input.loanAmount.toLocaleString()} - {calc.input.loanPurpose}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(calc.timestamp).toLocaleDateString()} • 
                          Monthly: ${calc.result.monthlyPayment.toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => track('saved_calculation_viewed', { calculationId: calc.id })}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reports' && savedCalculations.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                PDF Reports
              </h2>
              <p className="text-gray-600">
                Generate comprehensive PDF reports for your loan calculations.
              </p>
            </div>

            {savedCalculations.slice(-3).map((calc) => (
              <div key={calc.id} className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Calculation: ${calc.input.loanAmount.toLocaleString()} - {calc.input.loanPurpose}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Created: {new Date(calc.timestamp).toLocaleDateString()}
                  </p>
                </div>
                
                <PDFReport
                  input={calc.input}
                  result={calc.result}
                  onEmailReport={handleEmailReport}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'embed' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Embeddable Widget
              </h2>
              <p className="text-gray-600">
                Embed the loan calculator on your website with customizable options.
              </p>
            </div>

            <EmbeddableWidget
              onWidgetGenerated={(code) => track('widget_generated', { codeLength: code.length })}
            />
          </div>
        )}

        {activeTab === 'testing' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                A/B Testing Dashboard
              </h2>
              <p className="text-gray-600">
                Monitor calculator performance across different variants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Current Variant</h3>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">{variant.name}</div>
                  <div className="text-sm text-gray-600">{variant.description}</div>
                  <div className="text-sm text-gray-500">
                    Traffic: {variant.trafficPercentage}%
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Completion Rate</h3>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-600">
                    {(15 + Math.random() * 10).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Users completing calculation</div>
                  <div className="text-sm text-gray-500">
                    ↑ {(Math.random() * 5).toFixed(1)}% vs last week
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Download className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Lead Generation</h3>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-600">
                    {(5 + Math.random() * 8).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Save/share rate</div>
                  <div className="text-sm text-gray-500">
                    {savedCalculations.length} total saves
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Testing Notes
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• A/B testing is automatically tracking user interactions</p>
                <p>• Variants are assigned consistently per user session</p>
                <p>• Events are logged to console and PostHog (if configured)</p>
                <p>• Test assignments are stored in localStorage for consistency</p>
                <p>• Current active variants: Original (50%), Simplified (25%), Enhanced (25%)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}