export async function POST(req: Request) {
  const { content } = await req.json();
  console.log(content);
  return new Response("Ok", { status: 200 });
}
