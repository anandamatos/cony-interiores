import classNames from 'classnames';

const Footer = ({ className, ...props }) => {
  const currentYear = new Date().getFullYear();

  const baseClasses = {
    container: classNames(
      'py-10 px-4 sm:px-6 lg:px-10',
      className
    ),
    inner: 'max-w-7xl mx-auto rounded-md border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,245,240,1))] p-6 sm:p-8 flex flex-col lg:flex-row items-start justify-between gap-6 shadow-sm',
    copyright: 'text-sm text-taupe font-secondary max-w-md',
    links: 'flex items-start gap-6 flex-wrap justify-start',
    link: classNames(
      'text-sm text-taupe hover:text-primary',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded'
    ),
    title: 'font-primary text-lg font-semibold text-primary',
    group: 'flex flex-col gap-3',
  };

  return (
    <footer className={baseClasses.container} role="contentinfo" {...props}>
      <div className={baseClasses.inner}>
        <div className={baseClasses.group}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.98)] border border-gold/40 font-display text-[10px] uppercase tracking-[0.15em] text-primary">
            Encerramento
          </div>
          <div className={baseClasses.title}>Base visual e textual para evolução do Design System Cony.</div>
          <div className={baseClasses.copyright}>
            © {currentYear} Cony Interiores. Tokens, componentes e copy pensados para manter a operação elegante, clara e consistente.
          </div>
        </div>

        <div className={baseClasses.links}>
          <div className={baseClasses.group}>
            <div className={baseClasses.title}>Núcleos do DS</div>
            <button type="button" className={baseClasses.link}>Marca e voz visual</button>
            <button type="button" className={baseClasses.link}>Tokens oficiais</button>
            <button type="button" className={baseClasses.link}>Biblioteca de componentes</button>
            <button type="button" className={baseClasses.link}>Shell responsivo</button>
          </div>
          <div className={baseClasses.group}>
            <div className={baseClasses.title}>Recados de uso</div>
            <span className="text-sm text-taupe">Usar tokens oficiais antes de criar variações.</span>
            <span className="text-sm text-taupe">Manter textos e rótulos coerentes com o dashboard.</span>
            <span className="text-sm text-taupe">Priorizar clareza, sofisticação e conforto visual.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;