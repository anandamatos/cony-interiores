import { MemoryRouter } from 'react-router-dom';
import Sidebar from './index';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => (
  <MemoryRouter initialEntries={['/']}>
    <div className="min-h-screen bg-offWhite pl-[270px]">
      <Sidebar />
      <div className="p-10 text-taupe">Sidebar fixa com identidade Cony e navegação principal.</div>
    </div>
  </MemoryRouter>
);