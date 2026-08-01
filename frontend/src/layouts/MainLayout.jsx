import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Sidebar from '../components/organisms/Sidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-h-screen flex-col lg:pl-[270px]">
        <Header />
        <main className="flex-1 overflow-y-auto pt-[88px]">
          <Suspense
            fallback={
              <div className="flex h-64 items-center justify-center px-6 sm:px-8 lg:px-10">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="mt-3 text-sm text-taupe">Carregando módulo...</p>
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