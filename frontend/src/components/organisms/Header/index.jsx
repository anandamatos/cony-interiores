import { Search, Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 flex-shrink-0 pl-14 sm:pl-16 lg:pl-6">
      {/* Left: Search - Escondido em mobile, visível em tablet+ */}
      <div className="hidden sm:block flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors duration-200"
          />
        </div>
      </div>

      {/* Mobile: ícone de busca */}
      <button className="sm:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
        <Search className="w-5 h-5 text-text-secondary" />
      </button>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 relative">
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="hidden sm:inline text-sm font-medium text-text-primary">Ana</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
