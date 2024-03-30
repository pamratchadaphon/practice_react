import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';

const EditFarmer = () => {
  const [farmerData, setFarmerData] = useState({
    fname: '',
    subdistrict: '',
    district: '',
    province: '',
    phone: ''
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/farmer/${id}`);
        setFarmerData(response.data); // ตั้งค่าข้อมูลหลังจากดึงข้อมูลสำเร็จ
      } catch (error) {
        console.error('Error fetching farmer data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    setFarmerData({ ...farmerData, [e.target.name]: e.target.value });
  };

  const navigator = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/farmer/${id}`, farmerData);
    } catch (error) {
      console.error('Error updating farmer data:', error);
    }
    navigator('/farmers')
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type='text'
            name='fname'
            value={farmerData.fname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Subdistrict:</label>
          <input
            type='text'
            name='subdistrict'
            value={farmerData.subdistrict}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label>District:</label>
          <input
            type='text'
            name='district'
            value={farmerData.district}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label>Province:</label>
          <input
            type='text'
            name='province'
            value={farmerData.province}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label>Phone:</label>
          <input
            type='text'
            name='phone'
            value={farmerData.phone}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default EditFarmer;
