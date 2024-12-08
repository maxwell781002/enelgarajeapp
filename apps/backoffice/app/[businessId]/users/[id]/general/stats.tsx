import { StatCard } from "./stat";
import { Package, ShoppingCart, Users } from "lucide-react";

export default function Stats() {
  return (
    <div className="grid gap-2 grid-cols-3">
      <StatCard
        title="Total Orders"
        value={125}
        icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Products"
        value={42}
        icon={<Package className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Customers"
        value={1234}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
