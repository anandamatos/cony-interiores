import AppRoutes from "./routes/AppRoutes";
import { CostureiraProvider } from "./context/CostureiraContext";

function App() {
  return (
    <CostureiraProvider>
      <AppRoutes />
    </CostureiraProvider>
  );
}

export default App;