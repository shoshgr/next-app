'use client';
import React from 'react';
import { useUserStore } from '@/app/store/userStore'; 


interface UserDetailsProps {
  id: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ id }) => {
  const { users, loading, error } = useUserStore();

  

  const userData = users.find(user => user.id.toString() === id); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {userData ? (
        <div>
          <h1 className="text-2xl text-center my-4">{`${userData.firstName} ${userData.lastName}`}</h1>
          <p className="text-center">Email: {userData.email}</p>
          <img src={userData.image} alt={`${userData.firstName} ${userData.lastName}`} className="w-32 h-32 rounded-full mx-auto" />
          <p className="text-center">User ID: {userData.id}</p>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default UserDetails;
