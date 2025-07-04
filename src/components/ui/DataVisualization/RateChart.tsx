import {
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { forwardRef } from 'react';
import { Line } from 'react-chartjs-2';
import type { BaseComponentProps } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface RateData {
  label: string;
  rate: number;
  date: string;
}

export interface RateChartProps extends BaseComponentProps {
  data: RateData[];
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  animate?: boolean;
  color?: string;
}

export const RateChart = forwardRef<HTMLCanvasElement, RateChartProps>(
  (
    {
      data,
      title,
      height = 300,
      showGrid = true,
      showLegend = true,
      animate = true,
      color = '#0891B2',
      className,
      ...props
    },
    ref
  ) => {
    const chartData = {
      labels: data.map((item) => item.label),
      datasets: [
        {
          label: 'Interest Rate',
          data: data.map((item) => item.rate),
          borderColor: color,
          backgroundColor: `${color}20`,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: color,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };

    const options: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: animate ? 1000 : 0,
        easing: 'easeInOutQuart',
      },
      plugins: {
        legend: {
          display: showLegend,
          position: 'top' as const,
          labels: {
            color: '#374151',
            font: {
              size: 12,
              weight: 500,
            },
            usePointStyle: true,
            pointStyle: 'circle',
          },
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
            label: (context) => `${context.parsed.y.toFixed(2)}% p.a.`,
          },
        },
      },
      scales: {
        x: {
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
          beginAtZero: false,
        },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
    };

    return (
      <div className={cn('bg-white rounded-lg p-4', className)} style={{ height }} {...props}>
        <Line ref={ref as any} data={chartData} options={options} />
      </div>
    );
  }
);

RateChart.displayName = 'RateChart';
