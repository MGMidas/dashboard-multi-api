import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { section: 'OVERVIEW', links: [
    { to: '/dashboard', label: 'Dashboard' },
  ]},
  { section: 'SOURCES', links: [
    { to: '/connections', label: 'GitHub' },
    { to: '/connections', label: 'Steam' },
  ]},
];

function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-[240px] shrink-0 h-screen sticky top-0 border-r border-white/[0.08] bg-[#09090B]">
      <div className="px-5 py-5 border-b border-white/[0.08]">
        <span className="text-[15px] font-semibold tracking-tight text-[#FAFAFA]">
          Midas
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navItems.map((group) => (
          <div key={group.section} className="mb-6">
            <p className="px-2 mb-2 text-[11px] font-medium tracking-wider text-[#A1A1AA]/70">
              {group.section}
            </p>
            <div className="space-y-0.5">
              {group.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`block px-2 py-1.5 rounded-md text-sm transition-colors duration-150 ${
                    location.pathname === link.to
                      ? 'bg-white/[0.06] text-[#FAFAFA]'
                      : 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-6">
          <p className="px-2 mb-2 text-[11px] font-medium tracking-wider text-[#A1A1AA]/70">
            SETTINGS
          </p>
          <div className="space-y-0.5">
            <span className="block px-2 py-1.5 rounded-md text-sm text-[#A1A1AA]/50 cursor-not-allowed">
              Settings
            </span>
          </div>
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between px-2">
          <div className="min-w-0">
            <p className="text-sm text-[#FAFAFA] truncate">{user?.email}</p>
            <p className="text-xs text-[#22C55E] flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              Connecté
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-3 w-full text-left px-2 py-1.5 rounded-md text-sm text-[#A1A1AA] hover:text-[#EF4444] hover:bg-white/[0.04] transition-colors duration-150"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;