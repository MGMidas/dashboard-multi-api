function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium px-4 py-2 transition-colors duration-150';

  const variants = {
    primary: 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white',
    secondary: 'bg-white/5 hover:bg-white/10 text-[#FAFAFA] border border-white/10',
    ghost: 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5',
    danger: 'bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444]',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;