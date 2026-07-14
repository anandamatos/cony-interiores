import classNames from 'classnames';

const Footer = ({ className, ...props }) => {
  const currentYear = new Date().getFullYear();

  const baseClasses = {
    container: classNames(
      'bg-white border-t border-gray',
      'py-6 px-4 sm:px-6',
      className
    ),
    inner: 'max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4',
    copyright: 'text-sm text-taupe font-secondary',
    links: 'flex items-center gap-6 flex-wrap justify-center',
    link: classNames(
      'text-sm text-taupe hover:text-primary',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded'
    ),
  };

  return (
    <footer className={baseClasses.container} role="contentinfo" {...props}>
      <div className={baseClasses.inner}>
        <div className={baseClasses.copyright}>
          © {currentYear} Cony Interiores. Todos os direitos reservados.
        </div>
        <div className={baseClasses.links}>
          <a href="#" className={baseClasses.link}>Termos de Uso</a>
          <a href="#" className={baseClasses.link}>Política de Privacidade</a>
          <a href="#" className={baseClasses.link}>Contato</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;