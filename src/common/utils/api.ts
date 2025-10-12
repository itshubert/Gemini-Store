import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: unknown,
): Promise<T> => {
  const response = await apiClient.request<T>({
    method,
    url,
    data,
  });
  return response.data;
};

export const api = {
  Get: <T>(url: string) => apiRequest<T>("GET", url),
  Post: <T>(url: string, data?: unknown) => apiRequest<T>("POST", url, data),
  Put: <T>(url: string, data?: unknown) => apiRequest<T>("PUT", url, data),
  Delete: <T>(url: string) => apiRequest<T>("DELETE", url),
};
