import { PropsWithChildren, ReactNode } from "react";

type BtnListProps = {
  children: ReactNode[] | ReactNode;
};

function Wrapper({ children }: PropsWithChildren) {
  return <div className="flex items-start">{children}</div>;
}

export function BtnList({ children }: BtnListProps) {
  if (Array.isArray(children)) {
    return (
      <Wrapper>
        {children.map((child, i) => (
          <div className="mr-1" key={i}>
            {child}
          </div>
        ))}
      </Wrapper>
    );
  }
  return <Wrapper>{children}</Wrapper>;
}
