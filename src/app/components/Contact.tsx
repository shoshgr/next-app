import React, { useEffect } from 'react';
import { useUserStore } from '@/app/store/userStore'

import UserCard from './UserCard';

const Contact: React.FC = () => {
  const { users, loading, error, fetchAllUsers } = useUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl text-center my-4">Contact Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {users.map((user, i) => (
          <UserCard user={user} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Contact;
