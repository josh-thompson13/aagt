import { forwardRef } from 'react';
import type { BaseComponentProps } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import { Card, CardBody } from './Card';
import styles from './Card.module.css';

export interface MetricCardProps extends BaseComponentProps {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'glassmorphism';
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ value, label, description, icon, trend, variant = 'default', className, ...props }, ref) => {
    return (
      <Card ref={ref} variant={variant} className={cn(styles.metric, className)} {...props}>
        <CardBody>
          <div className="space-y-2">
            {icon && (
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-[#0891B2]/10 rounded-lg text-[#0891B2]">{icon}</div>
              </div>
            )}

            <div className={styles.value}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>

            <div className={styles.label}>{label}</div>

            {description && <p className="text-xs text-gray-500 text-center">{description}</p>}

            {trend && (
              <div className="flex items-center justify-center gap-1 text-xs">
                <span
                  className={cn(
                    'font-medium',
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {trend.isPositive ? '+' : ''}
                  {trend.value}%
                </span>
                <span className="text-gray-500">vs last period</span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    );
  }
);

MetricCard.displayName = 'MetricCard';
