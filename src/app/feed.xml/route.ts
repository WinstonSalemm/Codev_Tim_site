export function GET() {
  return new Response("This feed is no longer available.", {
    status: 410,
    headers: { "X-Robots-Tag": "noindex" },
  });
}
