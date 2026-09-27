import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import GithubWidget from '../components/widgets/GithubWidget';
import SteamWidget from '../components/widgets/SteamWidget';

function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#FAFAFA] tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-[#A1A1AA] mt-1">
          Bienvenue, {user?.email}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <StatCard label="Connected services" value="2" sublabel="GitHub, Steam" />
        <StatCard label="Data points" value="10" sublabel="Repos + jeux" />
        <StatCard label="System status" value="OK" sublabel="Opérationnel" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <GithubWidget />
        <SteamWidget />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;