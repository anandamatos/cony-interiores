import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Seamstresses from './pages/Seamstresses';
import NewService from './pages/NewService';
import Capacity from './pages/Capacity';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="services/new" element={<NewService />} />
          <Route path="seamstresses" element={<Seamstresses />} />
          <Route path="capacity" element={<Capacity />} />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;