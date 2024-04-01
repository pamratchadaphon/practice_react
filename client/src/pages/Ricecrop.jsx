import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import Sidebar from '../components/Sidebar';

const Ricecrop = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

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
          const ricecropResponse = await axios.get('/api/ricecrop/getAllRicecrop', config);
          setData(ricecropResponse.data);
        } else {
          alert('Authentication failed');
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      } catch (error) {
        console.error("Error:", error);
        alert('An error occurred while fetching data');
        window.location.href = '/';
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className='flex'>
      <div className='basis-[16%] h-[100vh]'>
        <Sidebar id={id}/>
      </div>
      <div className='basis-[84%] border'>
        <div className='px-[30px] py-[30px]'>
          <Link className="btn btn-secondary" style={{float: 'right'}} to={'/CreateRicecrop/:id'}>เพิ่มข้อมูล</Link>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">ปี</th>
                <th className="text-center">วันที่เริ่มต้น</th>
                <th className="text-center">วันที่สิ้นสุด</th>
                <th className="text-center">ดูรายละเอียด</th>
                <th className="text-center">รหัสเกษตรกร</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ricecrop) => {
                return (
                  <tr key={uuid()}>
                    <td className="text-center">{ricecrop.id}</td>
                    <td className="text-center">{ricecrop.year}</td>
                    <td className="text-center">{ricecrop.startDate}</td>
                    <td className="text-center">{ricecrop.endDate}</td>
                    <td className="text-center">
                      <Link className="btn btn-primary" to={`/RicecropDetail/${ricecrop.id}`}>ดูรายละเอียด</Link>
                    </td>
                    <td className="text-center">{ricecrop.farmerID}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ricecrop;
