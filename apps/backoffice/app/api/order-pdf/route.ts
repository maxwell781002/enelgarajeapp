import { getCurrentUser } from "@repo/model/repository/user";

export async function GET() {
  const user = await getCurrentUser();
  console.log(user);
  const url = process.env.PDF_GENERATOR_URL as string;
  const response = await fetch(`${url}/api/generate`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Pepe ff",
    }),
  });

  const blob = await response.blob();
  return new Response(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": `attachment; filename="order-aa.pdf"`,
    },
  });
}
