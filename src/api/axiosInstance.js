import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Zjk3MGNlNTQyMjU0Y2NkNzVmNDk2NmYyZWM2MzQwZiIsIm5iZiI6MTc4OTE5MTQ0OC40MjMsInN1YiI6IjZhYTRlNTE4MjYwY2Q0MjVjZjc0YTAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H2ZO8ICLvWVgFkWFVHa-2o_i5FVlCKo9sihyH9dBwvc",
  },
  timeout: 5000,
});
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("responced recived");
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.log("Un-Authorized");
      } else if (status === 404) {
        console.log("API Not Found");
      } else if (status === 500) {
        console.log("Server Error!!");
      }
    } else if (error.request) {
      console.log("No response from server");
    } else {
      console.log("Error" + error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
