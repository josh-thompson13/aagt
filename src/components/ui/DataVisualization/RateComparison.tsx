import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { forwardRef } from 'react';
import { Bar } from 'react-chartjs-2';
import type { BaseComponentProps } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface ComparisonData {
  lender: string;
  rate: number;
  isAAGT?: boolean;
}

export interface RateComparisonProps extends BaseComponentProps {
  data: ComparisonData[];
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  animate?: boolean;
}

export const RateComparison = forwardRef<HTMLCanvasElement, RateComparisonProps>(
  (
    {
      data,
      title = 'Rate Comparison',
      height = 300,
      showGrid = true,
      showLegend = false,
      animate = true,
      className,
      ...props
    },
    ref
  ) => {
    const chartData = {
      labels: data.map((item) => item.lender),
      datasets: [
        {
          label: 'Interest Rate',
          data: data.map((item) => item.rate),
          backgroundColor: data.map((item) => (item.isAAGT ? '#0891B2' : '#E5E7EB')),
          borderColor: data.map((item) => (item.isAAGT ? '#0891B2' : '#D1D5DB')),
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    };

    const options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: animate ? 800 : 0,
        easing: 'easeInOutQuart',
      },
      plugins: {
        legend: {
          display: showLegend,
        },
        title: {
          display: !!title,
          text: title,
          color: '#0A2540',
          font: {
            size: 16,
            weight: 'bold',
          },
          padding: {
            bottom: 20,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#0A2540',
          bodyColor: '#374151',
          borderColor: '#E5E7EB',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: (context) => {
              const isAAGT = data[context.dataIndex]?.isAAGT || false;
              const prefix = isAAGT ? 'AAGT: ' : '';
              return `${prefix}${context.parsed.y.toFixed(2)}% p.a.`;
            },
          },
        },
      },
      scales: {
        x: {
          display: showGrid,
          grid: {
            display: false,
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 11,
            },
            maxRotation: 45,
          },
        },
        y: {
          display: showGrid,
          grid: {
            display: showGrid,
            color: '#F3F4F6',
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 11,
            },
            callback: (value) => `${value}%`,
          },
          beginAtZero: true,
        },
      },
    };

    return (
      <div className={cn('bg-white rounded-lg p-4', className)} style={{ height }} {...props}>
        <Bar ref={ref} data={chartData} options={options} />
      </div>
    );
  }
);

RateComparison.displayName = 'RateComparison';
