import { useState } from 'react';
import QuickCreateModal from './index';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';

export default {
  title: 'Organisms/QuickCreateModal',
  component: QuickCreateModal,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-background p-10">
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>

      <QuickCreateModal
        open={open}
        title="Cadastrar novo cliente"
        description="Crie o item sem sair do cadastro principal."
        onClose={() => setOpen(false)}
        actions={(
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Salvar e selecionar</Button>
          </>
        )}
      >
        <div className="space-y-4">
          <Input
            label="Nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex: Cliente Cony"
            required
          />
          <Input label="Contato" placeholder="(11) 99999-9999" />
          <Input label="Email" type="email" placeholder="contato@cliente.com" />
        </div>
      </QuickCreateModal>
    </div>
  );
};
