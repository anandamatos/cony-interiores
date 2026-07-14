import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // ============================================
  // Acessibilidade: Configuração do addon a11y
  // ============================================
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
            // WCAG 2.1 AA
            contrastLevel: 'AA',
          },
        },
      },
    },
  },
};

export const tags = ['autodocs'];