import Input from '../../components/atoms/Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'date', 'tel'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    value: { control: 'text' },
  },
};

export const Default = {
  args: {
    placeholder: 'Digite algo...',
  },
};

export const WithLabel = {
  args: {
    label: 'Nome completo',
    placeholder: 'Digite seu nome',
  },
};

export const WithError = {
  args: {
    label: 'Email',
    placeholder: 'Digite seu email',
    error: 'Email inválido',
  },
};

export const Disabled = {
  args: {
    label: 'Campo desabilitado',
    placeholder: 'Campo desabilitado',
    disabled: true,
  },
};

export const Required = {
  args: {
    label: 'Campo obrigatório',
    placeholder: 'Digite algo...',
    required: true,
  },
};

export const Password = {
  args: {
    type: 'password',
    label: 'Senha',
    placeholder: 'Digite sua senha',
  },
};