import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-700">Início</Link>
          <Link to="/about" className="hover:text-gray-700">Sobre</Link>
          <Link to="/contact" className="hover:text-gray-700">Contato</Link>
        </div>
        <div className="mt-2 sm:mt-0">
          <span>© 2024 Cony Interiores. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
