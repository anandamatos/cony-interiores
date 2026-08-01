import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CostureiraProvider } from "./context/CostureiraContext";
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';

// Lazy loading - melhor performance
const Services = lazy(() => import('./pages/Services'));
const Seamstresses = lazy(() => import('./pages/Seamstresses'));
const NewService = lazy(() => import('./pages/NewService'));
const EditService = lazy(() => import('./pages/EditService'));
const NewSeamstress = lazy(() => import('./pages/Seamstresses/NewSeamstress'));
const EditSeamstress = lazy(() => import('./pages/Seamstresses/EditSeamstress'));
const Capacity = lazy(() => import('./pages/Capacity'));
const Financial = lazy(() => import('./pages/Financial'));
const Productivity = lazy(() => import('./pages/Productivity'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Settings = lazy(() => import('./pages/Settings'));
const Team = lazy(() => import('./pages/Team'));

function App() {
  return (
    <CostureiraProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="services/new" element={<NewService />} />
            <Route path="services/edit/:id" element={<EditService />} />
            <Route path="seamstresses" element={<Seamstresses />} />
            <Route path="seamstresses/new" element={<NewSeamstress />} />
            <Route path="seamstresses/edit/:id" element={<EditSeamstress />} />
            <Route path="capacity" element={<Capacity />} />
            <Route path="financial" element={<Financial />} />
            <Route path="productivity" element={<Productivity />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="team" element={<Team />} />
            <Route path="*" element={<div>Página não encontrada</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CostureiraProvider>
  );
}

export default App;