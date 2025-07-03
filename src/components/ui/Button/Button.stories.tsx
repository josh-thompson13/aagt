import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants, sizes, and states for the AAGT Private Loans design system.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Apply for Loan',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Learn More',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Cancel',
    variant: 'ghost',
  },
};

export const Outline: Story = {
  args: {
    children: 'View Details',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete Application',
    variant: 'destructive',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button leftIcon={<Download className="w-4 h-4" />}>Download Statement</Button>
      <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Continue Application</Button>
      <Button
        leftIcon={<Mail className="w-4 h-4" />}
        rightIcon={<ArrowRight className="w-4 h-4" />}
      >
        Send Email
      </Button>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button loading>Processing...</Button>
      <Button loading loadingText="Submitting Application">
        Submit
      </Button>
      <Button variant="secondary" loading>
        Calculating Rates
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: 'Start Your Application',
    fullWidth: true,
    variant: 'primary',
  },
  parameters: {
    layout: 'padded',
  },
};

export const AsLink: Story = {
  args: {
    children: 'Visit Our Website',
    href: 'https://aagt.com.au',
    target: '_blank',
    variant: 'outline',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
