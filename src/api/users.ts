import { User } from '../models/user.types.ts';
import { axios } from '../services/axios';

interface RegisterUserResponse {
  success: boolean;
  user_id: number;
  message: string;
}

interface GetAllPaginatedUsersResponse {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: number | null;
    prev_url: number | null;
  };
  users: User[];
}

export const registerUser = async (user: FormData, token: string) => {
  const response = await axios.post<RegisterUserResponse>('/users', user, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const getAllUsers = async (count: number, page: number) => {
  const response = await axios.get<GetAllPaginatedUsersResponse>(`/users?count=${count}&page=${page}`);

  const data = response.data;

  return data;
};

export const getUserById = async (userId: number) => {
  const response = await axios.get<User>(`/users/${userId}`);

  return response.data;
};
