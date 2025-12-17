import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading,
  className = '',
  disabled,
  ...props 
}) => {
  // Base style: Solid 2px border, hard shadow transform on hover
  const baseStyle = "font-sans font-bold rounded-xl border-2 border-ink transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 tracking-wide";
  
  const variants = {
    primary: "bg-primary text-white shadow-hard hover:bg-[#4A7C85]",
    secondary: "bg-secondary text-white shadow-hard hover:bg-[#A65D54]",
    accent: "bg-accent text-ink shadow-hard hover:bg-[#D4B05F]",
    outline: "bg-transparent text-ink shadow-hard hover:bg-ink/5",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : children}
    </button>
  );
};