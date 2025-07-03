import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastProvider';

const meta: Meta<typeof Toast> = {
  title: 'Components/Notification',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toast and notification components with animations and customizable positioning for AAGT Private Loans.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    duration: {
      control: 'number',
    },
    showCloseButton: {
      control: 'boolean',
    },
    showProgress: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    description: 'This is a default notification message.',
    isVisible: true,
    duration: 0, // Disable auto-close for Storybook
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Notification Title',
    description: 'This notification includes both a title and description.',
    isVisible: true,
    duration: 0,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast
        variant="success"
        title="Success"
        description="Your loan application has been submitted successfully!"
        isVisible={true}
        duration={0}
      />

      <Toast
        variant="error"
        title="Error"
        description="There was an error processing your application. Please try again."
        isVisible={true}
        duration={0}
      />

      <Toast
        variant="warning"
        title="Warning"
        description="Some required documents are missing from your application."
        isVisible={true}
        duration={0}
      />

      <Toast
        variant="info"
        title="Information"
        description="Your application is being reviewed and will be processed within 24 hours."
        isVisible={true}
        duration={0}
      />
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    title: 'Application Incomplete',
    description: 'You need to upload additional documents to complete your application.',
    variant: 'warning',
    isVisible: true,
    duration: 0,
    actions: [
      {
        label: 'Upload Documents',
        onClick: () => alert('Upload documents clicked'),
        variant: 'primary',
      },
      {
        label: 'Remind Later',
        onClick: () => alert('Remind later clicked'),
        variant: 'secondary',
      },
    ],
  },
};

const ToastDemo = () => {
  const { showToast, clearAllToasts } = useToast();

  const showSuccessToast = () => {
    showToast({
      variant: 'success',
      title: 'Success!',
      description: 'Your loan application has been approved.',
      duration: 5000,
    });
  };

  const showErrorToast = () => {
    showToast({
      variant: 'error',
      title: 'Application Error',
      description: 'There was a problem submitting your application.',
      duration: 5000,
      actions: [
        {
          label: 'Retry',
          onClick: () => alert('Retrying...'),
          variant: 'primary',
        },
      ],
    });
  };

  const showWarningToast = () => {
    showToast({
      variant: 'warning',
      title: 'Documents Required',
      description: 'Please upload your bank statements to proceed.',
      duration: 8000,
    });
  };

  const showInfoToast = () => {
    showToast({
      variant: 'info',
      description: 'Your application is being processed.',
      duration: 3000,
    });
  };

  const showPersistentToast = () => {
    showToast({
      variant: 'info',
      title: 'Persistent Notification',
      description: 'This notification will not auto-dismiss.',
      duration: 0,
      showProgress: false,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={showSuccessToast} variant="outline">
          Show Success
        </Button>
        <Button onClick={showErrorToast} variant="outline">
          Show Error
        </Button>
        <Button onClick={showWarningToast} variant="outline">
          Show Warning
        </Button>
        <Button onClick={showInfoToast} variant="outline">
          Show Info
        </Button>
        <Button onClick={showPersistentToast} variant="outline">
          Show Persistent
        </Button>
        <Button onClick={clearAllToasts} variant="destructive">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export const ToastProvider: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastDemo />
    </ToastProvider>
  ),
};

const PositionDemo = () => {
  const { showToast } = useToast();

  const positions = [
    { key: 'top-left', label: 'Top Left' },
    { key: 'top-center', label: 'Top Center' },
    { key: 'top-right', label: 'Top Right' },
    { key: 'bottom-left', label: 'Bottom Left' },
    { key: 'bottom-center', label: 'Bottom Center' },
    { key: 'bottom-right', label: 'Bottom Right' },
  ] as const;

  return (
    <div className="grid grid-cols-3 gap-4">
      {positions.map(({ key, label }) => (
        <Button
          key={key}
          variant="outline"
          onClick={() =>
            showToast({
              title: label,
              description: `Toast positioned at ${label.toLowerCase()}`,
              position: key,
              duration: 3000,
            })
          }
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export const Positions: Story = {
  render: () => (
    <ToastProvider>
      <PositionDemo />
    </ToastProvider>
  ),
};

export const RealWorldExamples: Story = {
  render: () => {
    const { showToast } = useToast();

    const examples = [
      {
        label: 'Loan Approved',
        action: () =>
          showToast({
            variant: 'success',
            title: 'Congratulations!',
            description: 'Your loan application for $500,000 has been approved.',
            duration: 7000,
            actions: [
              {
                label: 'View Details',
                onClick: () => alert('Viewing loan details...'),
                variant: 'primary' as const,
              },
            ],
          }),
      },
      {
        label: 'Payment Due',
        action: () =>
          showToast({
            variant: 'warning',
            title: 'Payment Reminder',
            description: 'Your next payment of $2,500 is due in 3 days.',
            duration: 0,
            actions: [
              {
                label: 'Pay Now',
                onClick: () => alert('Opening payment portal...'),
                variant: 'primary' as const,
              },
              {
                label: 'Set Reminder',
                onClick: () => alert('Reminder set!'),
                variant: 'secondary' as const,
              },
            ],
          }),
      },
      {
        label: 'Rate Update',
        action: () =>
          showToast({
            variant: 'info',
            title: 'Interest Rate Update',
            description:
              'New competitive rates are now available. Check if you qualify for a better rate.',
            duration: 10000,
            actions: [
              {
                label: 'Check Rates',
                onClick: () => alert('Checking rates...'),
                variant: 'primary' as const,
              },
            ],
          }),
      },
      {
        label: 'System Error',
        action: () =>
          showToast({
            variant: 'error',
            title: 'Connection Error',
            description: 'Unable to connect to our servers. Please check your internet connection.',
            duration: 0,
            actions: [
              {
                label: 'Retry',
                onClick: () => alert('Retrying connection...'),
                variant: 'primary' as const,
              },
              {
                label: 'Contact Support',
                onClick: () => alert('Opening support chat...'),
                variant: 'secondary' as const,
              },
            ],
          }),
      },
    ];

    return (
      <div className="grid grid-cols-2 gap-4">
        {examples.map(({ label, action }) => (
          <Button key={label} variant="outline" onClick={action}>
            {label}
          </Button>
        ))}
      </div>
    );
  },
  decorators: [
    (Story) => (
      <ToastProvider position="top-right">
        <Story />
      </ToastProvider>
    ),
  ],
};
