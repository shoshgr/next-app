
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
  editUser: (user: User) => void;
  removeUser: (id: number) => void;
  resetStatus: () => void;
  fetchAllUsers: () => Promise<void>; 

}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  success: false,

  fetchAllUsers: async () => { 
    set({ loading: true, error: null });
    try {
     
      const currentUsers = get().users; 
      if (currentUsers.length > 0) {
       
        set({ loading: false }); 
        return;
      }
  
     
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
  },  editUser: (updatedUser: User) => {
    set((state) => ({
      users: state.users.map(user => (user.id === updatedUser.id ? updatedUser : user)),
    }));
  },

  removeUser: (id: number) => {
    set((state) => ({
      users: state.users.filter(user => user.id != id)
    }));
  },
  resetStatus: () => set({ error: null, success: false }),
}));
