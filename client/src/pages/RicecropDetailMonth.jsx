import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const RicecropDetailMonth = () => {
  const { idFarmer, idRicecrop } = useParams();
  const idAsInt = Number(idFarmer);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [num, setNum] = useState(31)
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const data1 = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/";
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const authResponse = await axios.post(
          "http://localhost:8080/api/farmer/authen",
          null,
          config
        );
        if (authResponse.data.status === "ok") {
          
        } else {
          alert("Authentication failed");
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching ricecrop data:", error);
      }
    };
    fetchData();
  }, [idFarmer]);

  useEffect(() => { 
    // คำนวณจำนวนวันของเดือนที่เลือก
    if (selectedMonth === "มกราคม" || "มีนาคม" || "พฤษภาคม" || "กรกฎาคม" || "สิงหาคม" || "ตุลาคม" || "ธันวาคม") {
      setNum(31)
    } else if (selectedMonth === "กุมภาพันธ์") {
        setNum(29)
    } else {
        setNum(30)
    }
  }, [selectedMonth]);
  for (let i = 0; i < num; i++) {
    let monthData = {
      day: i+1,
      รายรับ: 0 || 0,
      รายจ่าย: 0 || 0,
    };
    data1.push(monthData);
  }
  return (
    <div className="flex">
      <div className="basis-[16%] h-[100vh]">
        <Sidebar idFarmer={idAsInt} />
      </div>
      <div className="basis-[84%] border">
        <div className="px-[30px] pt-[30px] flex justify-end space-x-4">
          <Link
            className="btn btn-secondary"
            to={`/Expense/${idFarmer}/${idRicecrop}`}
          >
            บันทึกรายจ่าย
          </Link>
          <Link
            className="btn btn-secondary"
            to={`/Income/${idFarmer}/${idRicecrop}`}
          >
            บันทึกรายรับ
          </Link>
        </div>

        <div className="px-4 py-2 pt-16">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
              <div className="border p-4 bg-pink-400 flex flex-col h-full rounded-2xl">
                <span className="text-sm font-semibold">รายจ่าย (วัน)</span>
                <span className="text-lg font-bold">{} บาท</span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
              <div className="border p-4 rounded-2xl bg-violet-400 flex flex-col h-full">
                <span className="text-sm font-semibold">รายจ่าย (เดือน)</span>
                <span className="text-lg font-bold">{} บาท</span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
              <div className="border p-4 rounded-2xl bg-orange-400 flex flex-col h-full">
                <span className="text-sm font-semibold">รายรับ (วัน)</span>
                <span className="text-lg font-bold">{} บาท</span>
              </div>
            </div>
          </div>
          <div className="flex">
            <div>เดือน</div>
            <div className="flex w-40 px-3">
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="block w-full mt-1 border-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 rounded-md shadow-sm"
              >
                <option value="">-- เลือกเดือน --</option>
                {[
                  "มกราคม",
                  "กุมภาพันธ์",
                  "มีนาคม",
                  "เมษายน",
                  "พฤษภาคม",
                  "มิถุนายน",
                  "กรกฎาคม",
                  "สิงหาคม",
                  "กันยายน",
                  "ตุลาคม",
                  "พฤศจิกายน",
                  "ธันวาคม",
                ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-[15px]">
            <BarChart width={850} height={250} data={data1}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="รายจ่าย" fill="#8884d8" />
              <Bar dataKey="รายรับ" fill="#82ca9d" />
            </BarChart>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default RicecropDetailMonth
