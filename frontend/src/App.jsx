import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CostureiraProvider } from './context/CostureiraContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Seamstresses from './pages/Seamstresses';
import NewSeamstress from './pages/Seamstresses/NewSeamstress';
import Capacity from './pages/Capacity';
import Financial from './pages/Financial';
import NewService from './pages/NewService';

function App() {
  return (
    <CostureiraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="services/new" element={<NewService />} />
            <Route path="seamstresses" element={<Seamstresses />} />
            <Route path="seamstresses/new" element={<NewSeamstress />} />
            <Route path="capacity" element={<Capacity />} />
            <Route path="financial" element={<Financial />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CostureiraProvider>
  );
}

export default App;