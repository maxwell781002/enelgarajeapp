"use client";
import { LogOut } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

type LogoutProps = {
  title: string;
  action: () => any;
};

export const Logout = ({ title, action }: LogoutProps) => {
  return (
    <Button onClick={() => action()} className="w-full" variant="outline">
      <LogOut className="h-4 w-4 mr-2" />
      <div className="ml-2">{title}</div>
    </Button>
  );
};
