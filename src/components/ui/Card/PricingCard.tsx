import { Check, Star } from 'lucide-react';
import { forwardRef } from 'react';
import type { BaseComponentProps } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import { Button } from '../Button';
import { Card, CardBody, CardFooter, CardHeader } from './Card';
import styles from './Card.module.css';

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingCardProps extends BaseComponentProps {
  title: string;
  description?: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  featured?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  variant?: 'default' | 'glassmorphism';
}

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      title,
      description,
      price,
      period = 'per annum',
      features,
      featured = false,
      buttonText = 'Get Started',
      onButtonClick,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const cardClasses = cn(
      styles.pricing,
      {
        [styles.featured]: featured,
      },
      className
    );

    return (
      <Card ref={ref} variant={variant} className={cardClasses} {...props}>
        <CardHeader>
          <div className="text-center">
            {featured && (
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="w-4 h-4 text-[#F59E0B] fill-current" />
                <span className="text-sm font-medium text-[#0891B2]">Most Popular</span>
              </div>
            )}
            <h3 className="text-xl font-bold text-[#0A2540]">{title}</h3>
            {description && <p className="text-gray-600 mt-2">{description}</p>}
          </div>
        </CardHeader>

        <CardBody>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-[#0A2540]">{price}</div>
            <div className="text-gray-600 text-sm mt-1">{period}</div>
          </div>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check
                  className={cn(
                    'w-5 h-5 flex-shrink-0 mt-0.5',
                    feature.included ? 'text-green-500' : 'text-gray-300'
                  )}
                />
                <span
                  className={cn(
                    'text-sm',
                    feature.included ? 'text-gray-700' : 'text-gray-400 line-through'
                  )}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </CardBody>

        <CardFooter>
          <Button variant={featured ? 'primary' : 'outline'} fullWidth onClick={onButtonClick}>
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

PricingCard.displayName = 'PricingCard';
