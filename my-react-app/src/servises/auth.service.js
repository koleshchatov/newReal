import { fetchData } from "./utils";

export async function loginUser({ email, password }) {
  const response = await fetchData({
    path: "auth/login",
    options: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  return response.data;
}

export async function refreshToken() {
  const response = await fetchData({
    path: "auth/refresh",
    options: "POST",
  });
  return response.data;
}
