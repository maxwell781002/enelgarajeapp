import { PropsWithChildren } from "react";
import BaseMarkdown from "react-markdown";

export default function Markdown({
  children,
  className,
}: { className?: string } & PropsWithChildren) {
  className =
    className ||
    "prose prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600";
  return (
    <article className={className}>
      <BaseMarkdown>{children as string}</BaseMarkdown>
    </article>
  );
}
