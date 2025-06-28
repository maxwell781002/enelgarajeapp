"use client";
import { GTMEvent, useGTMEvent } from "./hook";

export default function OnLoad({ event }: { event: GTMEvent | null }) {
  useGTMEvent(event);
  return null;
}
