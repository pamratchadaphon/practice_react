import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // ใช้ uuidv4 เพื่อความชัดเจน

const FarmerDetail = () => {
  const [farmerData, setFarmerData] = useState(null); // ใช้ null เป็นสถานะเริ่มต้น
  const { id } = useParams(); // แยก id ออกจาก useParams

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
  }, [id]); // อาร์เรย์การพึ่งพาอาศัยรวมถึง id

  if (!farmerData) {
    return <div>กำลังโหลดข้อมูลเกษตรกร...</div>;
  }

  return (
    <div>
      <h1>รายละเอียดเกษตรกร {id}</h1>
      <ul key={uuidv4()}> {/* ใช้คีย์เดียวสำหรับทั้งรายการ */}
        <li>
          <b>รหัส:</b> {farmerData.id}
        </li>
        <li>
          <b>ชื่อ:</b> {farmerData.fname}
        </li>
        <li>
          <b>ตำบล:</b> {farmerData.subdistrict}
        </li>
        <li>
          <b>อำเภอ:</b> {farmerData.district}
        </li>
        <li>
          <b>จังหวัด:</b> {farmerData.province}
        </li>
        <li>
          <b>เบอร์โทรศัพท์:</b> {farmerData.phone}
        </li>
      </ul>
      <Link to={'/'}>หน้าหลัก</Link>
    </div>
  );
};

export default FarmerDetail;
