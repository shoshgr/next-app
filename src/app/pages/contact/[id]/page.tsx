// app/user/[id]/page.tsx
import React from 'react';
import UserDetails from '@/app/components/UserDetails';

interface UserPageProps {
  params: {
    id: string;
  };
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  return (
    <div>
      <UserDetails id={params.id} />
    </div>
  );
};

export default UserPage;
