import type { Meta, StoryObj } from '@storybook/react';
import { LoanCalculator } from './LoanCalculator';
import { RateChart } from './RateChart';
import { RateComparison } from './RateComparison';

const meta: Meta = {
  title: 'Components/DataVisualization',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Data visualization components including rate charts, comparisons, and loan calculators for AAGT Private Loans.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const RateChartStory: StoryObj<typeof RateChart> = {
  name: 'Rate Chart',
  render: () => {
    const rateData = [
      { label: 'Jan', rate: 5.2, date: '2024-01-01' },
      { label: 'Feb', rate: 5.1, date: '2024-02-01' },
      { label: 'Mar', rate: 5.3, date: '2024-03-01' },
      { label: 'Apr', rate: 5.0, date: '2024-04-01' },
      { label: 'May', rate: 4.9, date: '2024-05-01' },
      { label: 'Jun', rate: 4.8, date: '2024-06-01' },
      { label: 'Jul', rate: 4.7, date: '2024-07-01' },
      { label: 'Aug', rate: 4.9, date: '2024-08-01' },
      { label: 'Sep', rate: 5.1, date: '2024-09-01' },
      { label: 'Oct', rate: 5.2, date: '2024-10-01' },
      { label: 'Nov', rate: 5.0, date: '2024-11-01' },
      { label: 'Dec', rate: 4.8, date: '2024-12-01' },
    ];

    return (
      <div className="space-y-6">
        <RateChart data={rateData} title="AAGT Interest Rates - 2024" height={400} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RateChart
            data={rateData.slice(-6)}
            title="Last 6 Months"
            height={250}
            showLegend={false}
          />

          <RateChart
            data={rateData.slice(-3)}
            title="Recent Trend"
            height={250}
            showGrid={false}
            color="#10B981"
          />
        </div>
      </div>
    );
  },
};

export const RateComparisonStory: StoryObj<typeof RateComparison> = {
  name: 'Rate Comparison',
  render: () => {
    const comparisonData = [
      { lender: 'AAGT Private', rate: 4.8, isAAGT: true },
      { lender: 'Commonwealth Bank', rate: 6.2 },
      { lender: 'Westpac', rate: 6.4 },
      { lender: 'ANZ', rate: 6.1 },
      { lender: 'NAB', rate: 6.3 },
      { lender: 'Macquarie', rate: 5.9 },
      { lender: 'ING', rate: 5.7 },
    ];

    const businessLoanData = [
      { lender: 'AAGT Private', rate: 5.2, isAAGT: true },
      { lender: 'Traditional Bank A', rate: 7.5 },
      { lender: 'Traditional Bank B', rate: 8.1 },
      { lender: 'Traditional Bank C', rate: 7.8 },
      { lender: 'Non-Bank Lender A', rate: 6.9 },
      { lender: 'Non-Bank Lender B', rate: 7.2 },
    ];

    return (
      <div className="space-y-6">
        <RateComparison
          data={comparisonData}
          title="Current Market Rates Comparison"
          height={400}
        />

        <RateComparison data={businessLoanData} title="Business Loan Rates" height={350} />
      </div>
    );
  },
};

export const LoanCalculatorStory: StoryObj<typeof LoanCalculator> = {
  name: 'Loan Calculator',
  render: () => {
    return (
      <div className="space-y-8">
        <div className="max-w-4xl mx-auto">
          <LoanCalculator
            defaultAmount={750000}
            defaultRate={5.2}
            defaultTerm={7}
            onCalculate={(calc) => console.log('Calculation:', calc)}
          />
        </div>

        <div
          className="p-8 rounded-lg"
          style={{
            backgroundImage: 'linear-gradient(135deg, #0891B2 0%, #0A2540 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <LoanCalculator
              variant="glassmorphism"
              defaultAmount={500000}
              defaultRate={4.8}
              defaultTerm={5}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const CompleteExample: StoryObj = {
  name: 'Complete Dashboard',
  render: () => {
    const rateData = [
      { label: 'Q1 2024', rate: 5.2, date: '2024-03-31' },
      { label: 'Q2 2024', rate: 5.0, date: '2024-06-30' },
      { label: 'Q3 2024', rate: 4.8, date: '2024-09-30' },
      { label: 'Q4 2024', rate: 4.6, date: '2024-12-31' },
    ];

    const comparisonData = [
      { lender: 'AAGT', rate: 4.6, isAAGT: true },
      { lender: 'Bank A', rate: 6.2 },
      { lender: 'Bank B', rate: 6.4 },
      { lender: 'Bank C', rate: 6.1 },
      { lender: 'Lender D', rate: 5.9 },
    ];

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0A2540] mb-2">AAGT Private Loans Dashboard</h2>
          <p className="text-gray-600">Current rates, market comparison, and loan calculator</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RateChart data={rateData} title="AAGT Rates Trend" height={300} />

          <RateComparison data={comparisonData} title="Market Comparison" height={300} />
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <LoanCalculator defaultAmount={500000} defaultRate={4.6} defaultTerm={5} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-[#0891B2] mb-2">4.6%</div>
            <div className="text-sm text-gray-600">Current Rate</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-[#10B981] mb-2">24h</div>
            <div className="text-sm text-gray-600">Approval Time</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-[#F59E0B] mb-2">$5M</div>
            <div className="text-sm text-gray-600">Maximum Loan</div>
          </div>
        </div>
      </div>
    );
  },
};
