import { PropsWithChildren } from "react";

export default function BaseGatewayAdmin({ children }: PropsWithChildren) {
  return (
    <>
      <span>Base form gateway</span>
      {children}
    </>
  );
}
