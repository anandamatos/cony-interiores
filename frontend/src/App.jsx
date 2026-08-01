import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CostureiraProvider } from "./context/CostureiraContext";
import { AuthProvider, useAuth } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Login from './pages/Login';

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

function ProtectedRoute({ children }) {
  const { authenticated, isHydrating } = useAuth();
  const location = useLocation();

  if (isHydrating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-3 text-sm text-taupe">Validando acesso...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

function GuestRoute({ children }) {
  const { authenticated, isHydrating } = useAuth();

  if (isHydrating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-3 text-sm text-taupe">Preparando área de acesso...</p>
        </div>
      </div>
    );
  }

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <CostureiraProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-background px-6">
                  <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="mt-3 text-sm text-taupe">Carregando módulo...</p>
                  </div>
                </div>
              }
            >
              <Routes>
                <Route
                  path="/login"
                  element={
                    <GuestRoute>
                      <Login />
                    </GuestRoute>
                  }
                />
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route
                    path="services"
                    element={
                      <ProtectedRoute>
                        <Services />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="services/new"
                    element={
                      <ProtectedRoute>
                        <NewService />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="services/edit/:id"
                    element={
                      <ProtectedRoute>
                        <EditService />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="seamstresses"
                    element={
                      <ProtectedRoute>
                        <Seamstresses />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="seamstresses/new"
                    element={
                      <ProtectedRoute>
                        <NewSeamstress />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="seamstresses/edit/:id"
                    element={
                      <ProtectedRoute>
                        <EditSeamstress />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="capacity"
                    element={
                      <ProtectedRoute>
                        <Capacity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="financial"
                    element={
                      <ProtectedRoute>
                        <Financial />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="productivity"
                    element={
                      <ProtectedRoute>
                        <Productivity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="catalog"
                    element={
                      <ProtectedRoute>
                        <Catalog />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="reports"
                    element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="team"
                    element={
                      <ProtectedRoute>
                        <Team />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<div>Página não encontrada</div>} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CostureiraProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;