import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditFarmer = () => {
  const [farmerData, setFarmerData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/farmer/${id}`);
        setFarmerData(response.data);
      } catch (error) {
        console.error('Error fetching farmer data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSummit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      await axios.put(`/api/farmer/${id}`, formData);

      navigate('/');
    } catch (error) {
      console.error('Error updating farmer:', error);
    }
  };

  return (
    <div>
      <h1>Edit Farmer {id}</h1>
      <Link to="/">หน้าหลัก</Link>
      <form onSubmit={handleSummit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={farmerData.fname}
          />
        </div>
        <div>
          <label>Subdistrict</label>
          <input
            type="text"
            name="subdistrict"
            required
            defaultValue={farmerData.subdistrict}
          />
        </div>
        <div>
          <label>District</label>
          <input
            type="text"
            name="district"
            required
            defaultValue={farmerData.district}
          />
        </div>
        <div>
          <label>Province</label>
          <input
            type="text"
            name="province"
            required
            defaultValue={farmerData.province}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            required
            defaultValue={farmerData.phone}
          />
        </div>
        <div>
          <Link to="/">หน้าหลัก</Link>
          <button type="submit">บันทึก</button>
        </div>
      </form>
    </div>
  );
};

export default EditFarmer;
