'use client';

import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';
import type { LoanCalculatorInput, LoanCalculatorResult } from '@/types/calculator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  result: LoanCalculatorResult;
  input: LoanCalculatorInput;
}

export function ChartVisualization({ result, input }: Props) {
  const [activeChart, setActiveChart] = useState<'amortization' | 'breakdown' | 'balance'>('amortization');

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => new Intl.NumberFormat('en-AU', {
              style: 'currency',
              currency: 'AUD',
              minimumFractionDigits: 0
            }).format(value)
        }
      }
    }
  };

  const amortizationData = {
    labels: result.amortizationSchedule
      .filter((_, index) => index % Math.ceil(result.amortizationSchedule.length / 24) === 0)
      .map(entry => `Year ${Math.ceil(entry.month / 12)}`),
    datasets: [
      {
        label: 'Principal Payment',
        data: result.amortizationSchedule
          .filter((_, index) => index % Math.ceil(result.amortizationSchedule.length / 24) === 0)
          .map(entry => entry.principal),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Interest Payment',
        data: result.amortizationSchedule
          .filter((_, index) => index % Math.ceil(result.amortizationSchedule.length / 24) === 0)
          .map(entry => entry.interest),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  const balanceData = {
    labels: result.amortizationSchedule
      .filter((_, index) => index % Math.ceil(result.amortizationSchedule.length / 24) === 0)
      .map(entry => `Year ${Math.ceil(entry.month / 12)}`),
    datasets: [
      {
        label: 'Remaining Balance',
        data: result.amortizationSchedule
          .filter((_, index) => index % Math.ceil(result.amortizationSchedule.length / 24) === 0)
          .map(entry => entry.balance),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const breakdownData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [input.loanAmount, result.totalInterest],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = new Intl.NumberFormat('en-AU', {
              style: 'currency',
              currency: 'AUD',
              minimumFractionDigits: 0
            }).format(context.raw);
            const percentage = ((context.raw / result.totalAmount) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  const chartTabs = [
    {
      id: 'amortization',
      label: 'Payment Breakdown',
      icon: BarChart3,
      description: 'Principal vs Interest over time'
    },
    {
      id: 'balance',
      label: 'Loan Balance',
      icon: TrendingUp,
      description: 'Remaining balance over time'
    },
    {
      id: 'breakdown',
      label: 'Total Breakdown',
      icon: PieChart,
      description: 'Principal vs total interest'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Loan Visualization</h4>
        <div className="flex flex-wrap gap-2">
          {chartTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeChart === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h5 className="font-medium text-gray-900">
            {chartTabs.find(tab => tab.id === activeChart)?.label}
          </h5>
          <p className="text-sm text-gray-600">
            {chartTabs.find(tab => tab.id === activeChart)?.description}
          </p>
        </div>

        <div className="h-80">
          {activeChart === 'amortization' && (
            <Bar data={amortizationData} options={chartOptions} />
          )}
          {activeChart === 'balance' && (
            <Line data={balanceData} options={chartOptions} />
          )}
          {activeChart === 'breakdown' && (
            <Doughnut data={breakdownData} options={doughnutOptions} />
          )}
        </div>

        {activeChart === 'amortization' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span className="font-medium text-blue-900">Principal Payments</span>
              </div>
              <p className="text-blue-800">
                Start low and increase over time as more of your payment goes toward the principal balance.
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded" />
                <span className="font-medium text-red-900">Interest Payments</span>
              </div>
              <p className="text-red-800">
                Start high and decrease over time as the outstanding balance reduces.
              </p>
            </div>
          </div>
        )}

        {activeChart === 'breakdown' && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {((input.loanAmount / result.totalAmount) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Principal</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {((result.totalInterest / result.totalAmount) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Interest</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat('en-AU', {
                    style: 'currency',
                    currency: 'AUD',
                    minimumFractionDigits: 0
                  }).format(result.totalAmount)}
                </div>
                <div className="text-sm text-gray-600">Total Cost</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}