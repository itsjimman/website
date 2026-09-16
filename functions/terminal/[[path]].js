export async function onRequest(context) {
  return new Response("TERMINAL FN WORKS: " + context.request.url);
}
