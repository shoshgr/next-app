import axios from 'axios';
import { User } from '../types/User';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    return response.data.users; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Network error');
    }
    throw new Error('An unknown error occurred');
  }
};

export const fetchUserById = async (id: string): Promise<User> => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Network error');
      }
      throw new Error('An unknown error occurred');
    }
  };