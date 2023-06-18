import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const register = async (data) => {
  return await api
    .post("/auth/register", data)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      window.location.href = "/app/welcome";
    })
    .catch((err) => {
      throw err;
    });
};
export const login = async (data) => {
  return await api
    .post("/auth/login", data)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      window.location.href = "/app/welcome";
    })
    .catch((err) => {
      throw err;
    });
};
export const logout = () => {
  return api.patch("/auth/logout");
};

export default api;
