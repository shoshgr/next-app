
'use client';
import React from 'react';
import { User } from '../types/User';
import Link from 'next/link';

interface UserCardProps {
  user: User; 
}

const UserCard: React.FC<UserCardProps> = ({ user }) => { 
  return (
    <div className="border rounded-lg p-4 shadow">
      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-32 h-32 rounded-full mx-auto" />
      <h2 className="text-xl text-center">{`${user.firstName} ${user.lastName}`}</h2>
      <p className="text-center">Email: {user.email}</p>
      <Link href={`/pages/contact/${user.id}`} className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition text-center block">
        View Details
      </Link>
    </div>
  );
};

export default UserCard;
