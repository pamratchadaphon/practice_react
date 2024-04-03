import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// import Barchart from "./Barchart";


const RicecropDetail = () => {
  const { idFarmer, idRicecrop } = useParams();
  const [data, setData] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

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
          const ricecropResponse = await axios.get(
            `/api/ricecrop/getRicecropIncomeExpense/${idRicecrop}`
          );
          setData(ricecropResponse.data[0]);

          // คำนวณผลรวมของรายรับ
          const totalIncome = ricecropResponse.data[0].Income.reduce(
            (accumulator, currentValue) => {
              return accumulator + parseInt(currentValue.amount);
            },
            0
          );
          setTotalIncome(totalIncome);

          // คำนวณผลรวมของรายจ่าย
          const totalExpense = ricecropResponse.data[0].Expense.reduce(
            (accumulator, currentValue) => {
              return accumulator + parseInt(currentValue.amount);
            },
            0
          );
          setTotalExpense(totalExpense);
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
  }, [idRicecrop]);

  // ฟังก์ชันสำหรับการแปลงวันที่ให้เป็นรูปแบบ "dd-mm-yyyy"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() + 543;
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  return (
    <div className="flex">
      <div className="basis-[16%] h-[100vh]">
        <Sidebar idFarmer={idFarmer} />
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
        <div className="px-[30px] py-[2px] text-center font-bold text-lg">
          ปีที่ทำการปลูก {data.year}
        </div>
        <div className="px-[30px] py-[2px]">
          วันที่ปลูก {formatDate(data.startDate)}
        </div>
        <div className="px-[30px] py-[2px]">
          วันที่เก็บเกี่ยว {formatDate(data.endDate)}
        </div>
        <div className="px-[30px] py-[2px]">พันธ์ุข้าว {data.riceVarietie}</div>
        <div className="px-4 py-2 pt-16">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
              <div className="border p-4 bg-sky-300 flex flex-col h-full rounded-2xl">
                <span className="text-sm font-semibold">รายรับทั้งหมด</span>
                <span className="text-lg font-bold">
                  {totalIncome.toLocaleString()} บาท
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
              <div className="border p-4 rounded-2xl bg-violet-400 flex flex-col h-full">
                <span className="text-sm font-semibold">รายจ่ายทั้งหมด</span>
                <span className="text-lg font-bold">
                  {totalExpense.toLocaleString()} บาท
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
              <div className="border p-4 rounded-2xl bg-orange-300 flex flex-col h-full">
                <span className="text-sm font-semibold">คงเหลือ</span>
                <span className="text-lg font-bold">
                  {(totalIncome - totalExpense).toLocaleString()} บาท
                </span>
              </div>
            </div>
            <div className="w-full px-2">
      {/* <Barchart /> */}
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RicecropDetail;
