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

export async function createUser({
  token,
  email,
  firstName,
  lastName,
  middleName,
  roleId,
  positionId,
  password,
  isActive,
}) {
  const response = await fetchData({
    path: "/users",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        roleId: roleId,
        positionId: positionId,
        password: password,
        isActive: isActive,
      }),
      method: "POST",
    },
  });

  return response.data;
}
