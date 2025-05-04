import Link from "next/link";
import { ArrowLeftIcon } from "./icons";

type BackPageProps = {
  href?: string;
  urlTitle: string;
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function BackPage({
  href,
  urlTitle,
  children,
  headerChildren,
  onClick,
  className,
}: BackPageProps) {
  return (
    <>
      <div className={className || "flex flex-1 justify-between"}>
        <Link
          href={href || "#"}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground pb-4"
          prefetch={false}
          onClick={onClick}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {urlTitle}
        </Link>
        {headerChildren}
      </div>
      {children}
    </>
  );
}
