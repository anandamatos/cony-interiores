import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Costureiras from "../pages/Costureiras";
import CadastroCostureira from "../pages/CadastroCostureiras";

const Home = lazy(() => import("../pages/Home"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<main style={{ padding: "24px" }}>Carregando pagina...</main>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/costureiras" element={<Costureiras />} />
          <Route path="/costureiras/nova" element={<CadastroCostureira />} />
          <Route path="/costureiras/:id/editar" element={<CadastroCostureira />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}