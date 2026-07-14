import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Capacity from '../../pages/Capacity';

export default {
  title: 'Pages/Capacity',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Prototype = {
  render: () => (
    <MemoryRouter initialEntries={['/capacity']}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/capacity" element={<Capacity />} />
        </Route>
      </Routes>
    </MemoryRouter>
  ),
};
