import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Services from '../../pages/Services';

export default {
  title: 'Pages/Services',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Prototype = {
  render: () => (
    <MemoryRouter initialEntries={['/services']}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/services" element={<Services />} />
        </Route>
      </Routes>
    </MemoryRouter>
  ),
};
