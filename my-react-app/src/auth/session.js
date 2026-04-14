import { v4 } from "uuid";

const TOKEN_KEY = "token";
const DEVICE_ID_KEY = "deviceId";

export const session = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getDeviceId() {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);

    if (!deviceId) {
      localStorage.setItem(DEVICE_ID_KEY, v4());
    }

    return deviceId;
  },
};
