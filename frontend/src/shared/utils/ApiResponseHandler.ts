import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import useTokenStore from 'shared/store/useTokenStore'
import { useError } from '../../app/ErrorContext'

const useApi = () => {
   const { setError } = useError();
   const {getToken} = useTokenStore()
   const _accessToken = getToken()
   const api = axios.create({
      baseURL: 'http://95.169.201.222:8000/',
   });

   api.interceptors.request.use(
      config => {
         if (_accessToken) {
            config.headers['Authorization'] = `Bearer ${_accessToken}`;
         }
         return config;
      },
      error => Promise.reject(error),
   );

   api.interceptors.response.use(
      (response: AxiosResponse) => response,
      error => {
         let message = 'Oops, something went wrong';
         if (error.response?.data) {
            const responseData = error.response.data;
            if (Array.isArray(responseData) && responseData.length > 0) {
               message = responseData[0];
            } else if (responseData.detail) {
               message = responseData.detail;
            } else if (typeof responseData === 'string') {
               message = responseData;
            } else {
               message = JSON.stringify(responseData);
            }
         }

         setError(message);
         setTimeout(() => setError(''), 2000);
         return Promise.reject(error);
      },
   );

   const request = async <T>(config: AxiosRequestConfig): Promise<T | null> => {
      try {
         const response: AxiosResponse<T> = await api.request(config);
         return response.data;
      } catch (error: any) {
         return null;
      }
   };

   return request;
};

export default useApi;
