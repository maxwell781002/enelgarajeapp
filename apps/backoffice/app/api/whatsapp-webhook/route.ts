import { NextRequest, NextResponse } from "next/server";
import { updateSecureCode } from "@repo/model/repository/whatsapp-connect";

const listeners: any = {
  create_instance: updateSecureCode,
};

export async function POST(req: NextRequest) {
  const { event, ...props } = await req.json();
  if (listeners[event]) {
    await listeners[event](props);
  }
  return NextResponse.json({ message: "Success" });
}
