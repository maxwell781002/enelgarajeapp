"use client";

import React from "react";
import { DropdownMenuItem } from "../../components/ui/dropdown-menu";

export default function Logout({ signOut }: { signOut: () => void }) {
  return <DropdownMenuItem onClick={() => signOut()}>Salir</DropdownMenuItem>;
}
