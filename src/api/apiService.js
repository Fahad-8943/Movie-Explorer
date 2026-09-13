import axiosInstance from "./axiosInstance";

const apiService = async (method, url, params, data) => {
  const config = {
    method,
    url,
    params,
    data,
  };
  const response = await axiosInstance(config);

  return response;
};

export default apiService;
