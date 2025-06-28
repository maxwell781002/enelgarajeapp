import { CompleteBusiness } from "@repo/model/zod/business";
import { getCurrentUser } from "@repo/model/repository/user";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";
import SearchBar from "./search";
import Menu from "./menu";
import Link from "next/link";
import ShoppingCartHeader from "@repo/ui/components/shop-cart/shopping-cart-header";
import User from "@repo/ui/components/user";
import { allCategories } from "@repo/model/repository/category";

export async function Header({
  business,
  locale,
  logo,
}: {
  business: CompleteBusiness;
  locale: string;
  logo: string;
}) {
  const user = await getCurrentUser();
  const categories = await allCategories(business.id);
  return (
    <header
      className={cn(
        "mb-4 header z-30 sticky top-0 transition-shadow duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-sm",
      )}
    >
      <nav className="navbar flex-wrap container">
        <div className="order-1 flex items-center justify-between space-x-7 lg:space-x-14">
          <Link href="/" className="flex gap-1 justify-center">
            <Image src={logo} alt="logo" width={50} height={50} />
            <h1 className="h6 flex items-center">{business.name}</h1>
          </Link>
          <div className="relative z-40 hidden md:block">
            <Menu business={business} locale={locale} user={user} />
          </div>
        </div>
        <div className="max-lg:mt-4 w-full lg:w-[45%] xl:w-[60%] lg:order-2 order-3">
          <SearchBar locale={locale} categories={categories} />
        </div>
        <div className="order-2 lg:order-3 ml-auto flex items-center lg:ml-0">
          <ShoppingCartHeader className="relative" />
          <div className="ml-4 md:ml-6">
            <User user={user} onlyIcon size="h-8 w-8" />
          </div>
          <div className="relative z-40 block md:hidden ml-6">
            <Menu business={business} locale={locale} user={user} isMobile />
          </div>
        </div>
      </nav>
    </header>
  );
}
