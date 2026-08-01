import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

const Alert = ({ 
  type = 'info', 
  title, 
  message, 
  onClose, 
  className = '' 
}) => {
  const variants = {
    success: {
      bg: 'bg-success/10',
      border: 'border-success/20',
      icon: CheckCircle,
      iconColor: 'text-success',
      textColor: 'text-success',
      titleColor: 'text-primary',
    },
    error: {
      bg: 'bg-danger/10',
      border: 'border-danger/20',
      icon: AlertCircle,
      iconColor: 'text-danger',
      textColor: 'text-danger',
      titleColor: 'text-primary',
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      icon: AlertTriangle,
      iconColor: 'text-warning',
      textColor: 'text-warning',
      titleColor: 'text-primary',
    },
    info: {
      bg: 'bg-info/10',
      border: 'border-info/20',
      icon: Info,
      iconColor: 'text-info',
      textColor: 'text-info',
      titleColor: 'text-primary',
    },
  };

  const variant = variants[type] || variants.info;
  const Icon = variant.icon;

  return (
    <div className={`${variant.bg} ${variant.border} border rounded-md p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/65">
            <Icon className={`h-5 w-5 ${variant.iconColor}`} aria-hidden="true" />
          </div>
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-semibold ${variant.titleColor}`}>
              {title}
            </h3>
          )}
          {message && (
            <div className={`text-sm ${variant.textColor} ${title ? 'mt-1' : ''}`}>
              {typeof message === 'string' ? message : message}
            </div>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={`ml-auto flex-shrink-0 ${variant.textColor} hover:opacity-75`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
