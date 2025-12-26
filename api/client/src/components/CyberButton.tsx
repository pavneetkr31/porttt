import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  isLoading?: boolean;
}

export function CyberButton({ 
  children, 
  className, 
  variant = 'primary', 
  isLoading,
  disabled,
  ...props 
}: CyberButtonProps) {
  const baseStyles = "relative px-8 py-3 font-mono font-bold uppercase tracking-widest transition-all duration-200 clip-path-polygon group overflow-hidden";
  
  const variants = {
    primary: "text-primary border border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]",
    secondary: "text-secondary border border-secondary hover:bg-secondary/10 hover:shadow-[0_0_20px_rgba(255,0,255,0.4)]",
    accent: "text-accent border border-accent hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], "disabled:opacity-50 disabled:cursor-not-allowed", className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </span>
      
      {/* Glitch effects on hover */}
      <span className="absolute inset-0 bg-current opacity-0 group-hover:opacity-5 transition-opacity" />
      
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />
    </motion.button>
  );
}
