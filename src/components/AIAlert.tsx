
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface AIAlertProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type: 'mic' | 'camera';
}

const AIAlert: React.FC<AIAlertProps> = ({ 
  message, 
  isVisible, 
  onClose,
  type
}) => {
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    if (isVisible) {
      setProgress(100);
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 50); // 5 seconds total (100 * 50ms)
      
      return () => clearInterval(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-card border border-border shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 flex items-start gap-3">
              <div className={`shrink-0 rounded-full p-2 ${type === 'mic' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300' : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'}`}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">AI Detection Alert</h3>
                <p className="text-muted-foreground text-sm mt-1">{message}</p>
              </div>
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="h-1 bg-muted">
              <div 
                className={`h-full ${type === 'mic' ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIAlert;
