import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Sidebar from '../components/organisms/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="mt-3 text-sm text-text-secondary">Carregando módulo...</p>
                </div>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;