import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { StatCard } from "./stat";
import { Package, ShoppingCart, Users } from "lucide-react";

interface UserProfileProps {
  name: string;
  phone: string;
  image: string;
  orders: number;
  products: number;
  customers: number;
}

export default function UserProfile({
  name,
  phone,
  image,
  orders,
  products,
  customers,
}: UserProfileProps) {
  return (
    <div>
      <div className="space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Image
              src={image}
              alt={name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-gray-500">{phone}</p>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-2 grid-cols-3">
          <StatCard
            title="Total Orders"
            value={orders}
            icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Products"
            value={products}
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Customers"
            value={customers}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </div>
  );
}
