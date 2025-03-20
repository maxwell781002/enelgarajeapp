import { useState } from "react";

export type TToggle = () => void;

export const useToggle = (initialState: boolean = false) => {
  const [open, setOpen] = useState(initialState);
  const toggle: TToggle = () => {
    setOpen((prev) => !prev);
  };
  return [open, toggle] as const;
};
