'use client'
import React, { useState } from 'react';
import UserForm from '@/app/components/UserForm';
import Contact from '@/app/components/Contact';

const Page: React.FC = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsAddUserOpen(true)}
        className="p-2 bg-teal-500 text-white rounded mb-4"
      >
        Add New Contact
      </button>

      {isAddUserOpen && (
        <UserForm onClose={() => setIsAddUserOpen(false)} />
      )}
      
      <Contact />
    </div>
  );
};

export default Page;
