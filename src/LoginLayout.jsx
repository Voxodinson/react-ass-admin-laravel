// components/LoginLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
  return (
    <div className='w-screen h-full bg-black '>
      <Outlet/>
    </div>
  );
};


export default LoginLayout;
