import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';

const QuickCreateModal = ({
  open,
  title,
  description,
  onClose,
  children,
  actions,
}) => {
  useEffect(() => {
    if (!open) return undefined;

    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto overscroll-contain bg-[rgba(28,20,16,0.56)] px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-[2px] sm:items-center sm:px-4 sm:py-8" role="dialog" aria-modal="true" aria-label={title}>
      <Card className="flex max-h-[calc(100svh-1.5rem-env(safe-area-inset-bottom))] w-full max-w-2xl flex-col overflow-hidden border border-[rgba(75,58,46,0.18)] bg-offWhite p-0 shadow-[0_30px_60px_rgba(26,20,16,0.28)] sm:max-h-[90vh]">
        <header className="flex items-start justify-between gap-4 border-b border-[rgba(75,58,46,0.08)] px-6 py-5">
          <div>
            <Typography variant="h3" className="text-primary">{title}</Typography>
            {description ? (
              <Typography variant="body2" className="mt-1 text-taupe">{description}</Typography>
            ) : null}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="!px-3 !py-2"
            onClick={onClose}
            ariaLabel="Fechar modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>

        <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-[rgba(75,58,46,0.08)] px-6 py-4">
          {actions}
        </footer>
      </Card>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default QuickCreateModal;
