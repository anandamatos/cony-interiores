import Input from './index';

export default {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'date'],
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    multiline: { control: 'boolean' },
  },
};

export const Default = (args) => <Input {...args} />;
Default.args = {
  label: 'Cliente',
  placeholder: 'Ex: João Silva',
  required: true,
};

export const WithError = (args) => <Input {...args} />;
WithError.args = {
  label: 'Prazo de entrega',
  placeholder: 'dd/mm/aaaa',
  error: 'Informe uma data válida para o prazo.',
  required: true,
};

export const Disabled = (args) => <Input {...args} />;
Disabled.args = {
  label: 'Campo bloqueado',
  placeholder: 'Não editável no momento',
  disabled: true,
};

export const Multiline = (args) => <Input {...args} />;
Multiline.args = {
  label: 'Observações',
  placeholder: 'Detalhes relevantes para a produção ou entrega...',
  multiline: true,
  rows: 4,
};