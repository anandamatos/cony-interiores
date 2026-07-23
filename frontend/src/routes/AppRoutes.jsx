import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';

const Services = lazy(() => import('../pages/Services'));
const Seamstresses = lazy(() => import('../pages/Seamstresses'));
const NewService = lazy(() => import('../pages/NewService'));
const NewSeamstress = lazy(() => import('../pages/Seamstresses/NewSeamstress'));
const Capacity = lazy(() => import('../pages/Capacity'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="services/new" element={<NewService />} />
        <Route path="seamstresses" element={<Seamstresses />} />
        <Route path="seamstresses/new" element={<NewSeamstress />} />
        <Route path="capacity" element={<Capacity />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Route>
    </Routes>
  );
}