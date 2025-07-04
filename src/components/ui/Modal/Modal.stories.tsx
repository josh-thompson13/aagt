import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { Input, Textarea } from '../Form';
import { Dialog } from './Dialog';
import { Modal, ModalBody, ModalFooter } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal and Dialog components with smooth animations and accessibility features for AAGT Private Loans.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'],
    },
    variant: {
      control: 'select',
      options: ['default', 'glassmorphism'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Default Modal">
          <p className="text-gray-600">
            This is a default modal with standard styling and animations.
          </p>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {sizes.map((size) => (
            <Button key={size} variant="outline" onClick={() => setOpenModal(size)}>
              {size.toUpperCase()}
            </Button>
          ))}
        </div>

        {sizes.map((size) => (
          <Modal
            key={size}
            isOpen={openModal === size}
            onClose={() => setOpenModal(null)}
            title={`${size.toUpperCase()} Modal`}
            size={size}
          >
            <p className="text-gray-600">
              This is a {size} sized modal. Content will adjust to the specified size.
            </p>
          </Modal>
        ))}
      </div>
    );
  },
};

export const GlassMorphism: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        className="p-8 rounded-lg"
        style={{
          backgroundImage: 'linear-gradient(135deg, #0891B2 0%, #0A2540 100%)',
        }}
      >
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          Open Glass Modal
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Glass Morphism Modal"
          variant="glassmorphism"
        >
          <p className="text-gray-700">
            This modal features a beautiful glass morphism effect with backdrop blur.
          </p>
        </Modal>
      </div>
    );
  },
};

export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Contact Us</Button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Contact Form" size="lg">
          <ModalBody>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" required />
                <Input label="Last Name" required />
              </div>

              <Input label="Email Address" type="email" required />
              <Input label="Phone Number" type="tel" />

              <Textarea label="Message" placeholder="How can we help you?" required rows={4} />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">Send Message</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const ConfirmationModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Application
        </Button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Deletion" size="sm">
          <ModalBody>
            <p className="text-gray-700">
              Are you sure you want to delete this loan application? This action cannot be undone.
            </p>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const DialogExamples: Story = {
  render: () => {
    const [dialogType, setDialogType] = useState<string | null>(null);

    const dialogs = [
      {
        type: 'info',
        title: 'Information',
        message: 'Your application has been received and is being processed.',
      },
      { type: 'success', title: 'Success', message: 'Your loan application has been approved!' },
      {
        type: 'warning',
        title: 'Warning',
        message: 'Some documents are missing from your application.',
      },
      {
        type: 'error',
        title: 'Error',
        message: 'There was an error processing your application. Please try again.',
      },
    ] as const;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {dialogs.map((dialog) => (
            <Button key={dialog.type} variant="outline" onClick={() => setDialogType(dialog.type)}>
              {dialog.type.charAt(0).toUpperCase() + dialog.type.slice(1)} Dialog
            </Button>
          ))}
        </div>

        {dialogs.map((dialog) => (
          <Dialog
            key={dialog.type}
            isOpen={dialogType === dialog.type}
            onClose={() => setDialogType(null)}
            type={dialog.type as any}
            title={dialog.title}
            message={dialog.message}
            showCancel={dialog.type === 'warning'}
            confirmText={dialog.type === 'error' ? 'Try Again' : 'OK'}
          />
        ))}
      </div>
    );
  },
};

export const FullScreenModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Full Screen</Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Full Screen Modal"
          size="full"
        >
          <ModalBody>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0A2540]">Comprehensive Loan Application</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <Input label="Full Name" />
                  <Input label="Email Address" type="email" />
                  <Input label="Phone Number" type="tel" />
                  <Input label="Date of Birth" type="date" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Business Information</h3>
                  <Input label="Business Name" />
                  <Input label="ABN" />
                  <Input label="Industry" />
                  <Textarea label="Business Description" rows={4} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Loan Details</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Input label="Loan Amount" type="number" />
                  <Input label="Loan Purpose" />
                  <Input label="Preferred Term" />
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Save Draft
            </Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Previous
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Continue
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
