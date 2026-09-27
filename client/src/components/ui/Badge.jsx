function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-white/5 text-[#A1A1AA]',
    success: 'bg-[#22C55E]/10 text-[#22C55E]',
    warning: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    error: 'bg-[#EF4444]/10 text-[#EF4444]',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md ${variants[variant]}`}>
      {children}
    </span>
  );
}

export default Badge;