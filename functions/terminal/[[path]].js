export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
    const path = url.pathname.replace(/^\/terminal/, "");
    const upstream = "https://web-production-6c0e2c.up.railway.app" + path + url.search;
    const headers = new Headers(context.request.headers);
    headers.delete("host");
    const init = {
      method: context.request.method,
      headers,
      redirect: "manual",
    };
    if (!["GET", "HEAD"].includes(context.request.method)) {
      init.body = context.request.body;
    }
    return await fetch(upstream, init);
  } catch (err) {
    return new Response("Upstream error: " + (err && err.stack ? err.stack : String(err)), { status: 502 });
  }
}
