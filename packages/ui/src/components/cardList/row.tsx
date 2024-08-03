export function Row({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pb-8">
      <h2 className="mb-8 text-2xl font-bold md:text-3xl">{name}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
