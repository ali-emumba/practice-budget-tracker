import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.request.use(request => {
    const authState = localStorage.getItem('authState');
    const accessToken = authState ? JSON.parse(authState).accessToken : null;
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  }, error => {
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
    response => response, // Directly return successful responses.
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
        try {
          let authState = JSON.parse(localStorage.getItem("authState")!);
          const refreshToken = authState ? authState.refreshToken : null;
          // Make a request to your auth server to refresh the token.
          const response = await axios.post('http://localhost:8000/api/v1/users/refresh-token', {
            refreshToken,
          });
          const { accessToken, refreshToken: newRefreshToken } = response.data.data;
          // Store the new access and refresh tokens.
         
          authState.accessToken = accessToken;
          authState.refreshToken = newRefreshToken;
          localStorage.setItem('authState', JSON.stringify(authState));
          // Update the authorization header with the new access token.
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
          localStorage.removeItem('authState');
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // For all other errors, return the error as is.
    }
);


export { axiosInstance };