import React, { useEffect, useState, useRef } from "react";
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
  Label,
} from "recharts";
import Chart from "chart.js/auto";

const RicecropDetail = () => {
  const { idFarmer, idRicecrop } = useParams();
  const [data, setData] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [mapi, setMapi] = useState(Array.from({ length: 12 }, () => 0));
  const [mape, setMape] = useState(Array.from({ length: 12 }, () => 0));
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(12);
  // const [income, setIncome] = useState([])
  // const [expense, setExpense] = useState([])
  const chartRef = useRef(null);

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
          const ricecropResponse = await axios.get(
            `/api/ricecrop/getRicecropIncomeExpense/${idRicecrop}`
          );
          setData(ricecropResponse.data[0]);
          // setIncome(ricecropResponse.data[0]?.Income);

          const startDate = new Date(ricecropResponse.data[0].startDate);
          const startMonth = startDate.getMonth() + 1;
          setStartMonth(startMonth);

          const endDate = new Date(ricecropResponse.data[0].endDate);
          const endMonth = endDate.getMonth() + 1;
          setEndMonth(endMonth);

          // คำนวณผลรวมของรายรับ
          const totalIncome =
            ricecropResponse.data[0]?.Income?.reduce(
              (accumulator, currentValue) => {
                return accumulator + parseInt(currentValue.amount);
              },
              0
            ) || 0;
          setTotalIncome(totalIncome);

          // คำนวณผลรวมของรายจ่าย
          const totalExpense =
            ricecropResponse.data[0]?.Expense?.reduce(
              (accumulator, currentValue) => {
                return accumulator + parseInt(currentValue.amount);
              },
              0
            ) || 0;
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

  useEffect(() => {
    const monthI =
      data?.Income?.map((income) => {
        const incomeDate = new Date(income.incomeDate);
        const month = incomeDate.getMonth() + 1;
        return `${month}`;
      }) || [];

    const monthE =
      data?.Expense?.map((expense) => {
        const expenseDate = new Date(expense.date);
        const month = expenseDate.getMonth() + 1;
        return `${month}`;
      }) || [];

    const income = data?.Income?.map((income) => income.amount) || [];
    const expense = data?.Expense?.map((expense) => expense.amount) || [];

    for (let i = 0; i < monthE.length; i++) {
      const monthIndex = parseInt(monthE[i]) - 1;

      setMape((prevState) => {
        const newState = [...prevState];
        console.log(newState);
        newState[monthIndex] += expense[i] / 2;
        return newState;
      });
    }

    for (let i = 0; i < monthI.length; i++) {
      const monthIndex = parseInt(monthI[i]) - 1;

      setMapi((prevState) => {
        const newState = [...prevState];
        newState[monthIndex] += income[i] / 2;
        return newState;
      });
    }
  }, [data]);

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
    <div className="flex bg-gray-100">
      <div className="basis-[16%] h-[100vh]">
        <Sidebar idFarmer={idFarmer} />
      </div>
      <div className="basis-[84%] border">
        <div className="px-[30px] py-[2px] pt-[30px] text-center font-bold text-lg">
          ปีที่ทำการปลูก {data.year}
        </div>
        <div className="px-[30px] py-[2px]">
          วันที่ปลูก {formatDate(data.startDate)}
        </div>
        <div className="px-[30px] py-[2px]">
          วันที่เก็บเกี่ยว {formatDate(data.endDate)}
        </div>
        <div className="px-[30px] py-[2px]">
          พันธ์ุข้าว {data.riceVarietie}
        </div>
        <div className="px-[30px] py-[2px]">
          <Link
            to={`/RicecropDetailMonth/${idFarmer}/${idRicecrop}`}
            className="btn btn-primary"
          >
            รายละเอียดเพิ่มเติม
          </Link>
        </div>

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
          </div>
          <div className="bg-white py-4 shadow-lg rounded-2xl flex">
            <div className="px-4">
              <span>กราฟแสดงรายรับ-รายจ่ายในแต่ละเดือน</span>
              <BarChart width={830} height={300} data={data1}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                  <Label value="เดือน" offset={-5} position="right" />
                </XAxis>
                <YAxis>
                  <Label
                    value="ราคา (บาท)"
                    offset={-30}
                    position="insideTop"
                  />
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
            <div className="pl-5">
              <span>กราฟแสดงรายรับ-รายจ่ายทั้งหมด</span>
              <canvas ref={chartRef} width={200} height={200} />
            </div>
          </div>
          {/* <div style={{ width: "50%", paddingLeft: "10px" }}>
              <span>รายจ่าย</span>
              <div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>วันที่</th>
                      <th>รายการ</th>
                      <th>ราคา</th>
                      <th>แก้ไข</th>
                      <th>ลบ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {income.map((income) => (
                      <tr key={income.id}>
                        <td>{formatDate(income.incomeDate)}</td>
                        <td>{income.incomeDetails}</td>
                        <td>{income.amount.toLocaleString()}</td>
                        <td>
                          <FaPencilAlt style={{ color: "green" }} />
                        </td>
                        <td>
                          <FiTrash2
                            style={{ color: "red" }}
                            onClick={() => onClickDeleteExpense(expense.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <IncomeModal
                  open={open}
                  handleClose={handleClose}
                  income={selectedIncome}
                  selectedMonth={monthInt}
                />
              </div>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default RicecropDetail;
