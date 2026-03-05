import axiosInstance from './axios';

interface LoginData {
  username: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await axiosInstance.post('/api/login/', data);
  return response.data; 
};

export const logout = async () => {
  await axiosInstance.post('/api/logout/');
};