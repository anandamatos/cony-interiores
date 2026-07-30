import React from 'react';
import Badge from './index';

export default {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'gold', 'terracota', 'success', 'warning', 'danger', 'info', 'neutral', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export const Default = (args) => <Badge {...args}>Badge</Badge>;
Default.args = {
  variant: 'primary',
  size: 'md',
};

export const AllVariants = () => (
  <div className="flex gap-3 flex-wrap">
    <Badge variant="primary">Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="gold">Gold</Badge>
    <Badge variant="terracota">Terracota</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="danger">Danger</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="ghost">Ghost</Badge>
  </div>
);

export const AllSizes = () => (
  <div className="flex gap-3 flex-wrap items-center">
    <Badge size="sm">Small</Badge>
    <Badge size="md">Medium</Badge>
    <Badge size="lg">Large</Badge>
  </div>
);