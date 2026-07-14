import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Dashboard from '../../pages/Dashboard';

export default {
  title: 'Pages/Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Prototype = {
  render: () => (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </MemoryRouter>
  ),
};