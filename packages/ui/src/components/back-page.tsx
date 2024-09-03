import Link from "next/link";
import { ArrowLeftIcon } from "./icons";

type BackPageProps = {
  href: string;
  urlTitle: string;
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
};

export default function BackPage({
  href,
  urlTitle,
  children,
  headerChildren,
}: BackPageProps) {
  return (
    <>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground pb-4"
        prefetch={false}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <div className="flex flex-1 justify-between">
          {urlTitle}
          {headerChildren}
        </div>
      </Link>
      {children}
    </>
  );
}
