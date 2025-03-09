'use client';

import { useToast } from './use-toast';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Toaster() {
  const { toasts, removeToast } = useToast();
  
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

interface ToastProps {
  toast: {
    id: string;
    title: string;
    description?: string;
    variant?: 'default' | 'destructive' | 'success';
  };
  onClose: () => void;
}

function Toast({ toast, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation
    const enterTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(enterTimeout);
  }, []);
  
  const getIcon = () => {
    switch (toast.variant) {
      case 'destructive':
        return <AlertCircle className="h-5 w-5 text-error" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return <Info className="h-5 w-5 text-info" />;
    }
  };
  
  const getClasses = () => {
    const baseClasses = "p-4 rounded-lg shadow-lg border flex gap-3 transform transition-all duration-300 ease-in-out";
    const visibilityClasses = isVisible 
      ? "translate-x-0 opacity-100" 
      : "translate-x-full opacity-0";
    
    switch (toast.variant) {
      case 'destructive':
        return `${baseClasses} ${visibilityClasses} bg-error/10 border-error/20 text-error-content`;
      case 'success':
        return `${baseClasses} ${visibilityClasses} bg-success/10 border-success/20 text-success-content`;
      default:
        return `${baseClasses} ${visibilityClasses} bg-base-100 border-base-300`;
    }
  };
  
  return (
    <div className={getClasses()}>
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{toast.title}</h3>
        {toast.description && (
          <p className="text-sm opacity-90">{toast.description}</p>
        )}
      </div>
      <button 
        onClick={onClose}
        className="flex-shrink-0 rounded-full p-1 hover:bg-base-300/20"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
