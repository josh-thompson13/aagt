import type { Meta, StoryObj } from '@storybook/react';
import { Calculator, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Modal,
  PricingCard,
  RateChart,
  ToastProvider,
  useToast,
} from './index';

const meta: Meta = {
  title: 'Overview/Component Library',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete overview of the AAGT Private Loans component library showcasing all available components and their usage.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

const ComponentShowcase = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  const rateData = [
    { label: 'Jan', rate: 5.2, date: '2024-01-01' },
    { label: 'Feb', rate: 5.0, date: '2024-02-01' },
    { label: 'Mar', rate: 4.9, date: '2024-03-01' },
    { label: 'Apr', rate: 4.8, date: '2024-04-01' },
    { label: 'May', rate: 4.7, date: '2024-05-01' },
    { label: 'Jun', rate: 4.6, date: '2024-06-01' },
  ];

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#0A2540] mb-4">
          AAGT Private Loans Component Library
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A comprehensive React component library built with TypeScript, Tailwind CSS, and designed
          specifically for financial services.
        </p>
      </div>

      {/* Buttons Section */}
      <section>
        <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Buttons</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="mt-4 flex gap-4">
          <Button loading>Loading...</Button>
          <Button
            leftIcon={<DollarSign className="w-4 h-4" />}
            onClick={() =>
              showToast({
                variant: 'success',
                title: 'Success!',
                description: 'Button clicked successfully.',
              })
            }
          >
            Apply for Loan
          </Button>
        </div>
      </section>

      {/* Forms Section */}
      <section>
        <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Form Components</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Input label="Full Name" placeholder="Enter your name" />
            <Input label="Email" type="email" placeholder="email@example.com" />
            <Input label="Phone" type="tel" placeholder="+61 4XX XXX XXX" />
            <Input
              label="Loan Amount"
              type="number"
              placeholder="500000"
              helperText="Minimum loan amount is $150,000"
            />
          </div>
          <div className="space-y-4">
            <Input label="Password" type="password" placeholder="Enter password" />
            <Input label="Confirm Password" type="password" error="Passwords do not match" />
            <Input label="Business Name" success="Available business name" />
            <Input label="ABN" warning="Please verify this ABN" />
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section>
        <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Basic Card</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">Simple card with header, body, and footer sections.</p>
            </CardBody>
            <CardFooter>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card variant="elevated" interactive>
            <CardBody className="text-center p-8">
              <Calculator className="w-12 h-12 text-[#0891B2] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Loan Calculator</h3>
              <p className="text-gray-600">Calculate your monthly payments</p>
            </CardBody>
          </Card>

          <Card variant="glassmorphism">
            <CardBody className="text-center p-8">
              <TrendingUp className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">4.6% p.a.</h3>
              <p className="text-gray-200">Current Interest Rate</p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Pricing Cards */}
      <section>
        <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Pricing Cards</h2>
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
      </section>

      {/* Data Visualization */}
      <section>
        <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Data Visualization</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RateChart data={rateData} title="Interest Rate Trend" height={300} />
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Quick Quote Calculator</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">Simple calculator for loan estimates with 1-24 month terms.</p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Interactive Examples */}
      <section>
        <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Interactive Components</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              showToast({
                variant: 'info',
                title: 'Information',
                description: 'This is a toast notification example.',
                duration: 5000,
              })
            }
          >
            Show Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              showToast({
                variant: 'success',
                title: 'Application Approved!',
                description: 'Your loan application has been approved for $500,000.',
                actions: [
                  {
                    label: 'View Details',
                    onClick: () => alert('Viewing details...'),
                    variant: 'primary',
                  },
                ],
              })
            }
          >
            Show Success Toast
          </Button>
        </div>
      </section>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Component Library Demo"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            This modal demonstrates the modal component with smooth animations and accessibility
            features.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Name" placeholder="Enter your name" />
            <Input label="Email" type="email" placeholder="your@email.com" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Overview: StoryObj = {
  render: () => (
    <ToastProvider position="top-right">
      <ComponentShowcase />
    </ToastProvider>
  ),
};
