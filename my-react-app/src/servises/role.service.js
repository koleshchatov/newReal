import { fetchData } from "./utils";

export async function role(token) {
  const response = await fetchData({
    path: "/access/roles",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      method: "GET",
    },
  });

  return response.data;
}

export async function createNewRole({
  token,
  code,
  name,
  description,
  isActive,
}) {
  const response = await fetchData({
    path: "/access/roles",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        name: name,
        description: description,
        isActive: isActive,
      }),
      method: "POST",
    },
  });

  return response.data;
}

export async function deleteRole({ token, code }) {
  const response = await fetchData({
    path: `/access/roles/${code}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
      method: "DELETE",
    },
  });

  return response.data;
}

export async function editRole({ token, code, name, description, isActive }) {
  const response = await fetchData({
    path: `/access/roles/${code}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        isActive: isActive,
      }),
      method: "PATCH",
    },
  });

  return response.data;
}
