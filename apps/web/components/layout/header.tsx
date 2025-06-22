import Link from "next/link";
import { CompleteBusiness } from "@repo/model/zod/business";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@repo/ui/components/ui/sheet";
import { Button } from "@repo/ui/components/ui/button";
import SignInIcon, {
  MenuIcon,
  HomeIcon,
  InfoIcon,
  PackageIcon,
} from "@repo/ui/components/icons";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@repo/model/repository/user";
import { signOut } from "@repo/model/lib/auth";
import { Logout } from "./logout";
import { MapPinIcon } from "lucide-react";
import ShoppingCartHeader from "@repo/ui/components/shop-cart/shopping-cart-header";
import SwitchApp from "@repo/ui/components/switch-app";
import { ApplicationsNames } from "@repo/model/lib/applications-names";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";
import SearchBar from "./search";

const menu = {
  main: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Products",
      url: "/products",
    },
    {
      name: "Pages",
      url: "",
      hasChildren: true,
      children: [
        {
          name: "About",
          url: "/about",
        },
        {
          name: "Contact",
          url: "/contact",
        },
        {
          name: "404 Page",
          url: "/404",
        },
      ],
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ],
  footer: [
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Products",
      url: "/products",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ],
  footerCopyright: [
    {
      name: "Privacy & Policy",
      url: "/privacy-policy",
    },
    {
      name: "Terms of Service",
      url: "/terms-services",
    },
  ],
};
const isMenuItemActive = (url: string) => {
  const pathname: any = "window.location.pathname";
  if (url === "/") {
    return pathname === url ? "active" : "";
  }
  return pathname.startsWith(url) ? "active" : "";
};
const isParentActive = (children: any[]) => {
  return children.some((child) => isMenuItemActive(child.url));
};

const navigation_button = {
  enable: true,
  label: "Get Started",
  link: "https://github.com/themefisher/shopplate",
};

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
  const logoutAction = async () => {
    "use server";
    return signOut();
  };
  return (
    <header
      className={cn("header z-30 sticky top-0 transition-shadow duration-300")}
    >
      <nav className="navbar flex-wrap container">
        <div className="order-1 flex items-center justify-between space-x-7 lg:space-x-14">
          <Image src={logo} alt="logo" width={50} height={50} />
          <div className="relative z-40 hidden md:block">
            <label
              for="nav-toggle"
              className="order-3 cursor-pointer flex items-center text-text-dark dark:text-white lg:order-1"
            >
              <span className="mr-2 font-medium">Pages</span>
              <button id="nav-toggle" className="focus:outline-none">
                <svg
                  className="h-3 fill-current block menu-open"
                  viewBox="0 0 20 20"
                >
                  <title>Menu Open</title>
                  <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
                </svg>
                <svg
                  className="h-3 fill-current hidden menu-close"
                  viewBox="0 0 20 20"
                >
                  <title>Menu Close</title>
                  <polygon
                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                    transform="rotate(45 10 10)"
                  ></polygon>
                </svg>
              </button>
            </label>
            <div className="fixed top-0 left-0 h-full bg-black opacity-50 w-full hidden overlay"></div>
            <div className="fixed top-0 left-0 h-full bg-white dark:bg-darkmode-body overflow-y-auto w-full md:w-96 p-9 sidebar transform -translate-x-full transition-transform">
              <div className="flex justify-between items-center mb-14">
                <Image src={logo} alt="logo" width={50} height={50} />
                <button className="close-sidebar p-2">
                  <svg className="h-5 fill-current block" viewBox="0 0 20 20">
                    <title>Menu Close</title>
                    <polygon
                      points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                      transform="rotate(45 10 10)"
                    ></polygon>
                  </svg>
                </button>
              </div>
              <ul className="nav-list">
                {menu.main.map((menuItem) => (
                  <li
                    className={cn(
                      "nav-item",
                      menuItem.hasChildren && "has-children",
                    )}
                  >
                    {menuItem.hasChildren ? (
                      <>
                        <button
                          className={cn(
                            "nav-link w-full flex justify-between items-center",
                            "py-2 px-3",
                            isParentActive(menuItem.children) &&
                              "text-primary font-medium",
                          )}
                          data-submenu-toggle
                        >
                          {menuItem.name}
                          <svg
                            className="h-4 w-4 submenu-arrow transition-transform"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>

                        <ul className="submenu hidden pl-4 mt-2 space-y-2 bg-white dark:bg-dark rounded-md shadow py-4">
                          {menuItem.children.map((child) => (
                            <li>
                              <a
                                href={child.url}
                                className={cn(
                                  "nav-dropdown-link block",
                                  "py-2 px-3",
                                  isMenuItemActive(child.url) &&
                                    "text-primary font-medium",
                                )}
                              >
                                {child.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <a
                        href={menuItem.url}
                        className={cn(
                          "nav-link block",
                          "py-2 px-3 rounded-lg transition-colors",
                          isMenuItemActive(menuItem.url) &&
                            "text-primary font-medium",
                        )}
                      >
                        {menuItem.name}
                      </a>
                    )}
                  </li>
                ))}

                {navigation_button.enable && (
                  <li className="mt-4 inline-block lg:hidden mr-4 md:mr-6">
                    <a
                      className="btn btn-outline-primary btn-sm"
                      href={navigation_button.link}
                    >
                      {navigation_button.label}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="max-lg:mt-4 w-full lg:w-[45%] xl:w-[60%] lg:order-2 order-3">
          <SearchBar />
        </div>
        <div className="order-2 lg:order-3 ml-auto flex items-center lg:ml-0">
          {/* <ThemeSwitcher className="mr-4 md:mr-6" /> */}
          {/* <Cart /> */}

          <div className="ml-4 md:ml-6">
            {/* <NavUser pathname={Astro.url.pathname} client:load /> */}
          </div>

          <div className="relative z-40 block md:hidden ml-6">
            {/* Mobile menu toggle button */}
            <label
              for="nav-toggle-mobile"
              className="cursor-pointer flex items-center text-text-dark dark:text-white border border-border dark:border-border/40 p-1 rounded-md"
            >
              <button id="nav-toggle-mobile" className="focus:outline-none">
                <svg
                  className="h-5 fill-current block menu-open"
                  viewBox="0 0 20 20"
                >
                  <title>Menu Open</title>
                  <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
                </svg>
                <svg
                  className="h-5 fill-current hidden menu-close"
                  viewBox="0 0 20 20"
                >
                  <title>Menu Close</title>
                  <polygon
                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                    transform="rotate(45 10 10)"
                  ></polygon>
                </svg>
              </button>
            </label>

            {/* Mobile menu sidebar */}
            <div className="fixed top-0 left-0 h-full bg-black opacity-50 w-full hidden overlay"></div>
            <div className="fixed top-0 left-0 h-full bg-white dark:bg-darkmode-body overflow-y-auto w-full md:w-96 p-9 sidebar-mobile transform -translate-x-full transition-transform">
              {/* Same navigation list as desktop but for mobile */}
              <div className="flex justify-between items-center mb-14">
                {/* <Logo /> */}
                <button className="close-sidebar-mobile p-2">
                  <svg className="h-5 fill-current block" viewBox="0 0 20 20">
                    <title>Menu Close</title>
                    <polygon
                      points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                      transform="rotate(45 10 10)"
                    ></polygon>
                  </svg>
                </button>
              </div>
              <ul className="nav-list">
                {menu.main.map((menuItem) => (
                  <li
                    className={cn(
                      "nav-item",
                      menuItem.hasChildren && "has-children",
                    )}
                  >
                    {menuItem.hasChildren ? (
                      <>
                        <button
                          className={cn(
                            "nav-link w-full flex justify-between items-center",
                            "py-2 px-3 rounded-lg transition-colors",
                            isParentActive(menuItem.children) &&
                              "text-primary font-medium",
                          )}
                          data-submenu-toggle
                        >
                          {menuItem.name}
                          <svg
                            className="h-4 w-4 submenu-arrow transition-transform"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                        <ul className="submenu hidden pl-4 mt-2 space-y-2 bg-white dark:bg-dark rounded-md shadow py-4">
                          {menuItem.children.map((child) => (
                            <li>
                              <a
                                href={child.url}
                                className={cn(
                                  "nav-dropdown-link block",
                                  "py-2 px-3 rounded-lg transition-colors",
                                  isMenuItemActive(child.url) &&
                                    "text-primary font-medium",
                                )}
                              >
                                {child.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <a
                        href={menuItem.url}
                        className={cn(
                          "nav-link block",
                          "py-2 px-3rounded-lg transition-colors",
                          isMenuItemActive(menuItem.url) &&
                            "text-primary font-medium",
                        )}
                      >
                        {menuItem.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>

    // <header className="fixed top-0 left-0 right-0 z-50 flex h-14 w-full bg-background shadow-lg flex items-center justify-between bg-background px-4 py-3 shadow-xs">
    //   <Link
    //     href={`/${locale}`}
    //     className="flex items-center gap-2"
    //     prefetch={false}
    //   >
    //     <Image src={logo} alt="logo" width={50} height={50} />
    //     <span className="text-lg font-semibold">{business.name}</span>
    //   </Link>
    //   <Sheet>
    //     <SheetTrigger asChild>
    //       <Button variant="ghost" size="icon">
    //         <MenuIcon className="h-6 w-6 text-muted-foreground" />
    //       </Button>
    //     </SheetTrigger>
    //     <SheetContent side="right" className="w-64">
    //       <div className="grid gap-4 p-4">
    //         {!!user?.name && (
    //           <div className="border-b border-muted-foreground/10 pb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
    //             <img
    //               src={user.image as string}
    //               referrerPolicy="no-referrer"
    //               alt={"user name"}
    //               className="aspect-square rounded-md object-cover h-10 w-10"
    //             />
    //             {user?.name}
    //           </div>
    //         )}
    //         <Link
    //           href={`/${locale}`}
    //           className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
    //           prefetch={false}
    //         >
    //           <HomeIcon className="h-5 w-5" />
    //           {t("home")}
    //         </Link>
    //         <Link
    //           href={`/${locale}/about-us`}
    //           className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
    //           prefetch={false}
    //         >
    //           <InfoIcon className="h-5 w-5" />
    //           {t("about")}
    //         </Link>
    //         {!!user?.name && (
    //           <>
    //             <Link
    //               href={`/${locale}/order`}
    //               className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
    //               prefetch={false}
    //             >
    //               <PackageIcon className="h-5 w-5" />
    //               {t("order")}
    //             </Link>
    //             <Link
    //               href={`/${locale}/address-user`}
    //               className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
    //               prefetch={false}
    //             >
    //               <MapPinIcon className="h-5 w-5" />
    //               {t("address-user")}
    //             </Link>
    //             <SwitchApp
    //               application={ApplicationsNames.WEB}
    //               businessId={business.id}
    //             />
    //           </>
    //         )}
    //         {!user ? (
    //           <Link
    //             href={`/${locale}/auth/login`}
    //             className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
    //             prefetch={false}
    //           >
    //             <SignInIcon className="h-5 w-5" />
    //             {t("login")}
    //           </Link>
    //         ) : (
    //           <Logout title={t("logout")} action={logoutAction} />
    //         )}
    //       </div>
    //     </SheetContent>
    //   </Sheet>
    //   <ShoppingCartHeader className="relative" />
    // </header>
  );
}
