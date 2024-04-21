import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface RequestProps {
  apiUrl?:string
  shouldUseToken?:boolean
}


function http({apiUrl}:RequestProps = {}){
  const a = axios.create({
    baseURL:apiUrl || process.env.REACT_APP_API_URL+"/api",
  });
  
  a.interceptors.request.use(
    async (config:InternalAxiosRequestConfig) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  a.interceptors.response.use(
    (response) => {
      return response;
    },
    (error:Error | AxiosError) => {
      if(axios.isAxiosError(error)){
        if (error.response) {
          if (error.response.status === 401) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error)
      }
      return Promise.reject(error);
    }
  );
  return a;
}




export default http;    