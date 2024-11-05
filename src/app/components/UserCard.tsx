import React, { useState } from 'react';
import { User } from '../types/User';
import Link from 'next/link';
import { useUserStore } from '@/app/store/userStore'; 
import UserForm from './UserForm'; 
interface UserCardProps {
  user: User; 
}

const UserCard: React.FC<UserCardProps> = ({ user }) => { 
  const { removeUser } = useUserStore();
  const [isEditOpen, setIsEditOpen] = useState(false); 
  const handleDelete = () => {
    removeUser(user.id); 
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-32 h-32 rounded-full mx-auto" />
      <h2 className="text-xl text-center">{`${user.firstName} ${user.lastName}`}</h2>
      <p className="text-center">Email: {user.email}</p>
      <Link href={`/pages/contact/${user.id}`} className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition text-center block">
        View Details
      </Link>
      <button 
        onClick={() => setIsEditOpen(true)} 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition text-center block mt-2"
      >
        Edit
      </button>
      <button 
        onClick={handleDelete} 
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition text-center block mt-2"
      >
        Delete
      </button>

      {isEditOpen && (
        <UserForm existingUser={user} onClose={() => setIsEditOpen(false)} /> 
      )}
    </div>
  );
};

export default UserCard;
