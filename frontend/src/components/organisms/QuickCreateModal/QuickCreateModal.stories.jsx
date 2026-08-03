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

export const SmallViewportScrollable = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <Button onClick={() => setOpen(true)}>Abrir modal em tela pequena</Button>

      <QuickCreateModal
        open={open}
        title="Cadastrar novo produto"
        description="Em telas menores, role o conteúdo do modal para preencher todos os campos."
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
            placeholder="Ex: Cortina Linho"
            required
          />
          <Input label="Valor base" type="number" placeholder="0.00" />
          <Input label="Grupo comercial" placeholder="Grupo comercial" />
          <Input label="Categoria técnica" placeholder="Categoria técnica" />
          <Input label="Observações" multiline rows={3} placeholder="Detalhes úteis para a operação" />
          <Input label="Campo extra 1" placeholder="Exemplo" />
          <Input label="Campo extra 2" placeholder="Exemplo" />
          <Input label="Campo extra 3" placeholder="Exemplo" />
          <Input label="Campo extra 4" placeholder="Exemplo" />
          <Input label="Campo extra 5" placeholder="Exemplo" />
        </div>
      </QuickCreateModal>
    </div>
  );
};

SmallViewportScrollable.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};

export const IPadNoPreScroll = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <QuickCreateModal
        open={open}
        title="Cadastrar novo produto"
        description="Cenário de iPad sem rolagem prévia da página: o modal deve abrir inteiro e permitir rolagem interna até o último campo."
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
            placeholder="Ex: Cortina Linho"
            required
          />
          <Input label="Valor base" type="number" placeholder="0.00" />
          <Input label="Grupo comercial" placeholder="Grupo comercial" />
          <Input label="Categoria técnica" placeholder="Categoria técnica" />
          <Input label="Observações" multiline rows={4} placeholder="Detalhes úteis para a operação" />
          <Input label="Campo extra 1" placeholder="Exemplo" />
          <Input label="Campo extra 2" placeholder="Exemplo" />
          <Input label="Campo extra 3" placeholder="Exemplo" />
          <Input label="Campo extra 4" placeholder="Exemplo" />
          <Input label="Campo extra 5" placeholder="Exemplo" />
          <Input label="Campo extra 6" placeholder="Exemplo" />
          <Input label="Campo extra 7" placeholder="Exemplo" />
        </div>
      </QuickCreateModal>
    </div>
  );
};

IPadNoPreScroll.parameters = {
  viewport: {
    defaultViewport: 'ipad',
  },
};
