import React, { useState } from 'react';
import { useUserStore } from '@/app/store/userStore';
import Error from '@/app/errors';
import Loading from '@/app/loading';
import { User } from '../types/User';

const AddUser: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [isOpen, setIsOpen] = useState(false); 
  const { addUser, loading, error,  resetStatus } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetStatus();
    const newUser: User = {
      id: Math.random(),
      firstName,
      lastName,
      email,
      image,
    };
    await addUser(newUser);
    setFirstName('');
    setLastName('');
    setEmail('');
    setImage('');
    setIsOpen(false); 
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-teal-500 text-white rounded mb-4"
      >
        {isOpen ? 'Cancel' : 'Add New Contact'}
      </button>
      {isOpen && ( 
        <div>
          <h2 className="text-2xl text-center mb-4">Add New Contact</h2>
        
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
              {loading ? 'Adding...' : 'Add Contact'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddUser;
