import { useState, useEffect } from 'react';
import { Search, Bell, HelpCircle, User, Plus, BarChart3 } from 'lucide-react';
import classNames from 'classnames';
import Button from '../../atoms/Button';

const Header = ({ onSearch, notificationCount = 3 }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseClasses = {
    container: classNames(
      'sticky top-0 z-30',
      'h-16',
      'flex items-center justify-between px-4 sm:px-6',
      'transition-all duration-300 ease-spring',
      'border-b border-[rgba(75,58,46,0.08)]',
      // Glass effect que intensifica com scroll
      isScrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-sm'
        : 'bg-white/70 backdrop-blur-md'
    ),
    left: 'flex items-center gap-3 flex-1 min-w-0',
    title: 'text-sm font-semibold text-primary hidden sm:block',
    titleSpan: 'text-taupe font-normal',
    searchWrapper: 'relative flex-1 max-w-md ml-4',
    searchIcon: 'absolute left-3 top-1/2 -translate-y-1/2 text-taupe',
    searchInput: classNames(
      'w-full pl-10 pr-4 py-2 rounded-full',
      'transition-all duration-200 ease-spring',
      'focus:outline-none focus:ring-2 focus:ring-primary/20',
      isScrolled
        ? 'bg-white/90 border-primary/20 focus:bg-white'
        : 'bg-offWhite/80 backdrop-blur-sm border-transparent focus:bg-white'
    ),
    right: 'flex items-center gap-2 sm:gap-4 ml-4',
    iconBtn: classNames(
      'p-2 rounded-full',
      'transition-all duration-200 ease-spring',
      'relative focus:outline-none focus:ring-2 focus:ring-primary/20',
      isScrolled
        ? 'text-primary hover:bg-primary/10'
        : 'text-taupe hover:text-primary hover:bg-offWhite/50'
    ),
    dot: 'absolute top-2 right-2 w-2.5 h-2.5 bg-terracota rounded-full border-2 border-white animate-pulse',
    user: 'flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray',
    avatar: classNames(
      'w-9 h-9 rounded-full',
      'bg-gradient-primary text-white',
      'flex items-center justify-center font-semibold text-sm',
      'transition-all duration-200 ease-spring',
      'hover:scale-105 hover:shadow-md'
    ),
    userName: 'text-sm font-semibold text-primary hidden sm:block',
    divider: 'w-px h-6 bg-gray mx-2',
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

        <button
          className={baseClasses.iconBtn}
          aria-label="Ajuda"
        >
          <HelpCircle size={20} />
        </button>

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