import type { Meta, StoryObj } from '@storybook/react';
import { Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Button } from '../Button';
import { Card, CardBody, CardFooter, CardHeader } from './Card';
import { MetricCard } from './MetricCard';
import { PricingCard } from './PricingCard';
import { TestimonialCard } from './TestimonialCard';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Versatile card components with glass-morphism effects, variants, and specialized layouts for AAGT Private Loans.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled', 'glassmorphism', 'glassmorphismDark'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    interactive: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#0A2540]">Default Card</h3>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600">This is a default card with standard styling and layout.</p>
        </CardBody>
        <CardFooter>
          <Button variant="primary">Learn More</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card variant="default">
        <CardBody>
          <h4 className="font-semibold mb-2">Default</h4>
          <p className="text-sm text-gray-600">Standard card styling</p>
        </CardBody>
      </Card>

      <Card variant="elevated">
        <CardBody>
          <h4 className="font-semibold mb-2">Elevated</h4>
          <p className="text-sm text-gray-600">Enhanced shadow effect</p>
        </CardBody>
      </Card>

      <Card variant="outlined">
        <CardBody>
          <h4 className="font-semibold mb-2">Outlined</h4>
          <p className="text-sm text-gray-600">Border emphasis</p>
        </CardBody>
      </Card>

      <Card variant="filled">
        <CardBody>
          <h4 className="font-semibold mb-2">Filled</h4>
          <p className="text-sm text-gray-600">Subtle background</p>
        </CardBody>
      </Card>

      <Card variant="glassmorphism">
        <CardBody>
          <h4 className="font-semibold mb-2">Glassmorphism</h4>
          <p className="text-sm text-gray-600">Modern glass effect</p>
        </CardBody>
      </Card>

      <Card variant="glassmorphismDark">
        <CardBody>
          <h4 className="font-semibold mb-2">Glass Dark</h4>
          <p className="text-sm text-gray-300">Dark glass effect</p>
        </CardBody>
      </Card>
    </div>
  ),
};

export const GlassMorphism: Story = {
  render: () => (
    <div
      className="p-8 rounded-lg bg-gradient-to-br from-[#0891B2] to-[#0A2540]"
      style={{
        backgroundImage: 'linear-gradient(135deg, #0891B2 0%, #0A2540 100%)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="glassmorphism">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-800">Light Glass</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-700">
              Beautiful glass morphism effect with light transparency.
            </p>
          </CardBody>
          <CardFooter>
            <Button variant="outline">Explore</Button>
          </CardFooter>
        </Card>

        <Card variant="glassmorphismDark">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Dark Glass</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-300">
              Elegant dark glass effect perfect for modern interfaces.
            </p>
          </CardBody>
          <CardFooter>
            <Button variant="secondary">Discover</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card interactive onClick={() => alert('Card clicked!')}>
        <CardBody>
          <h4 className="font-semibold mb-2">Interactive Card</h4>
          <p className="text-sm text-gray-600">
            Hover and click me! I have interactive animations.
          </p>
        </CardBody>
      </Card>

      <Card interactive variant="elevated">
        <CardBody>
          <h4 className="font-semibold mb-2">Elevated Interactive</h4>
          <p className="text-sm text-gray-600">Combined elevated style with interactions.</p>
        </CardBody>
      </Card>

      <Card loading>
        <CardBody>
          <h4 className="font-semibold mb-2">Loading State</h4>
          <p className="text-sm text-gray-600">Loading content...</p>
        </CardBody>
      </Card>
    </div>
  ),
};

export const PricingCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PricingCard
        title="Starter"
        description="Perfect for small businesses"
        price="5.9%"
        period="p.a. from"
        features={[
          { text: 'Loans from $150,000', included: true },
          { text: 'Same day approval', included: true },
          { text: '4 day settlement', included: true },
          { text: 'Flexible terms', included: true },
          { text: 'Dedicated support', included: false },
        ]}
        buttonText="Apply Now"
      />

      <PricingCard
        title="Business"
        description="Ideal for growing companies"
        price="5.2%"
        period="p.a. from"
        featured
        features={[
          { text: 'Loans from $500,000', included: true },
          { text: 'Same day approval', included: true },
          { text: '4 day settlement', included: true },
          { text: 'Flexible terms', included: true },
          { text: 'Dedicated support', included: true },
        ]}
        buttonText="Get Started"
      />

      <PricingCard
        title="Enterprise"
        description="For large scale operations"
        price="4.8%"
        period="p.a. from"
        features={[
          { text: 'Loans from $2,000,000', included: true },
          { text: 'Same day approval', included: true },
          { text: '2 day settlement', included: true },
          { text: 'Flexible terms', included: true },
          { text: 'Priority support', included: true },
        ]}
        buttonText="Contact Us"
      />
    </div>
  ),
};

export const TestimonialCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TestimonialCard
        quote="AAGT Private Loans helped us secure funding quickly when traditional banks couldn't. Their process was seamless and professional."
        author="Sarah Johnson"
        role="CEO"
        company="TechStart Solutions"
        rating={5}
      />

      <TestimonialCard
        quote="The team at AAGT understood our business needs and provided flexible terms that worked for our cash flow."
        author="Michael Chen"
        role="Founder"
        company="Chen Property Group"
        rating={5}
        variant="glassmorphism"
      />
    </div>
  ),
};

export const MetricCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard
        value="$2.5B"
        label="Loans Funded"
        description="Total funding provided"
        icon={<DollarSign className="w-6 h-6" />}
        trend={{ value: 15, isPositive: true }}
      />

      <MetricCard
        value="4.8%"
        label="Average Rate"
        description="Competitive pricing"
        icon={<TrendingUp className="w-6 h-6" />}
        trend={{ value: 2, isPositive: false }}
      />

      <MetricCard
        value="1,250"
        label="Happy Clients"
        description="Businesses funded"
        icon={<Users className="w-6 h-6" />}
        trend={{ value: 8, isPositive: true }}
      />

      <MetricCard
        value="24h"
        label="Approval Time"
        description="Same day decisions"
        icon={<Clock className="w-6 h-6" />}
      />
    </div>
  ),
};
