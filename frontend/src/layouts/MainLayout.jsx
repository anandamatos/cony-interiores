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
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;