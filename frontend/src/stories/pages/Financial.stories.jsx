import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Financial from '../../pages/Financial';

export default {
  title: 'Pages/Financial',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Prototype = {
  render: () => (
    <MemoryRouter initialEntries={['/financial']}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/financial" element={<Financial />} />
        </Route>
      </Routes>
    </MemoryRouter>
  ),
};
