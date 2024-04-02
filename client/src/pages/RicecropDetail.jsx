import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const RicecropDetail = () => {
  const { idFarmer, idRicecrop } = useParams()
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          window.location.href = '/';
          return;
        }
  
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const authResponse = await axios.post('http://localhost:8080/api/farmer/authen', null, config);
        if (authResponse.data.status === 'ok') {
          const ricecropResponse = await axios.get(`/api/ricecrop/getOneRicecrop/${idRicecrop}`);
          setData(ricecropResponse.data);
        } else {
          alert('Authentication failed');
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      } catch (error) {
        console.error("Error fetching ricecrop data:", error);
      }
    };
    fetchData();
  }, [idRicecrop]); 

  // ฟังก์ชันสำหรับการแปลงวันที่ให้เป็นรูปแบบ "dd-mm-yyyy"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear()+543;
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  return (
    <div className='flex'>
      <div className='basis-[16%] h-[100vh]'>
        <Sidebar idFarmer={idFarmer}/>
      </div>
      <div className='basis-[84%] border'>
        <div className='px-[30px] py-[30px]'>
          <Link className="btn btn-secondary" style={{float: 'right'}} to={`/Income/${idFarmer}/${idRicecrop}`}>บันทึกรายรับ</Link>
        </div>
        <div className='px-[30px] py-[2px] text-center font-bold text-lg'>
          ปีที่ทำการปลูก {data.year}
        </div>
        <div className='px-[30px] py-[2px]'>
          วันที่ปลูก {formatDate(data.startDate)}
        </div>
        <div className='px-[30px] py-[2px]'>
          วันที่เก็บเกี่ยว {formatDate(data.endDate)}
        </div>
        <div className='px-[30px] py-[2px]'>
          พันธ์ุข้าว {data.riceVarietie}
        </div>
        <div className='px-[30px] py-[2px]'>
          ddd
        </div>
      </div>
    </div>
  )
}

export default RicecropDetail
