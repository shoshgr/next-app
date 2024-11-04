// // stores/userStore.ts

// import create from 'zustand';


// interface UserStore {
//   users: User[];
//   loading: boolean;
//   error: string | null;
//   addUser: (user: User) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
// }

// export const useUserStore = create<UserStore>((set) => ({
//   users: [],
//   loading: false,
//   error: null,
//   addUser: (user) => set((state) => ({ users: [...state.users, user] })),
//   setLoading: (loading) => set({ loading }),
//   setError: (error) => set({ error }),
// }));
