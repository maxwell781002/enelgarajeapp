import { Fragment } from "react";
import Link from "next/link";
import { LinkItem } from "@repo/ui/types/linkItem";
import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";

export type BreadcrumbProps = {
  className?: string;
  breadcrumbItems?: LinkItem[];
};

export default function Breadcrumb({
  breadcrumbItems,
  className,
}: BreadcrumbProps) {
  breadcrumbItems = breadcrumbItems || [];
  breadcrumbItems = [...breadcrumbItems];
  const lastItem = breadcrumbItems.pop();
  return (
    <BaseBreadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbItems.map(({ title, link }) => (
          <Fragment key={link}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={link}>{title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{lastItem?.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BaseBreadcrumb>
  );
}
