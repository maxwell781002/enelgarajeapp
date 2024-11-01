"use client";
import { Button, ButtonProps } from "@repo/ui/components/ui/button";

type LogoutProps = {
  action: () => any;
} & ButtonProps;

export const BtnServerAction = ({ action, ...props }: LogoutProps) => {
  return <Button onClick={() => action()} {...props} />;
};
