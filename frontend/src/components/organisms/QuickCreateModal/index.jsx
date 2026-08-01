import { useEffect } from 'react';
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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(28,20,16,0.56)] px-4 py-8 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label={title}>
      <Card className="max-h-[90vh] w-full max-w-2xl overflow-hidden border border-[rgba(75,58,46,0.18)] bg-offWhite p-0 shadow-[0_30px_60px_rgba(26,20,16,0.28)]">
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

        <div className="max-h-[calc(90vh-150px)] overflow-y-auto px-6 py-5">{children}</div>

        <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-[rgba(75,58,46,0.08)] px-6 py-4">
          {actions}
        </footer>
      </Card>
    </div>
  );
};

export default QuickCreateModal;
