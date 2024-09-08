import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { Button } from '@/components/ui/button';

export default function Home() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if the user exists in localStorage
  //   const user = localStorage.getItem('user');

  //   // If no user is found, navigate to the /login page
  //   if (!user) {
  //     navigate('/login');
  //   }
  // }, [navigate]); // The effect depends on navigate

  return (
    <main className='h-screen flex items-center bg-[#ffb3c3]'>
      {/* <Spline scene="https://prod.spline.design/AI14e68A0QEnMr7W/scene.splinecode" className="flex-1 h-full" /> */}
      <Spline scene="https://prod.spline.design/dyw2tUNmsFjOo9rp/scene.splinecode" className="flex-1 h-full" />
      <div className="flex-1 text-background font-semibold flex items-center justify-center">
        <div className='w-[35vw] flex flex-col items-start justify-center gap-5'>
          <p className='text-7xl text-black'>
            Play & Learn:</p>
          <p className='text-5xl text-black'>
            3D Adventures for Curious Minds
          </p>
          <Button className="block">Get Started</Button>
        </div>
      </div>
    </main>
  );
}
