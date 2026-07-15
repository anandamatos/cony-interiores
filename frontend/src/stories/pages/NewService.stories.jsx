import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import NewService from '../../pages/NewService';

export default {
  title: 'Pages/NewService',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Prototype = {
  render: () => (
    <MemoryRouter initialEntries={['/services/new']}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/services/new" element={<NewService />} />
        </Route>
      </Routes>
    </MemoryRouter>
  ),
};
