import { getCurrentBusiness } from "@repo/model/repository/business";
import { Map } from "@repo/ui/components/Map/index";
import { LatLngTuple } from "leaflet";

export default async function Page() {
  const business = await getCurrentBusiness();
  if (!business) return <></>;
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <Map
          height={300}
          point={business.coordinates as LatLngTuple}
          zoom={14}
        />
      </div>
      <div className="bg-background px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-4">
            <div>
              <h2 className="text-2xl font-bold">Vercel HQ</h2>
              <p className="text-muted-foreground">{business.address}</p>
            </div>
            <div>
              <p className="text-muted-foreground">{business.howToArrive}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
