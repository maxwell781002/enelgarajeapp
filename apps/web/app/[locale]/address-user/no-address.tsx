import { Card, CardContent, CardFooter } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export type NoAddressProps = {
  newLink: string;
};

export default async function NoAddress({ newLink }: NoAddressProps) {
  const t = await getTranslations("Address");
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6 pb-4 text-center">
        <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-semibold mb-2">{t("noAddress")}</h2>
        <p className="text-muted-foreground">{t("noAddressDescription")}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href={newLink}>{t("addNewAddress")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
