export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
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
    return await fetch("https://web-production-6c0e2c.up.railway.app" + url.search, init);
  } catch (err) {
    return new Response("Upstream error: " + (err && err.stack ? err.stack : String(err)), { status: 502 });
  }
}
