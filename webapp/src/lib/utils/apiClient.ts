import { createAlova } from "alova";
import adapterFetch from "alova/fetch";

const alovaInstance = createAlova({
  baseURL: "/api",
  requestAdapter: adapterFetch(),
  cacheFor: null,
  beforeRequest(method) {
    method.config.credentials = "include";
    if (!(method.data instanceof FormData)) {
      method.config.headers["Content-Type"] = "application/json";
    }
  },
  responded: {
    onSuccess: async (response) => {
      if (!response.ok) {
        throw new Error(response.statusText || "Request failed");
      }
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return response.json();
      }
      return response.text();
    },
    onError: (error) => {
      throw error;
    },
  },
});

type ApiResponse<T> = { data: T; error: null } | { data: null; error: string };

const apiClient = {
  get: async <T>(
    url: string,
    params?: Record<string, any>,
  ): Promise<ApiResponse<T>> => {
    try {
      const data = await alovaInstance.Get<T>(url, { params });
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  post: async <T>(
    url: string,
    body?: any,
    config?: Record<string, any>,
  ): Promise<ApiResponse<T>> => {
    try {
      const data = await alovaInstance.Post<T>(url, body, config);
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  put: async <T>(
    url: string,
    body?: any,
    config?: Record<string, any>,
  ): Promise<ApiResponse<T>> => {
    try {
      const data = await alovaInstance.Put<T>(url, body, config);
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  patch: async <T>(
    url: string,
    body?: any,
    config?: Record<string, any>,
  ): Promise<ApiResponse<T>> => {
    try {
      const data = await alovaInstance.Patch<T>(url, body, config);
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  delete: async <T>(
    url: string,
    body?: any,
    config?: Record<string, any>,
  ): Promise<ApiResponse<T>> => {
    try {
      const data = await alovaInstance.Delete<T>(url, body, config);
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },
};

export default apiClient;
