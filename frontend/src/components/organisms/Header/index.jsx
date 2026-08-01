import { Search, Bell } from 'lucide-react';
import classNames from 'classnames';
import { useAuth } from '../../../context/AuthContext';
import { useSearch } from '../../../context/SearchContext';

const Header = ({ notificationCount = 3 }) => {
  const { query, setQuery } = useSearch();
  const { user } = useAuth();
  const displayName = user?.first_name || user?.full_name || 'Visitante';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const baseClasses = {
    container: classNames(
      'fixed top-0 left-0 right-0 lg:left-[270px] z-20 h-[88px]',
      'bg-white/85 border-b border-border',
      'transition-all duration-normal ease-in-out',
      'flex items-center justify-between pl-20 pr-3 sm:pl-24 sm:pr-4 lg:px-10',
      'flex-shrink-0'
    ),
    left: 'flex items-center gap-4 flex-1 min-w-0',
    title: 'text-sm font-semibold text-primary hidden md:block whitespace-nowrap',
    titleSpan: 'text-taupe font-light',
    searchWrapper: 'relative flex-1 min-w-[120px] sm:min-w-[180px] md:min-w-[260px] max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] ml-2 sm:ml-3 md:ml-4',
    searchIcon: 'absolute left-4 top-1/2 -translate-y-1/2 text-taupe/60',
    searchInput: classNames(
      'w-full pl-10 pr-5 py-2 rounded-md',
      'bg-offWhite border border-transparent',
      'text-primary placeholder-taupe',
      'transition-all duration-fast ease-spring',
      'focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20',
      'focus:bg-offWhite hover:scale-[1.01]'
    ),
    right: 'flex items-center gap-3 sm:gap-4 md:gap-5 ml-2 sm:ml-3',
    iconBtn: classNames(
      'p-2 rounded-full',
      'text-primary/60 hover:text-primary hover:bg-offWhite',
      'transition-all duration-fast ease-spring',
      'relative focus:outline-none focus:ring-2 focus:ring-primary/20'
    ),
    dot: 'absolute top-1.5 right-1.5 w-2 h-2 bg-terracota rounded-full border-2 border-white',
    divider: 'hidden sm:block h-8 w-px bg-border',
    user: 'flex items-center gap-2 sm:gap-3 pl-4 border-l border-border',
    avatar: classNames(
      'w-10 h-10 rounded-full',
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
            {initials || 'CO'}
          </div>
          <span className={baseClasses.userName}>{displayName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;