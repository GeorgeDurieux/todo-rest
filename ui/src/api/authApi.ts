import axiosInstance from './axios';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export const login = async (data: LoginData) => {
  const response = await axiosInstance.post('/users/login/', data);
  return response.data; 
};

export const logout = async () => {
  await axiosInstance.post('/users/logout/');
};

export const register = async (data: RegisterData) => {
  const response = await axiosInstance.post('/users/register/', data);
  return response.data; 
};
