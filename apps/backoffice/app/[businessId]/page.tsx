import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Edit, Globe, Phone } from "lucide-react";
import { businessRepository } from "@repo/model/repositories/business";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";

export default async function BusinessPage({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const business = await businessRepository.getById(businessId);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-1">
            <div>
              <CardTitle>{business.name}</CardTitle>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href={`/${businessId}/business`}>
                <Button variant="outline" size="icon" className="w-10 h-10">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span>{business.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <a
              href={`https://${business.slug}`}
              className="text-blue-600 hover:underline"
            >
              {business.slug}
            </a>
          </div>
          <p className="text-muted-foreground">{business.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
