import React from 'react';
import { LiaUserCircle } from "react-icons/lia";
import { FaTachometerAlt, FaBook,FaLeaf, FaSeedling } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  const id = props.idFarmer
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/';
  };
  return (
    <div className='bg-[#15803d] h-screen px-[25px]'>
      <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
        <LiaUserCircle color='white'/>
        <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>ชื่อผู้ใช้</h1>
      </div>
      <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'>MENU</p>
        {/* เพิ่มลิงค์และข้อมูลเกี่ยวกับรอบการปลูกข้าว */}
        <div className='flex items-center gap-[15px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
          <Link to={`/ricecrop/${id}`} className="flex items-center gap-2 text-white text-[14px] leading-[20px] font-bold hover:underline" style={{ textDecoration: 'none' }}>
          <FaTachometerAlt color='white' />
          <span>รอบการปลูกข้าว</span>
          </Link>
        </div>
        {/* เพิ่มลิงค์และข้อมูลเกี่ยวกับบันทึกรายรับ-รายจ่าย */}
        <div className='flex items-center gap-[15px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
          <a href="/expenses" className="flex items-center gap-2 text-white text-[14px] leading-[20px] font-bold hover:underline" style={{ textDecoration: 'none' }}>
            <FaBook  color='white' />
            <span>บันทึกรายรับ-รายจ่าย</span>
          </a>
        </div>
        {/* เพิ่มลิงค์และข้อมูลเกี่ยวกับพันธุ์ข้าว */}
        <div className='flex items-center gap-[15px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
          <a href="/rice-varieties" className="flex items-center gap-2 text-white text-[14px] leading-[20px] font-bold hover:underline" style={{ textDecoration: 'none' }}>
            <FaSeedling color='white' />
            <span>พันธุ์ข้าว</span>
          </a>
        </div>
        {/* เพิ่มลิงค์และข้อมูลเกี่ยวกับโรคข้าว */}
        <div className='flex items-center gap-[15px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
          <a href="/rice-diseases" className="flex items-center gap-2 text-white text-[14px] leading-[20px] font-bold hover:underline" style={{ textDecoration: 'none' }}>
            <FaLeaf color='white' />
            <span>โรคข้าวและการป้องกันกำจัด</span>
          </a>
        </div>
      </div>
      {/* ปุ่ม Logout */}
      <div className='absolute bottom-[20px] left-[25px]'>
        <button className='text-white text-[14px] font-bold hover:underline' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
