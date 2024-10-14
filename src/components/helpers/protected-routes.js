'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, roles }) => {
  const { email, role, loading } = useSelector(state => state.auth);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true); 

  useEffect(() => {
    if (!loading) {
      if (!email || (roles && !roles.includes(role))) {
        router.push('/login'); 
      } else {
        setIsChecking(false); 
      }
    }
  }, [email, loading, roles, role, router]);

  if (isChecking) return null; 

  return children; 
};

export default ProtectedRoute;
