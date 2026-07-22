import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CostureiraProvider } from '../../context/CostureiraContext';
import MainLayout from '../../layouts/MainLayout';
import Seamstresses from '../../pages/Seamstresses';

export default {
  title: 'Pages/Seamstresses',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Prototype = {
  render: () => (
    <CostureiraProvider>
      <MemoryRouter initialEntries={['/seamstresses']}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/seamstresses" element={<Seamstresses />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </CostureiraProvider>
  ),
};
