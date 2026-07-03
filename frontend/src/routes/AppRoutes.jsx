import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Costureiras from "../pages/Costureiras";
import CadastroCostureira from "../pages/CadastroCostureiras";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/costureiras" element={<Costureiras />} />
        <Route
          path="/costureiras/nova"
          element={<CadastroCostureira />}
        />
        <Route
          path="/costureiras/:id/editar"
          element={<CadastroCostureira />}
        />
      </Routes>
    </BrowserRouter>
  );
}