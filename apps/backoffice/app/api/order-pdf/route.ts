export async function GET() {
  const url = process.env.PDF_GENERATOR_URL as string;
  const response = await fetch(url);
  const blob = await response.blob();
  return new Response(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": `attachment; filename="order-aa.pdf"`,
    },
  });
}
