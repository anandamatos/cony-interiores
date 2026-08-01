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
  title: 'Atualização operacional',
  message: 'Os dados do dashboard foram sincronizados com a API mais recente.',
};

export const Success = (args) => <Alert {...args} />;
Success.args = {
  type: 'success',
  title: 'Serviço concluído',
  message: 'Tapete - Ana Costa foi entregue dentro do prazo.',
};

export const Error = (args) => <Alert {...args} />;
Error.args = {
  type: 'error',
  title: 'Serviço em atraso',
  message: 'Cortina Ilhós - João Silva ultrapassou o prazo previsto.',
};

export const Warning = (args) => <Alert {...args} />;
Warning.args = {
  type: 'warning',
  title: 'Próximo do prazo',
  message: 'Almofadas - Maria Oliveira vence nos próximos 2 dias.',
};

export const AllVariants = () => (
  <div className="space-y-4 w-96">
    <Alert type="success" title="Serviço concluído" message="Tapete - Ana Costa foi entregue em 20/06." />
    <Alert type="error" title="Serviço em atraso" message="Cortina Ilhós - João Silva está com +2 dias." />
    <Alert type="warning" title="Próximo do prazo" message="Almofadas - Maria Oliveira vence em 3 dias." />
    <Alert type="info" title="Aguardando aprovação" message="Cortina Romana - Pedro Santos entrou em revisão." />
  </div>
);