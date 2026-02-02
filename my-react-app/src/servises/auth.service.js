import { useState } from "react";
import { fetchData } from "./utils";
import { v4 } from "uuid";

export async function loginUser({ email, password, deviceId }) {
  const response = await fetchData({
    path: "/auth/login",
    options: {
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        deviceId: deviceId,
      }),
      method: "POST",
    },
  });
  console.log(response.data);
  return response.data;
}

export async function refreshToken() {
  const response = await fetchData({
    path: "/auth/refresh",

    options: { method: "POST" },
  });
  return response.data;
}

export async function logoutUser() {
  const response = await fetchData({
    path: "/auth/logout",
    options: { method: "POST" },
  });
  return response.data;
}
