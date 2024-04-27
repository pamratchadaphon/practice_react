import React from 'react';
import { LiaUserCircle } from "react-icons/lia";
import { FaLeaf, FaSeedling } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
  const handleLogout = () => {
    window.location = '/';
  };
  return (
    <div className='bg-[#15803d] h-[100vh] px-[25px]'>
      <div className='px-[15px] py-[30px] flex items-center justify-center'>
        <LiaUserCircle color='white'/>
        <h1 className='text-white text-[20px] leading-[24px] font-extrabold '>
          Admin
        </h1>
      </div>
      <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'>MENU</p>
        <div className='flex items-center gap-[15px] py-[15px] pt-0 border-b-[1px] border-[#EDEDED]/[0.3]'>
          <Link to={`/manageVariety`} className="flex items-center gap-2 text-white text-[14px] leading-[20px] font-bold hover:underline" style={{ textDecoration: 'none' }}>
          <FaSeedling color='white' />
          <span>จัดการพันธ์ข้าว</span>
          </Link>
        </div>
        <div className='flex items-center gap-[15px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
          <Link to={`/disease/`} className="flex items-center gap-2 text-white text-[14px] leading-[20px] font-bold hover:underline" style={{ textDecoration: 'none' }}>
            <FaLeaf color='white' />
            <span>จัดการโรคข้าวและการป้องกันกำจัด</span>
          </Link>
        </div>
      </div>
      <div className='absolute bottom-[20px] left-[25px]'>
        <button className='text-white text-[14px] font-bold hover:underline' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default SidebarAdmin;