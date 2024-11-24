import { PropsWithChildren } from "react";
import BaseMarkdown from "react-markdown";

export default function Markdown({ children }: PropsWithChildren) {
  return (
    <article className="prose prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600">
      <BaseMarkdown>{children as string}</BaseMarkdown>
    </article>
  );
}
