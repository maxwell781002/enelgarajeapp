import { Map } from "@repo/ui/components/Map/index";

export default async function Page() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <Map
          height={300}
          point={[23.102639551820147, -82.37307390774875]}
          // point={location?.coordinates}
          zoom={17}
          // onChange={() => {}}
        />
      </div>
      <div className="bg-background px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-4">
            <div>
              <h2 className="text-2xl font-bold">Vercel HQ</h2>
              <p className="text-muted-foreground">85 2nd St, San Francisco, CA 94105</p>
            </div>
            <div>
              <p className="text-muted-foreground">
                To arrive at Vercel HQ, head to 85 2nd St in San Francisco. The office is located in the SoMa district,
                just a short walk from the Montgomery BART station. Look for the Vercel logo on the building and enter
                through the main entrance on 2nd Street. Visitor parking is available in the nearby public garages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
