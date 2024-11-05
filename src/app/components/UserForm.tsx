'use client'
import React, { useState, useEffect } from 'react';
import { useUserStore } from '@/app/store/userStore';
import Error from '@/app/errors';
import Loading from '@/app/loading';
import { User } from '../types/User';

interface UserFormProps {
  existingUser?: User; 
  onClose: () => void; 
}

const UserForm: React.FC<UserFormProps> = ({ existingUser, onClose }) => {
  const [firstName, setFirstName] = useState(existingUser ? existingUser.firstName : '');
  const [lastName, setLastName] = useState(existingUser ? existingUser.lastName : '');
  const [email, setEmail] = useState(existingUser ? existingUser.email : '');
  const [image, setImage] = useState(existingUser ? existingUser.image : '');
  const { addUser, editUser, loading, error, resetStatus } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetStatus();

    const user: User = {
      id: existingUser ? existingUser.id : Math.random(), 
      firstName,
      lastName,
      email,
      image,
    };

    if (existingUser) {
      await editUser(user); 
    } else {
      await addUser(user); 
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setImage('');
    onClose(); 
  };

  
  useEffect(() => {
    if (existingUser) {
      setFirstName(existingUser.firstName);
      setLastName(existingUser.lastName);
      setEmail(existingUser.email);
      setImage(existingUser.image);
    }
  }, [existingUser]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl text-center mb-4">{existingUser ? 'Edit Contact' : 'Add New Contact'}</h2>
      {error && <Error />}
      {loading && <Loading />}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-teal-500 text-white rounded"
        >
          {loading ? (existingUser ? 'Updating...' : 'Adding...') : (existingUser ? 'Update Contact' : 'Add Contact')}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
