import React from 'react';
import Alert from './index';

export default {
  title: 'Atoms/Alert',
  component: Alert,
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
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    title: { control: 'text' },
    message: { control: 'text' },
    onClose: { action: 'closed' },
  },
};

export const Default = (args) => <Alert {...args} />;
Default.args = {
  type: 'info',
  title: 'Informação',
  message: 'Esta é uma mensagem informativa.',
};

export const Success = (args) => <Alert {...args} />;
Success.args = {
  type: 'success',
  title: 'Sucesso',
  message: 'Operação realizada com sucesso!',
};

export const Error = (args) => <Alert {...args} />;
Error.args = {
  type: 'error',
  title: 'Erro',
  message: 'Ocorreu um erro ao processar sua solicitação.',
};

export const Warning = (args) => <Alert {...args} />;
Warning.args = {
  type: 'warning',
  title: 'Aviso',
  message: 'Atenção: esta ação não pode ser desfeita.',
};

export const AllVariants = () => (
  <div className="space-y-4 w-96">
    <Alert type="success" title="Sucesso" message="Operação realizada com sucesso!" />
    <Alert type="error" title="Erro" message="Ocorreu um erro ao processar sua solicitação." />
    <Alert type="warning" title="Aviso" message="Atenção: esta ação não pode ser desfeita." />
    <Alert type="info" title="Informação" message="Esta é uma mensagem informativa." />
  </div>
);