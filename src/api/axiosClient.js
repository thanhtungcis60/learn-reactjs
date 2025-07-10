import axios from 'axios';
const axiosClient = axios.create({
    baseURL: 'https://api.ezfrontend.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});
//Interceptors base cho tất cả request và response
// Interceptors cho phép bạn can thiệp vào request và response trước khi chúng được xử lý bởi then hoặc catch

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config,status, data } = error.response || {};
    if(!config) {
      // Nếu không có config thì có thể là lỗi mạng hoặc server không phản hồi
      throw new Error('Network error or server is not responding');
    }
    const arrURL = [
      '/auth/local/register',
      '/auth/local'
    ];
    if(arrURL.includes(config.url) && status === 400) {
      // Nếu là lỗi đăng ký thì trả về lỗi
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      throw new Error(firstMessage.message || 'Something went wrong!');
    }
    
    return Promise.reject(error);
  });

export default axiosClient;