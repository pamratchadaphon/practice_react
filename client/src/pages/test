import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { FaPencilAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import IncomeModal from "../components/IncomeModal";

const RicecropDetailMonth = (props) => {
  const { idFarmer, idRicecrop } = useParams();
  const idAsInt = Number(idFarmer);
  const [data, setData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [month, setMonth] = useState([]);
  const [monthInt, setMonthInt] = useState(0);
  const [incomeMonth, setIncomeMonth] = useState([]);
  const [expenseMonth, setExpenseMonth] = useState([]);
  const [deleteIncome, setDeleteIncome] = useState(true);
  const [deleteExpense, setDeleteExpense] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  useEffect(() => {}, [selectedIncome]);
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

          const startDate = new Date(ricecropResponse.data[0].startDate);
          const startMonth = startDate.getMonth() + 1;

          const endDate = new Date(ricecropResponse.data[0].endDate);
          const endMonth = endDate.getMonth() + 1;

          const monthString = [];
          for (let i = startMonth - 1; i < endMonth; i++) {
            switch (i) {
              case 0:
                monthString[i] = "มกราคม";
                break;
              case 1:
                monthString[i] = "กุมภาพันธ์";
                break;
              case 2:
                monthString[i] = "มีนาคม";
                break;
              case 3:
                monthString[i] = "เมษายน";
                break;
              case 4:
                monthString[i] = "พฤษภาคม";
                break;
              case 5:
                monthString[i] = "มิถุนายน";
                break;
              case 6:
                monthString[i] = "กรกฎาคม";
                break;
              case 7:
                monthString[i] = "สิงหาคม";
                break;
              case 8:
                monthString[i] = "กันยายน";
                break;
              case 9:
                monthString[i] = "ตุลาคม";
                break;
              case 10:
                monthString[i] = "พฤศจิกายน";
                break;
              case 11:
                monthString[i] = "ธันวาคม";
                break;
              default:
                break;
            }
          }
          setMonth(monthString);
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
  }, [idFarmer, idRicecrop]);

  useEffect(() => {
    if (selectedMonth === "มกราคม") {
      setMonthInt(1);
    } else if (selectedMonth === "กุมภาพันธ์") {
      setMonthInt(2);
    } else if (selectedMonth === "มีนาคม") {
      setMonthInt(3);
    } else if (selectedMonth === "เมษายน") {
      setMonthInt(4);
    } else if (selectedMonth === "พฤษภาคม") {
      setMonthInt(5);
    } else if (selectedMonth === "มิถุนายน") {
      setMonthInt(6);
    } else if (selectedMonth === "กรกฎาคม") {
      setMonthInt(7);
    } else if (selectedMonth === "สิงหาคม") {
      setMonthInt(8);
    } else if (selectedMonth === "กันยายน") {
      setMonthInt(9);
    } else if (selectedMonth === "ตุลาคม") {
      setMonthInt(10);
    } else if (selectedMonth === "พฤศจิกายน") {
      setMonthInt(11);
    } else if (selectedMonth === "ธันวาคม") {
      setMonthInt(12);
    } else {
      setMonthInt(0);
    }
  }, [selectedMonth]);

  useEffect(() => {
    const monthE = (data?.Expense || []).filter((expense) => {
      const expenseDate = new Date(expense.date);
      const month = expenseDate.getMonth() + 1;
      return month === monthInt;
    });

    setExpenseMonth(monthE);

    const totalExpense =
      monthE.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.amount);
      }, 0) || 0;
    setTotalExpense(totalExpense);

    const monthI = (data?.Income || []).filter((income) => {
      const incomeDate = new Date(income.incomeDate);
      const month = incomeDate.getMonth() + 1;
      return month === monthInt;
    });

    setIncomeMonth(monthI);

    const totalIncome =
      monthI.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.amount);
      }, 0) || 0;
    setTotalIncome(totalIncome);
  }, [monthInt, data]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() + 543;
    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  };

  function onClickDeleteIncome(idIncome) {
    alert(`ยืนยันการลบรายรับรายการที่ ${idIncome}`);
    axios
      .delete(`/api/income/deleteIncome/${idIncome}`)
      .then((res) => {
        setDeleteIncome(true);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  function onClickDeleteExpense(idExpense) {
    alert(`ยืนยันการลบรายรับรายการที่ ${idExpense}`);
    axios
      .delete(`/api/expense/deleteExpense/${idExpense}`)
      .then((res) => {
        setDeleteExpense(true);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (deleteIncome) {
      setDeleteIncome(false);
    }
    axios
      .get(`/api/ricecrop/getRicecropIncomeExpense/${idRicecrop}`)
      .then((res) => {})
      .catch((err) => console.log(err));
  }, [deleteIncome, idRicecrop]);

  return (
    <div className="flex">
      <div className="basis-[16%] h-[100vh]">
        <Sidebar idFarmer={idAsInt} />
      </div>
      <div className="basis-[84%] border">
        <div className="px-4 py-2 pt-16">
          <div className="flex pb-4 pt-[30px]">
            <div>เดือน</div>
            <div className="flex w-40 px-3">
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="block w-full mt-1 border-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 rounded-md shadow-sm"
              >
                <option value="">-- เลือกเดือน --</option>
                {month.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
              <div className="border p-4 bg-pink-400 flex flex-col h-full rounded-2xl">
                <span className="text-sm font-semibold">รายรับ (เดือน)</span>
                <span className="text-lg font-bold">
                  {totalIncome.toLocaleString()} บาท
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
              <div className="border p-4 rounded-2xl bg-violet-400 flex flex-col h-full">
                <span className="text-sm font-semibold">รายจ่าย (เดือน)</span>
                <span className="text-lg font-bold">
                  {totalExpense.toLocaleString()} บาท
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
              <div className="border p-4 rounded-2xl bg-orange-400 flex flex-col h-full">
                <span className="text-sm font-semibold">คงเหลือ</span>
                <span className="text-lg font-bold">
                  {(totalIncome - totalExpense).toLocaleString()} บาท
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <div style={{ width: "50%", paddingRight: "10px" }}>
              <span>รายรับ</span>
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
                    {incomeMonth.map((income) => (
                      <tr key={uuid()}>
                        <td>{formatDate(income.incomeDate)}</td>
                        <td>{income.incomeDetails}</td>
                        <td>{income.amount.toLocaleString()}</td>
                        <td>
                          <FaPencilAlt
                            style={{ color: "green" }}
                            onClick={() => {
                              setSelectedIncome(income);
                              handleOpen();
                            }}
                          />
                        </td>
                        <td>
                          <FiTrash2
                            style={{ color: "red" }}
                            onClick={() => onClickDeleteIncome(income.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ width: "50%", paddingLeft: "10px" }}>
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
                    {expenseMonth.map((expense) => (
                      <tr key={uuid()}>
                        <td>{formatDate(expense.date)}</td>
                        <td>{expense.detail}</td>
                        <td>{expense.amount.toLocaleString()}</td>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RicecropDetailMonth;
