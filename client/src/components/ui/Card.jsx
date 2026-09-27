function Card({ children, className = '', hoverable = false }) {
  return (
    <div
      className={`bg-[#111114] border border-white/[0.08] rounded-xl p-5 ${
        hoverable ? 'hover:border-white/[0.14] transition-colors duration-150' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;