interface StatCardProps {
  title: string;
  value: number | React.ReactNode;
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{title}</div>
    </div>
  );
}
