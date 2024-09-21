"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Mail } from "lucide-react";

// To use other social networks, see this link https://github.com/simple-icons/simple-icons

type SignInProps = {
  title: string;
  description: string;
  signIn: (provider: string) => void;
};

const socialNetworks = [
  {
    name: "Google",
    icon: Mail,
    provider: "google",
  },
];

export default function SignIn({ title, description, signIn }: SignInProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-8 space-y-4 px-5">
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
        </div>
      </div>
    </div>
  );
}
