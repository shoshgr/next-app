'use client'
import React, {  useState } from 'react';
import { fetchUsers } from '../services/uesrService';
import { User } from '../types/User';
import UserCard from './UserCard';

const Contact: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl text-center my-4">Contact Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {users.map((user,i) => (
         <UserCard user={user} key={i}/>
        ))}
      </div>
    </div>
  );
};

export default Contact;
