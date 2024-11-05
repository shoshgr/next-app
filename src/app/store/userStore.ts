// useUserStore.ts
import { create } from 'zustand';
import { User } from '../types/User';
import { addUser as addUserService } from '@/app/services/uesrService';
import { fetchUsers } from '@/app/services/uesrService'; 

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  success: boolean;
  addUser: (user: User) => Promise<void>;
  resetStatus: () => void;
  fetchAllUsers: () => Promise<void>; 
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,
  success: false,

  fetchAllUsers: async () => { 
    set({ loading: true, error: null });
    try {
      const users = await fetchUsers();
      set({ users });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addUser: async (user: User) => {
    set({ loading: true, error: null, success: false });
    try {
      await addUserService(user);
      set((state) => ({ users: [...state.users, user], success: true })); 
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  resetStatus: () => set({ error: null, success: false }),
}));
