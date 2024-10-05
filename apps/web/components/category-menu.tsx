"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/ui/carousel";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { useState } from "react";

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
  "Beauty",
  "Automotive",
  "Jewelry",
  "Food & Grocery",
];

export default function Component() {
  const [activeCategory, setActiveCategory] = useState("Food & Grocery");

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
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 pt-0 basis-1/1 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 h-10"
              >
                <Link
                  href={"#"}
                  className={cn(
                    "text-gray-500 px-5 pb-2 text-center relative top-1.5 text-ellipsis overflow-hidden whitespace-nowrap",
                    activeCategory === category &&
                      "text-primary border-solid border-b-2 border-gray-500",
                  )}
                >
                  {category}
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="top-5" />
          <CarouselNext className="top-5" />
        </Carousel>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xl font-semibold">{activeCategory}</p>
      </div>
    </>
  );
}
