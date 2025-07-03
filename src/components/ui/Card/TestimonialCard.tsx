import { Star } from 'lucide-react';
import { forwardRef } from 'react';
import type { BaseComponentProps } from '../../../lib/types/component.types';
import { cn } from '../../../lib/utils/cn';
import { Card, CardBody } from './Card';
import styles from './Card.module.css';

export interface TestimonialCardProps extends BaseComponentProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
  variant?: 'default' | 'glassmorphism';
}

export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  (
    { quote, author, role, company, avatar, rating, variant = 'default', className, ...props },
    ref
  ) => {
    return (
      <Card ref={ref} variant={variant} className={cn(styles.testimonial, className)} {...props}>
        <CardBody>
          <div className="space-y-4">
            {rating && (
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      'w-4 h-4',
                      index < rating ? 'text-[#F59E0B] fill-current' : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
            )}

            <blockquote className="text-gray-700 italic relative">{quote}</blockquote>

            <div className="flex items-center gap-3 pt-2">
              {avatar && (
                <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover" />
              )}
              <div>
                <div className="font-semibold text-[#0A2540]">{author}</div>
                {(role || company) && (
                  <div className="text-sm text-gray-600">
                    {role}
                    {role && company && ', '}
                    {company}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
);

TestimonialCard.displayName = 'TestimonialCard';
