'use client';
import React, { useEffect, useState } from 'react';
import { fetchUserById } from '../services/uesrService';
import { User } from '../types/User';

interface UserDetailsProps {
  id: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ id }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUserById = async (userId: string) => {
    try {
      const user = await fetchUserById(userId);
      setUserData(user);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserById(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {userData && (
        <div>
          <h1 className="text-2xl text-center my-4">{`${userData.firstName} ${userData.lastName}`}</h1>
          <p className="text-center">Email: {userData.email}</p>
          <img src={userData.image} alt={`${userData.firstName} ${userData.lastName}`} className="w-32 h-32 rounded-full mx-auto" />
          <p className="text-center">User ID: {userData.id}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
