import { Link, useLocation } from 'react-router-dom';

function MobileNav() {
  const location = useLocation();

  const items = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/connections', label: 'Connexions' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/[0.08] bg-[#09090B]/95 backdrop-blur z-20">
      <div className="flex">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex-1 text-center py-3 text-sm transition-colors duration-150 ${
              location.pathname === item.to
                ? 'text-[#FAFAFA]'
                : 'text-[#A1A1AA]'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default MobileNav;