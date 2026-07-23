import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";

const Services = lazy(() => import("../pages/Services"));
const NewService = lazy(() => import("../pages/NewService"));
const EditService = lazy(() => import("../pages/EditService"));
const Seamstresses = lazy(() => import("../pages/Seamstresses"));
const NewSeamstress = lazy(() => import("../pages/Seamstresses/NewSeamstress"));
const EditSeamstress = lazy(() => import("../pages/Seamstresses/EditSeamstress"));
const Capacity = lazy(() => import("../pages/Capacity"));
const Financial = lazy(() => import("../pages/Financial"));
const Settings = lazy(() => import("../pages/Settings"));
const Team = lazy(() => import("../pages/Team"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="services/new" element={<NewService />} />
        <Route path="services/:id/edit" element={<EditService />} />
        <Route path="seamstresses" element={<Seamstresses />} />
        <Route path="seamstresses/new" element={<NewSeamstress />} />
        <Route path="seamstresses/:id/edit" element={<EditSeamstress />} />
        <Route path="capacity" element={<Capacity />} />
        <Route path="financial" element={<Financial />} />
        <Route path="settings" element={<Settings />} />
        <Route path="team" element={<Team />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Route>
    </Routes>
  );
}