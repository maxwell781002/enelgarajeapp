import { NextRequest, NextResponse } from "next/server";
import {
  authenticatedWhatsapp,
  disconnectWhatsapp,
  updateSecureCode,
  updateChatListListener,
} from "@repo/model/repository/whatsapp-connect";

const listeners: any = {
  create_instance: updateSecureCode,
  authenticated: authenticatedWhatsapp,
  disconnected: disconnectWhatsapp,
  chat_list_updated: updateChatListListener,
};

export async function POST(req: NextRequest) {
  const { event, ...props } = await req.json();
  console.log(event, props);
  if (listeners[event]) {
    await listeners[event](props);
  }
  return NextResponse.json({ message: "Success" });
}
