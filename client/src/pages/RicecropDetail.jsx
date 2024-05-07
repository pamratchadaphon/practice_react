import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Chart from "chart.js/auto";
import { Button } from "@mui/material";


const RicecropDetail = () => {
  const { idFarmer, idRicecrop } = useParams();
  const idAsInt = Number(idFarmer);
  const [data, setData] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [mapi, setMapi] = useState(Array.from({ length: 12 }, () => 0));
  const [mape, setMape] = useState(Array.from({ length: 12 }, () => 0));
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(12);
  const chartRef = useRef(null);
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");

  const data1 = [];

  for (let i = startMonth - 1; i < endMonth; i++) {
    const monthData = {
      name: "",
      รายรับ: mapi[i] || 0,
      รายจ่าย: mape[i] || 0,
    };

    switch (i) {
      case 0:
        monthData.name = "มกราคม";
        break;
      case 1:
        monthData.name = "กุมภาพันธ์";
        break;
      case 2:
        monthData.name = "มีนาคม";
        break;
      case 3:
        monthData.name = "เมษายน";
        break;
      case 4:
        monthData.name = "พฤษภาคม";
        break;
      case 5:
        monthData.name = "มิถุนายน";
        break;
      case 6:
        monthData.name = "กรกฎาคม";
        break;
      case 7:
        monthData.name = "สิงหาคม";
        break;
      case 8:
        monthData.name = "กันยายน";
        break;
      case 9:
        monthData.name = "ตุลาคม";
        break;
      case 10:
        monthData.name = "พฤศจิกายน";
        break;
      case 11:
        monthData.name = "ธันวาคม";
        break;
      default:
        break;
    }
    data1.push(monthData);
  }
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["รายรับ", "รายจ่าย"],
        datasets: [
          {
            label: "# of Votes",
            data: [totalIncome, totalExpense],
            backgroundColor: ["#82ca9d", "#CD5C5C"],
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const dataValue = context.dataset.data[context.dataIndex];
                const total = context.dataset.data.reduce(
                  (acc, curr) => acc + curr,
                  0
                );
                const percentage = ((dataValue / total) * 100).toFixed(2);
                return `${context.label}: ${dataValue} (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [totalExpense, totalIncome]);

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
          const farmerResponse = await axios.get(`/api/farmer/${idAsInt}`);
          setFirstName(farmerResponse.data.fname);
          setLastName(farmerResponse.data.lname);
          const ricecropResponse = await axios.get(
            `/api/ricecrop/getRicecropIncomeExpense/${idRicecrop}`
          );
          setData(ricecropResponse.data[0]);
          const arrIncome = [];
          const arrExpense = [];
          const arrMonthIncome = [];
          const arrMonthExpense = [];
          const arrPriceIncome = [];
          const arrPriceExpense = [];
          for (
            let i = 0;
            i < ricecropResponse.data[0].IncomeExpense.length;
            i++
          ) {
            if (ricecropResponse.data[0].IncomeExpense[i].type === "รายรับ") {
              const date = new Date(
                ricecropResponse.data[0].IncomeExpense[i].date
              );
              const month = date.getMonth() + 1;
              arrMonthIncome[i] = month;
              arrPriceIncome[i] =
                ricecropResponse.data[0].IncomeExpense[i].price;

              arrIncome[i] = ricecropResponse.data[0].IncomeExpense[i];
            } else {
              const date = new Date(
                ricecropResponse.data[0].IncomeExpense[i].date
              );
              const month = date.getMonth() + 1;
              arrMonthExpense[i] = month;
              arrPriceExpense[i] =
                ricecropResponse.data[0].IncomeExpense[i].price;
              arrExpense[i] = ricecropResponse.data[0].IncomeExpense[i];
            }
          }

          for (let i = 0; i < arrMonthIncome.length; i++) {
            const monthIndex = arrMonthIncome[i] - 1;

            setMapi((prevState) => {
              const newState = [...prevState];
              newState[monthIndex] += arrPriceIncome[i] / 2;
              return newState;
            });
          }

          for (let i = 0; i < arrMonthExpense.length; i++) {
            const monthIndex = arrMonthExpense[i] - 1;

            setMape((prevState) => {
              const newState = [...prevState];
              newState[monthIndex] += arrPriceExpense[i] / 2;
              return newState;
            });
          }

          const startDate = new Date(ricecropResponse.data[0].startDate);
          const startMonth = startDate.getMonth() + 1;
          setStartMonth(startMonth);

          const endDate = new Date(ricecropResponse.data[0].endDate);
          const endMonth = endDate.getMonth() + 1;
          setEndMonth(endMonth);

          const totalIncome =
            arrIncome.reduce((accumulator, currentValue) => {
              return accumulator + parseInt(currentValue.price);
            }, 0) || 0;
          setTotalIncome(totalIncome);

          const totalExpense =
            arrExpense.reduce((accumulator, currentValue) => {
              return accumulator + parseInt(currentValue.price);
            }, 0) || 0;
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
  }, [idRicecrop, idAsInt]);

  // ฟังก์ชันสำหรับการแปลงวันที่ให้เป็นรูปแบบ "dd-mm-yyyy"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() ;
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  return (
    <div className=" bg-gray-100">
      <div>
        <Navbar idFarmer={idFarmer} fname={fname} lname={lname} />
      </div>
      <div className="mx-32">
        <div className=" py-[2px] pt-[30px] text-center font-bold text-lg">
          ปีที่ทำการปลูก {data.year}
        </div>

        <div>
          <div className=" py-[2px]">
            วันที่ปลูก {formatDate(data.startDate)}
          </div>
          <div className=" py-[2px]">
            วันที่เก็บเกี่ยว {formatDate(data.endDate)}
          </div>
          <div className="py-[2px]">พันธ์ุข้าว {data.riceVarietie}</div>
        </div>
        <div>
          <div className=" py-[2px]">
            <Link to={`/detail/${idFarmer}/${idRicecrop}`}>
              <Button variant="contained">รายละเอียดเพิ่มเติม</Button>
            </Link>
          </div>
        </div>

        <div className=" py-2 pt-16">
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
          </div>
          <div className="bg-white py-4 shadow-lg rounded-2xl flex flex-wrap">
            <div className="ml-16">
              <span>กราฟแสดงรายรับ-รายจ่ายในแต่ละเดือน</span>
              <BarChart width={750} height={270} data={data1}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                  {/* <Label value="เดือน" offset={-5} position="right" /> */}
                </XAxis>
                <YAxis>
                  {/* <Label value="ราคา (บาท)" offset={-30} position="insideTop" /> */}
                </YAxis>
                <Tooltip />
                <Legend verticalAlign="top" height={36} align="right" />
                <Bar
                  dataKey="รายรับ"
                  fill="#82ca9d"
                  label={{ position: "top" }}
                />
                <Bar
                  dataKey="รายจ่าย"
                  fill="#CD5C5C"
                  label={{ position: "top" }}
                />
              </BarChart>
              
            </div>
            <div className="ml-14">
              <span>กราฟแสดงรายรับ-รายจ่ายทั้งหมด</span>
              <canvas ref={chartRef} width={250} height={250} />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default RicecropDetail;
