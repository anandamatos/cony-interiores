import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  TrendingUp,
  Package,
} from 'lucide-react';
import classNames from 'classnames';
import { useAuth } from '../../../context/AuthContext';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/services', label: 'Serviços', icon: ClipboardList },
  { path: '/catalog', label: 'Catálogo', icon: Package, requiresAuth: true },
  { path: '/seamstresses', label: 'Costureiras', icon: Users, badge: '4', requiresAuth: true },
  { path: '/capacity', label: 'Capacidade', icon: Gauge },
  { path: '/financial', label: 'Financeiro', icon: DollarSign },
  { path: '/productivity', label: 'Produtividade', icon: TrendingUp },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { authenticated, user, logout } = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const baseClasses = {
    container: classNames(
      'fixed inset-y-0 left-0 z-40',
      'w-[270px] bg-white/85 backdrop-blur-xl border-r border-border',
      'flex flex-col h-screen',
      'transition-transform duration-normal ease-spring',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ),
    overlay: classNames(
      'lg:hidden fixed inset-0 bg-black/40 z-30',
      'transition-opacity duration-300',
      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    ),
    header: 'flex items-center gap-3 px-6 h-[88px] border-b border-border flex-shrink-0 mb-6',
    logo: classNames(
      'w-11 h-11 rounded-[3px]',
      'bg-[#E8E3D9] border border-[rgba(112,56,36,0.15)]',
      'flex items-center justify-center flex-shrink-0 p-1.5',
      'transition-all duration-normal ease-spring',
      'hover:scale-105 hover:-rotate-2 hover:shadow-md'
    ),
    logoSvg: 'w-full h-full',
    title: classNames(
      'font-display font-normal text-[19px]',
      'tracking-[0.3em] uppercase',
      'text-primary'
    ),
    subtitle: 'text-[10px] text-terracota font-display tracking-[0.15em] uppercase block mt-0.5',
    nav: 'flex-1 px-3 py-4 space-y-1 overflow-y-auto',
    navLabel: classNames(
      'font-display text-[11px] font-bold text-taupe uppercase tracking-[0.15em]',
      'px-3 py-2',
      'mt-4'
    ),
    link: ({ isActive }) => classNames(
      'flex items-center gap-3 px-4 py-3 text-sm',
      'transition-all duration-300 ease-spring',
      'duration-normal',
      'focus:outline-none focus:ring-2 focus:ring-primary/20',
      isActive
        ? 'rounded-[3px] bg-gradient-gold text-primary shadow-sm font-semibold opacity-100'
        : 'rounded-[3px] text-primary opacity-70 hover:bg-[rgba(222,187,164,0.25)] hover:opacity-100 hover:translate-x-1'
    ),
    icon: 'w-5 h-5 flex-shrink-0',
    badge: classNames(
      'ml-auto bg-terracota text-offWhite',
      'px-2.5 py-0.5 rounded-full',
      'text-[11px] font-semibold animate-pulse'
    ),
    footer: classNames(
      'border-t border-border',
      'p-4 flex items-center gap-3',
      'mt-auto'
    ),
    avatar: 'w-10 h-10 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0',
    footerInfo: 'flex-1 min-w-0',
    footerName: 'text-sm font-semibold text-primary truncate',
    footerRole: 'text-xs text-taupe truncate',
    loginBtn: classNames(
      'ml-auto rounded-full px-3 py-2 text-xs font-semibold',
      'bg-gradient-gold text-primary transition-all duration-normal ease-spring',
      'hover:shadow-md hover:scale-[1.02]'
    ),
    logoutBtn: classNames(
      'p-2 rounded-full text-taupe',
      'transition-all duration-normal ease-spring',
      'hover:text-primary hover:bg-offWhite hover:rotate-45'
    ),
    mobileToggle: classNames(
      'lg:hidden fixed top-4 left-4 z-50',
      'p-2 rounded-lg bg-white shadow-md border border-[rgba(75,58,46,0.08)]',
      'transition-all duration-normal ease-spring',
      'hover:bg-offWhite',
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
            <svg viewBox="0 0 60 90" className={baseClasses.logoSvg} aria-hidden="true">
              <polyline points="6,20 54,10" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round" />
              <polyline points="6,32 54,58" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round" />
              <polyline points="54,32 6,58" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round" />
              <polyline points="6,70 54,80" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span className={baseClasses.title}>Cony</span>
            <span className={baseClasses.subtitle}>Interiores</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={baseClasses.nav}>
          <div className={baseClasses.navLabel}>Menu</div>
          {menuItems.map((item) => {
            const isDisabled = !authenticated && item.requiresAuth;

            if (isDisabled) {
              return (
                <div
                  key={item.path}
                  className={classNames(baseClasses.link({ isActive: false }), 'cursor-not-allowed opacity-40')}
                  aria-disabled="true"
                >
                  <item.icon className={baseClasses.icon} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={baseClasses.link}
                onClick={closeSidebar}
                aria-label={item.label}
              >
                <item.icon className={baseClasses.icon} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className={classNames(baseClasses.navLabel, 'mt-10')}>Configurações</div>
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

        {/* Footer - Ancorado no final com mt-auto */}
        <div className={baseClasses.footer}>
          <div className={baseClasses.avatar} aria-hidden="true">
            {(user?.first_name || 'C').slice(0, 1)}{(user?.last_name || 'O').slice(0, 1)}
          </div>
          <div className={baseClasses.footerInfo}>
            <div className={baseClasses.footerName}>{user?.full_name || user?.first_name || 'Visitante'}</div>
            <div className={baseClasses.footerRole}>{authenticated ? 'Área logada' : 'Acesso público'}</div>
          </div>
          {authenticated ? (
            <button
              className={baseClasses.logoutBtn}
              aria-label="Sair"
              onClick={async () => {
                await logout();
                navigate('/');
              }}
            >
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              className={baseClasses.loginBtn}
              onClick={() => navigate('/login')}
            >
              Entrar
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;