import { fetchData } from "./utils";

export async function users(token) {
  const response = await fetchData({
    path: "/users",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      method: "GET",
    },
  });
  return response.data.data;
}
