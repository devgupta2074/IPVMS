export async function makeRequest(url, options = {}) {
  const { method = "GET", headers = {}, body = null } = options;
  //

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response;
  return data;
}
