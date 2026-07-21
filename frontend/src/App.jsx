import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Seamstresses from "./pages/Seamstresses";
import NewService from "./pages/NewService";
import EditService from "./pages/EditService";
import NewSeamstress from "./pages/Seamstresses/NewSeamstress";
import EditSeamstress from "./pages/Seamstresses/EditSeamstress";
import Capacity from "./pages/Capacity";
import Financial from "./pages/Financial";
import Settings from "./pages/Settings";
import Team from "./pages/Team";
import { CostureiraProvider } from "./context/CostureiraContext";

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
      </BrowserRouter>
    </CostureiraProvider>
  );
}

export default App;
