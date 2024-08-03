import Link from "next/link";
import z from "zod";
import { BusinessModel } from "@repo/model/zod/business";
import { getCurrentOrder } from "@repo/model/repository/order";

export async function Header({
  business,
}: {
  business: z.infer<typeof BusinessModel>;
}) {
  const order = await getCurrentOrder();
  console.log("Order ==> ", order);
  return (
    <header className="bg-primary text-primary-foreground py-8 md:py-12 lg:py-16">
      <div className="container flex flex-col items-center gap-4">
        <Link href={`/${business.slug}`} prefetch={false}>
          <HandPlatterIcon className="h-20 w-20" />
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {business.name}
          </h1>
        </div>
        <ul className="flex gap-4">
          <li>
            <Link href={`/${business.slug}/about-us`} prefetch={false}>
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link href={`/${business.slug}/shopping-cart`} prefetch={false}>
              Shop Cart
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

function HandPlatterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3V2" />
      <path d="M5 10a7.1 7.1 0 0 1 14 0" />
      <path d="M4 10h16" />
      <path d="M2 14h12a2 2 0 1 1 0 4h-2" />
      <path d="m15.4 17.4 3.2-2.8a2 2 0 0 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2L5 18" />
      <path d="M5 14v7H2" />
    </svg>
  );
}
