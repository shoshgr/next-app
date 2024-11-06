// Users.tsx
'use client'
import { useQuery } from '@tanstack/react-query';
import {User} from "@/app/types/User"


const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('http://localhost:3000/api/users/get');
  if (!response.ok) {
    throw new Error('שגיאה בטעינת המשתמשים');
  }
  return response.json();
};

const Users = () => {
  const { data, error, isLoading, isError } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 2,  
    refetchOnWindowFocus: false, 
  });

  if (isLoading) return <div>טוען...</div>;
  if (isError) return <div>שגיאה: {error.message}</div>;

  return (
    <div>
      <h1>רשימת משתמשים</h1>
      <ul>
        
      </ul>
    </div>
  );
};

export default Users;