import type { Meta, StoryObj } from '@storybook/react';
import { Building, DollarSign, Lock, Mail, Phone, User } from 'lucide-react';
import { Button } from '../Button';
import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';

const meta: Meta = {
  title: 'Components/Form',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive form component library with floating labels, validation states, and accessibility features for AAGT Private Loans.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const InputVariants: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input label="Email Address" type="email" placeholder="Enter your email" />
      <Input label="Password" type="password" placeholder="Enter your password" />
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        leftIcon={<User className="w-4 h-4" />}
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone"
        leftIcon={<Phone className="w-4 h-4" />}
      />
      <Input
        label="Business Name"
        placeholder="Enter business name"
        leftIcon={<Building className="w-4 h-4" />}
      />
    </div>
  ),
};

export const ValidationStates: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input
        label="Email Address"
        type="email"
        error="Please enter a valid email address"
        leftIcon={<Mail className="w-4 h-4" />}
      />
      <Input
        label="Password"
        type="password"
        success="Password strength: Strong"
        leftIcon={<Lock className="w-4 h-4" />}
      />
      <Input
        label="Loan Amount"
        type="number"
        warning="Amount is below our minimum threshold"
        leftIcon={<DollarSign className="w-4 h-4" />}
      />
      <Input
        label="Phone Number"
        type="tel"
        helperText="We'll use this to contact you about your application"
        leftIcon={<Phone className="w-4 h-4" />}
      />
    </div>
  ),
};

export const TextareaExample: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Textarea
        label="Business Description"
        placeholder="Tell us about your business"
        helperText="Provide a brief overview of your business activities"
      />
      <Textarea
        label="Loan Purpose"
        placeholder="How will you use this loan?"
        error="This field is required"
        required
      />
      <Textarea
        label="Additional Comments"
        placeholder="Any additional information"
        rows={6}
        resize
      />
    </div>
  ),
};

export const SelectExample: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Select
        label="Loan Type"
        placeholder="Select loan type"
        options={[
          { value: 'business', label: 'Business Loan' },
          { value: 'investment', label: 'Investment Loan' },
          { value: 'development', label: 'Development Finance' },
          { value: 'bridge', label: 'Bridge Loan' },
        ]}
      />
      <Select
        label="Industry"
        placeholder="Select your industry"
        helperText="This helps us understand your business better"
        options={[
          { value: 'construction', label: 'Construction' },
          { value: 'retail', label: 'Retail' },
          { value: 'hospitality', label: 'Hospitality' },
          { value: 'professional', label: 'Professional Services' },
          { value: 'manufacturing', label: 'Manufacturing' },
          { value: 'other', label: 'Other' },
        ]}
      />
    </div>
  ),
};

export const CheckboxExample: StoryObj = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Checkbox label="I agree to the terms and conditions" required />
      <Checkbox
        label="I would like to receive marketing communications"
        helperText="You can unsubscribe at any time"
      />
      <Checkbox
        label="I confirm all information provided is accurate"
        error="You must confirm the accuracy of your information"
      />
    </div>
  ),
};

export const CompleteForm: StoryObj = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Loan Application Form</h2>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="First Name" required leftIcon={<User className="w-4 h-4" />} />
          <Input label="Last Name" required leftIcon={<User className="w-4 h-4" />} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Phone Number"
            type="tel"
            required
            leftIcon={<Phone className="w-4 h-4" />}
          />
        </div>

        <Input label="Business Name" required leftIcon={<Building className="w-4 h-4" />} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Loan Type"
            required
            placeholder="Select loan type"
            options={[
              { value: 'business', label: 'Business Loan' },
              { value: 'investment', label: 'Investment Loan' },
              { value: 'development', label: 'Development Finance' },
            ]}
          />
          <Input
            label="Loan Amount"
            type="number"
            required
            placeholder="150000"
            leftIcon={<DollarSign className="w-4 h-4" />}
            helperText="Minimum $150,000"
          />
        </div>

        <Textarea
          label="Business Description"
          required
          placeholder="Describe your business and how you plan to use the loan"
          rows={4}
        />

        <div className="space-y-3">
          <Checkbox label="I agree to the terms and conditions" required />
          <Checkbox label="I consent to credit checks and verification" required />
          <Checkbox label="I would like to receive updates about my application" />
        </div>

        <div className="flex gap-4">
          <Button variant="ghost" className="flex-1">
            Save Draft
          </Button>
          <Button variant="primary" className="flex-1">
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  ),
};

export const FloatingLabels: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <h3 className="text-lg font-semibold mb-4">Floating Label Animation</h3>
      <Input label="First Name" />
      <Input label="Email Address" type="email" />
      <Textarea label="Message" />
      <Select
        label="Country"
        options={[
          { value: 'au', label: 'Australia' },
          { value: 'nz', label: 'New Zealand' },
          { value: 'us', label: 'United States' },
        ]}
      />
    </div>
  ),
};
