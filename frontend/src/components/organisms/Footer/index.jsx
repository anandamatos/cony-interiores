const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            © 2024 Cony Interiores. Todos os direitos reservados.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
            Termos de Uso
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
            Política de Privacidade
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;