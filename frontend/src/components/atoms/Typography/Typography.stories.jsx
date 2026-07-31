import React from 'react';
import Typography from './index';

export default {
  title: 'Atoms/Typography',
  component: Typography,
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
      options: ['h1', 'h2', 'h3', 'h4', 'body1', 'body2', 'caption'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'taupe', 'white', 'black', 'gold', 'terracota', 'danger', 'success', 'warning', 'info'],
    },
    weight: {
      control: 'select',
      options: ['thin', 'extraLight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
    },
  },
};

export const Default = (args) => <Typography {...args}>Texto com Typography</Typography>;
Default.args = {
  variant: 'body1',
  color: 'primary',
};

export const AllVariants = () => (
  <div className="space-y-4 max-w-2xl">
    <Typography variant="h1">Heading 1 - 30px</Typography>
    <Typography variant="h2">Heading 2 - 24px</Typography>
    <Typography variant="h3">Heading 3 - 18px</Typography>
    <Typography variant="h4">Heading 4 - 16px</Typography>
    <Typography variant="body1">
      Body 1 - Texto corrido principal com 16px e line-height 1.7.
    </Typography>
    <Typography variant="body2">
      Body 2 - Texto secundário com 14px e line-height 1.6.
    </Typography>
    <Typography variant="caption">
      Caption - Metadados e informações complementares com 12px.
    </Typography>
  </div>
);

export const Colors = () => (
  <div className="space-y-2">
    <Typography color="primary">Primary - #703824</Typography>
    <Typography color="taupe">Taupe - #8C7568</Typography>
    <Typography color="gold">Gold - #C2996A</Typography>
    <Typography color="terracota">Terracota - #903839</Typography>
    <Typography color="success">Success - #4B7A5B</Typography>
    <Typography color="danger">Danger - #903839</Typography>
  </div>
);