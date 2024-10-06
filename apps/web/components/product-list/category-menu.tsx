import { CompleteCategory } from "@repo/model/zod/category";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/ui/carousel";
import { cn } from "@repo/ui/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export type CategoryMenuProps = {
  items: CompleteCategory[];
  active?: CompleteCategory;
};

const Item = ({
  text,
  url,
  active,
}: {
  text: string;
  url: string;
  active?: boolean;
}) => {
  return (
    <CarouselItem className="pl-2 md:pl-4 pt-0 basis-1/1 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 h-10">
      <Link
        href={url}
        className={cn(
          "text-gray-500 px-5 pb-2 text-center relative top-1.5 text-ellipsis overflow-hidden whitespace-nowrap",
          active && "text-primary border-solid border-b-2 border-gray-500",
        )}
      >
        {text}
      </Link>
    </CarouselItem>
  );
};

export default async function Component({ items, active }: CategoryMenuProps) {
  const t = await getTranslations("Header");
  return (
    <>
      <div className="w-full mx-auto px-10 md:px-4 shadow-lg bg-gray-100 rounded">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <Item text={t("AllCategory")} url={"/"} active={!active} />
            {items.map((category, index) => (
              <Item
                key={index}
                text={category.name}
                url={`/c/${category.slug}`}
                active={active?.slug === category.slug}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious className="top-5" />
          <CarouselNext className="top-5" />
        </Carousel>
      </div>
      {active && (
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold">{active.name}</p>
        </div>
      )}
    </>
  );
}
