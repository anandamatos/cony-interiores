import { Search, Bell } from 'lucide-react';
import classNames from 'classnames';

const Header = ({ onSearch, notificationCount = 3 }) => {
  const baseClasses = {
    container: classNames(
      'fixed top-0 left-0 right-0 lg:left-64 z-20 h-16',
      'bg-[rgba(255,255,255,0.78)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[rgba(255,255,255,0.68)]',
      'border-b border-[rgba(75,58,46,0.10)]',
      'shadow-header',
      'flex items-center justify-between pl-20 pr-3 sm:pl-24 sm:pr-4 lg:px-6',
      'flex-shrink-0'
    ),
    left: 'flex items-center gap-2 sm:gap-3 flex-1 min-w-0',
    title: 'text-sm font-semibold text-primary hidden md:block whitespace-nowrap',
    titleSpan: 'text-taupe font-normal',
    searchWrapper: 'relative flex-1 min-w-[120px] sm:min-w-[160px] md:min-w-[220px] max-w-[520px] ml-2 sm:ml-3 md:ml-4',
    searchIcon: 'absolute left-3 top-1/2 -translate-y-1/2 text-taupe',
    searchInput: classNames(
      'w-full pl-10 pr-4 py-2 rounded-pill',
      'bg-offWhite border border-transparent',
      'text-primary placeholder-taupe',
      'transition-all duration-fast ease-spring',
      'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
      'focus:bg-white'
    ),
    right: 'flex items-center gap-2 sm:gap-3 md:gap-4 ml-2 sm:ml-3',
    iconBtn: classNames(
      'p-2 rounded-full',
      'text-taupe hover:text-primary hover:bg-offWhite',
      'transition-all duration-fast ease-spring',
      'relative focus:outline-none focus:ring-2 focus:ring-primary/20'
    ),
    dot: 'absolute top-2 right-2 w-2.5 h-2.5 bg-terracota rounded-full border-2 border-white',
    divider: 'hidden sm:block h-8 w-px bg-border',
    user: 'flex items-center gap-2 sm:gap-3 pl-0 sm:pl-1',
    avatar: classNames(
      'w-9 h-9 rounded-full',
      'bg-gradient-primary text-white',
      'flex items-center justify-center font-semibold text-sm',
      'transition-all duration-fast ease-spring',
      'hover:scale-105 hover:shadow-md'
    ),
    userName: 'text-sm font-semibold text-primary hidden sm:block',
  };

  return (
    <header className={baseClasses.container} role="banner">
      {/* Left */}
      <div className={baseClasses.left}>
        <div className={baseClasses.title}>
          Dashboard <span className={baseClasses.titleSpan}>/ Visão Geral</span>
        </div>

        <div className={baseClasses.searchWrapper}>
          <Search className={baseClasses.searchIcon} size={18} aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar serviços, costureiras..."
            className={baseClasses.searchInput}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            aria-label="Buscar"
          />
        </div>
      </div>

      {/* Right */}
      <div className={baseClasses.right}>
        <button
          className={baseClasses.iconBtn}
          aria-label={`Notificações (${notificationCount} não lidas)`}
        >
          <Bell size={20} />
          {notificationCount > 0 && <span className={baseClasses.dot} />}
        </button>

        <span className={baseClasses.divider} aria-hidden="true" />

        <div className={baseClasses.user}>
          <div className={baseClasses.avatar} aria-hidden="true">
            AM
          </div>
          <span className={baseClasses.userName}>Ana</span>
        </div>
      </div>
    </header>
  );
};

export default Header;