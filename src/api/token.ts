import { axios } from '../services/axios';

export const getToken = async () => {
  const response = await axios.get<{
    success: string;
    token: string;
  }>('/token');

  return response.data.token;
};
