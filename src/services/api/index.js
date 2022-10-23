import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getClubs = async (limit, offset) => {
  const { data } = await axios.get("api/data", {
    params: { limit, offset },
  });
  return data;
};
