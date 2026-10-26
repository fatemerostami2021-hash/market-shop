import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
});

export const getProducts = () => api.get("/products").then((r) => r.data);
export const getProduct = (id: string | number) =>
  api.get(`/products/${id}`).then((r) => r.data);
