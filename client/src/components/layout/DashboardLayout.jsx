import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#09090B] flex">
      <Sidebar />

      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-8">
          {children}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

export default DashboardLayout;