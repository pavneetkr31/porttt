import React from 'react';
import { cn } from '@/lib/utils';

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function CyberInput({ label, className, ...props }: CyberInputProps) {
  return (
    <div className="relative group">
      <input
        className={cn(
          "w-full bg-background/50 border-b-2 border-muted px-4 py-3 text-lg font-mono outline-none transition-all duration-300",
          "focus:border-primary focus:bg-primary/5",
          "placeholder:text-transparent",
          className
        )}
        placeholder={label}
        {...props}
      />
      <label className="absolute left-4 top-3 text-muted-foreground pointer-events-none transition-all duration-300 transform origin-left 
        group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:text-primary
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        -translate-y-6 scale-75 text-primary
      ">
        {label}
      </label>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-focus-within:w-full group-focus-within:shadow-[0_0_10px_theme('colors.primary.DEFAULT')]" />
    </div>
  );
}

interface CyberTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function CyberTextarea({ label, className, ...props }: CyberTextareaProps) {
  return (
    <div className="relative group">
      <textarea
        className={cn(
          "w-full bg-background/50 border-b-2 border-muted px-4 py-3 text-lg font-mono outline-none transition-all duration-300 resize-none min-h-[120px]",
          "focus:border-primary focus:bg-primary/5",
          "placeholder:text-transparent",
          className
        )}
        placeholder={label}
        {...props}
      />
      <label className="absolute left-4 top-3 text-muted-foreground pointer-events-none transition-all duration-300 transform origin-left 
        group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:text-primary
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        -translate-y-6 scale-75 text-primary
      ">
        {label}
      </label>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-focus-within:w-full group-focus-within:shadow-[0_0_10px_theme('colors.primary.DEFAULT')]" />
    </div>
  );
}
