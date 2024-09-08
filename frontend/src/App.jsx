import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user exists in localStorage
    const user = localStorage.getItem('user');

    // If no user is found, navigate to the /login page
    if (!user) {
      navigate('/login');
    }
  }, [navigate]); // The effect depends on navigate

  return (
    <div>
      <Spline scene="https://prod.spline.design/AI14e68A0QEnMr7W/scene.splinecode" />
    </div>
  );
}
