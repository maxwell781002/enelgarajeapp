"use client";

import { Mail } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

const socialNetworks = [
  {
    name: "Google",
    icon: Mail,
    provider: "google",
  },
];

export type SignButtonProps = {
  signIn: (provider: string) => void;
};

export default function SigninButton({ signIn }: SignButtonProps) {
  return (
    <>
      {socialNetworks.map(({ name, icon: Icon, provider }) => (
        <Button
          key={provider}
          variant="outline"
          className="w-full bg-cyan-700 text-white"
          onClick={() => signIn(provider)}
        >
          <Icon className="mr-2 h-4 w-4" />
          {name}
        </Button>
      ))}
    </>
  );
}
