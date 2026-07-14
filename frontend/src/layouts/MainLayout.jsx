import { Outlet } from 'react-router-dom';
import Sidebar from '../components/organisms/Sidebar';
import Header from '../components/organisms/Header';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-offWhite">
      <Sidebar />
      <div className="min-h-screen flex flex-col lg:pl-64">
        <Header />
        <div className="flex-1 pt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;