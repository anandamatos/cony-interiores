import { BrowserRouter } from "react-router-dom";
import { CostureiraProvider } from "./context/CostureiraContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <CostureiraProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppRoutes />
      </BrowserRouter>
    </CostureiraProvider>
  );
}

export default App;
