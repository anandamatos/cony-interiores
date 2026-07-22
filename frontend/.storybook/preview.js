import React from 'react';
import '../src/index.css';

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast',
          enabled: true,
        },
        {
          id: 'aria-required-attr',
          enabled: true,
        },
        {
          id: 'aria-roles',
          enabled: true,
        },
        {
          id: 'nested-interactive',
          enabled: true,
        },
      ],
    },
    options: {
      checks: {
        'color-contrast': {
          options: {
            contrastLevel: 'AA',
          },
        },
      },
    },
  },
};

export const decorators = [
  (Story) => React.createElement(
    'div',
    { className: 'min-h-screen bg-offWhite text-primary font-secondary' },
    React.createElement(Story)
  ),
];

export const tags = ['autodocs'];
