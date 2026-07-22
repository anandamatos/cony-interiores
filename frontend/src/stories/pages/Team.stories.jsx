import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CostureiraProvider } from '../../context/CostureiraContext';
import MainLayout from '../../layouts/MainLayout';
import Team from '../../pages/Team';

export default {
  title: 'Pages/Team',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Prototype = {
  render: () => (
    <CostureiraProvider>
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/team" element={<Team />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </CostureiraProvider>
  ),
};
