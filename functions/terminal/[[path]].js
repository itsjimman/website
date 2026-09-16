export async function onRequest(context) {
  const url = new URL(context.request.url);
  const upstream = new URL(url.pathname.replace(/^\/terminal/, "") + url.search, "https://web-production-6c0e2c.up.railway.app");
  const proxyRequest = new Request(upstream.toString(), context.request);
  try {
    return await fetch(proxyRequest);
  } catch (err) {
    return new Response("Upstream error: " + err.message, { status: 502 });
  }
}
