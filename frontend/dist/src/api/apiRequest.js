export async function makeRequest(url, options = {}) {
  const { method = "GET", headers = {}, body = null } = options;
  //
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    // You can handle errors here, like displaying an error message to the user
    throw error;
  }
}
