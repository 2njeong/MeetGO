'use client';

import { userStore } from '(@/store/userStore)';
import { UsersType } from '(@/types/userTypes)';
import { useEffect } from 'react';

const InitUser = ({ userData }: { userData: UsersType[] | null }) => {
  const setUser = userStore((state) => state.setUser);
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);
  return <></>;
};

export default InitUser;
