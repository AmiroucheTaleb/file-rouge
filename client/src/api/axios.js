import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.token}`,
  },
  withCredentials: true,
});

export const register = async (data) => {
  return await api
    .post("/auth/register", data)
    .then((response) => {
      localStorage.setItem("token", response.data.accessToken);
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
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      window.location.href = "/app/welcome";
    })
    .catch((err) => {
      throw err;
    });
};
export const logout = () => {
  return api.patch("/auth/logout");
};

export const getCars = async () => {
  const res = await api.get("/car");
  console.log(res);
  return res.data;
};

export default api;
