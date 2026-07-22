import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CostureiraProvider } from '../../context/CostureiraContext';
import MainLayout from '../../layouts/MainLayout';
import Settings from '../../pages/Settings';

export default {
  title: 'Pages/Settings',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Prototype = {
  render: () => (
    <CostureiraProvider>
      <MemoryRouter initialEntries={['/settings']}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </CostureiraProvider>
  ),
};
