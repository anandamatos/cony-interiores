import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Gauge,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import classNames from 'classnames';

// A imagem está na pasta public, então usamos o caminho direto
const logoIcon = "/icony.png";

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/services', label: 'Serviços', icon: ClipboardList },
  { path: '/seamstresses', label: 'Costureiras', icon: Users },
  { path: '/capacity', label: 'Capacidade', icon: Gauge },
  { path: '/financial', label: 'Financeiro', icon: DollarSign },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Classes base
  const baseClasses = {
    container: classNames(
      'fixed lg:static inset-y-0 left-0 z-40',
      'w-64 bg-white border-r border-gray',
      'flex flex-col h-full',
      'transition-transform duration-300 ease-spring',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ),
    overlay: classNames(
      'lg:hidden fixed inset-0 bg-black/40 z-30',
      'transition-opacity duration-300',
      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    ),
    header: 'flex items-center gap-3 px-6 h-16 border-b border-gray flex-shrink-0',
    logo: 'w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 p-1.5',
    logoImg: 'w-full h-full object-contain',
    title: 'font-brand text-lg font-bold text-primary tracking-wide',
    subtitle: 'text-xs text-taupe font-secondary tracking-widest uppercase block -mt-0.5',
    nav: 'flex-1 px-3 py-4 space-y-1 overflow-y-auto',
    navLabel: 'text-xs font-bold text-taupe uppercase tracking-wider px-3 py-2',
    link: ({ isActive }) => classNames(
      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
      'transition-all duration-200 ease-spring',
      'focus:outline-none focus:ring-2 focus:ring-primary/20',
      isActive
        ? 'bg-gradient-gold text-primary shadow-sm font-semibold'
        : 'text-primary/70 hover:bg-offWhite hover:text-primary hover:translate-x-1'
    ),
    icon: 'w-5 h-5 flex-shrink-0',
    badge: 'ml-auto bg-terracota text-white text-xs font-semibold px-2 py-0.5 rounded-full',
    footer: 'border-t border-gray p-4 flex items-center gap-3 flex-shrink-0',
    avatar: 'w-10 h-10 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold text-sm',
    footerInfo: 'flex-1 min-w-0',
    footerName: 'text-sm font-semibold text-primary truncate',
    footerRole: 'text-xs text-taupe truncate',
    logoutBtn: 'p-2 rounded-lg text-taupe hover:text-danger hover:bg-danger/10 transition-all duration-200',
    mobileToggle: classNames(
      'lg:hidden fixed top-4 left-4 z-50',
      'p-2 rounded-lg bg-white shadow-md border border-gray',
      'hover:bg-offWhite transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary/20'
    ),
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={baseClasses.mobileToggle}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      <div
        className={baseClasses.overlay}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={baseClasses.container}
        role="navigation"
        aria-label="Menu principal"
      >
        {/* Header / Logo */}
        <div className={baseClasses.header}>
          <div className={baseClasses.logo}>
            <img
              src={logoIcon}
              alt="Cony Interiores"
              className={baseClasses.logoImg}
            />
          </div>
          <div>
            <span className={baseClasses.title}>Cony</span>
            <span className={baseClasses.subtitle}>Interiores</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={baseClasses.nav}>
          <div className={baseClasses.navLabel}>Menu</div>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={baseClasses.link}
              onClick={closeSidebar}
              aria-label={item.label}
            >
              <item.icon className={baseClasses.icon} aria-hidden="true" />
              <span>{item.label}</span>
              {item.badge && (
                <span className={baseClasses.badge}>{item.badge}</span>
              )}
            </NavLink>
          ))}

          <div className={baseClasses.navLabel} style={{ marginTop: '24px' }}>
            Configurações
          </div>
          <NavLink
            to="/settings"
            className={baseClasses.link}
            onClick={closeSidebar}
            aria-label="Configurações"
          >
            <Settings className={baseClasses.icon} aria-hidden="true" />
            <span>Preferências</span>
          </NavLink>
          <NavLink
            to="/team"
            className={baseClasses.link}
            onClick={closeSidebar}
            aria-label="Equipe"
          >
            <Users className={baseClasses.icon} aria-hidden="true" />
            <span>Equipe</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className={baseClasses.footer}>
          <div className={baseClasses.avatar}>AM</div>
          <div className={baseClasses.footerInfo}>
            <div className={baseClasses.footerName}>Ana Matos</div>
            <div className={baseClasses.footerRole}>UX Lead</div>
          </div>
          <button
            className={baseClasses.logoutBtn}
            aria-label="Sair"
            onClick={() => {
              console.log('🔒 Logout clicado');
              // TODO: Implementar logout
            }}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;