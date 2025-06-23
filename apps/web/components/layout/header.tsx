import { CompleteBusiness } from "@repo/model/zod/business";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@repo/model/repository/user";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";
import SearchBar from "./search";
import Menu from "./menu";
import Link from "next/link";
import ShoppingCartHeader from "@repo/ui/components/shop-cart/shopping-cart-header";
import User from "@repo/ui/components/user";

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
  const t = await getTranslations("Header");
  return (
    <header
      className={cn("header z-30 sticky top-0 transition-shadow duration-300")}
    >
      <nav className="navbar flex-wrap container">
        <div className="order-1 flex items-center justify-between space-x-7 lg:space-x-14">
          <Link href="/">
            <Image src={logo} alt="logo" width={50} height={50} />
          </Link>
          <div className="relative z-40 hidden md:block">
            <Menu business={business} locale={locale} user={user} />
          </div>
        </div>
        <div className="max-lg:mt-4 w-full lg:w-[45%] xl:w-[60%] lg:order-2 order-3">
          <SearchBar locale={locale} />
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
