import Card from './Card';

function StatCard({ label, value, sublabel }) {
  return (
    <Card className="!p-4">
      <p className="text-xs text-[#A1A1AA] mb-2">{label}</p>
      <p className="text-2xl font-semibold text-[#FAFAFA] tracking-tight">{value}</p>
      {sublabel && <p className="text-xs text-[#A1A1AA] mt-1">{sublabel}</p>}
    </Card>
  );
}

export default StatCard;