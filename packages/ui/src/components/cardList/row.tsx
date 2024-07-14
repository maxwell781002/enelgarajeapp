export function Row({ name, children }: { name: string, children: React.ReactNode }) {
  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <h2 className="mb-8 text-2xl font-bold md:text-3xl">
        {name}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
  )
}