import axios from "axios";

// Create a configured axios instance with request/response interceptors.
// You can pass { baseURL, headers, topic } to customize per-service behavior.
export function createService(customConfig = {}) {
  const { topic, ...axiosConfig } = customConfig;
  const instance = axios.create({
    timeout: 20000,
    ...axiosConfig,
  });

  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.post.Accept = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";
  instance.defaults.headers.put.Accept = "application/json";

  instance.interceptors.request.use(
    (config) => {
      if (topic) config.topic = topic;
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}
