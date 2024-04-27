import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { FaPencilAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import IncomeModal from "../components/IncomeModal";
import ExpenseModal from "../components/ExpenseModal";

const RicecropDetailMonth = () => {
  const { idFarmer, idRicecrop } = useParams();
  const idAsInt = Number(idFarmer);

  const [data, setData] = useState({})

  const [selectedMonth, setSelectedMonth] = useState(""); //เลือกเดือน
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const [month, setMonth] = useState([]); // เดือนใน dropdown
  const [monthInt, setMonthInt] = useState(0); //เดือนที่เลือกแปลงเป็นตัวเลข
  const [incomeMonth, setIncomeMonth] = useState([]); //รายรับทั้งหมดของเดือนที่เลือก
  const [expenseMonth, setExpenseMonth] = useState([]);

  const [openIncome, setOpenIncome] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);

  const [selectedIncome, setSelectedIncome] = useState({});
  const [selectedExpense, setSelectedExpense] = useState({});



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

          // const currentDate = new Date();
          // const currentMonthIndex = currentDate.getMonth();
          // const m = month[currentMonthIndex];
          // setSelectedMonth(m);
          // console.log(month[currentMonthIndex]);
          setData(ricecropResponse.data[0])

          const income = ricecropResponse.data[0].Income
          setIncomeMonth(income)
          const expense = ricecropResponse.data[0].Expense
          setExpenseMonth(expense)
          // const data = ricecropResponse.data[0];
          // const monthE = (data?.Expense || []).filter((expense) => {
          //   const expenseDate = new Date(expense.date);
          //   const month = expenseDate.getMonth() + 1;
          //   return month === monthInt;
          // });

          // setExpenseMonth(monthE);

          // const totalExpense =
          //   monthE.reduce((accumulator, currentValue) => {
          //     return accumulator + parseInt(currentValue.amount);
          //   }, 0) || 0;
          // setTotalExpense(totalExpense);

          // const monthI = (data?.Income || []).filter((income) => {
          //   const incomeDate = new Date(income.incomeDate);
          //   const month = incomeDate.getMonth() + 1;
          //   return month === monthInt;
          // });

          // setIncomeMonth(monthI);

          // const totalIncome =
          //   monthI.reduce((accumulator, currentValue) => {
          //     return accumulator + parseInt(currentValue.amount);
          //   }, 0) || 0;
          // setTotalIncome(totalIncome);

          const startDate = new Date(ricecropResponse.data[0].startDate);
          const startMonth = startDate.getMonth() + 1;

          const endDate = new Date(ricecropResponse.data[0].endDate);
          const endMonth = endDate.getMonth() + 1;

          const monthString = [];
          const month12 = [
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
            "พฤษจิกายน",
            "ธันวาคม",
          ];
          for (let i = startMonth - 1; i < endMonth; i++) {
            for (let j = 0; j < month12.length; j++) {
              if (i + 1 === j + 1) {
                monthString[i] = month12[j];
              }
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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleOpenIncome = () => setOpenIncome(true);
  const handleOpenExpense = () => setOpenExpense(true);

  const handleCloseIncome = () => setOpenIncome(false);
  const handleCloseExpense = () => setOpenExpense(false);

  useEffect(() => {}, [selectedIncome]);
  useEffect(() => {}, [selectedExpense]);

  useEffect(() => {
    const month12 = [
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
      "พฤษจิกายน",
      "ธันวาคม",
    ];
    for (let i = 0; i < month12.length; i++) {
      if (selectedMonth === month12[i]) {
        setMonthInt(i + 1);
      }
    }
  }, [selectedMonth, monthInt]);

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

  async function handleDataFromChildIncome(dataForm) {
    try {
      const ricecropResponse = await axios.get(
        `/api/ricecrop/getRicecropIncomeExpense/${idRicecrop}`
      );
      const data = ricecropResponse.data[0];
      const date = new Date(dataForm.incomeDate);
      const monthForm = date.getMonth() + 1;

      const monthI = (data.Income || []).filter((income) => {
        const incomeDate = new Date(income.incomeDate);
        const month = incomeDate.getMonth() + 1;
        return month === monthForm;
      });
      setIncomeMonth(monthI);

      const totalIncome =
        monthI.reduce((accumulator, currentValue) => {
          return accumulator + parseInt(currentValue.amount);
        }, 0) || 0;
      setTotalIncome(totalIncome);
    } catch (error) {
      console.error("Error fetching ricecrop data:", error);
    }
  }

  async function handleDataFromChildExpense(dataForm) {
    try {
      const ricecropResponse = await axios.get(
        `/api/ricecrop/getRicecropIncomeExpense/${idRicecrop}`
      );
      const data = ricecropResponse.data[0];
      const date = new Date(dataForm.date);
      const monthForm = date.getMonth() + 1;

      const monthE = (data.Expense || []).filter((expense) => {
        const date = new Date(expense.date);
        const month = date.getMonth() + 1;
        return month === monthForm;
      });
      setExpenseMonth(monthE);

      const totalExpense =
        monthE.reduce((accumulator, currentValue) => {
          return accumulator + parseInt(currentValue.amount);
        }, 0) || 0;
      setTotalExpense(totalExpense);
    } catch (error) {
      console.error("Error fetching ricecrop data:", error);
    }
  }

  async function onClickDeleteIncome(idIncome, incomeDate) {
    axios
      .delete(`/api/income/deleteIncome/${idIncome}`)
      .then((res) => {
        const date = new Date(incomeDate);
        const month = date.getMonth() + 1;
        showDataDeleteIncome(month);
      })
      .catch((err) => console.log(err));
  }
  async function showDataDeleteIncome(monthInt) {
    try {
      const ricecropResponse = await axios.get(
        `/api/ricecrop/getRicecropIncomeExpense/${idRicecrop}`
      );
      const data = ricecropResponse.data[0];

      const monthI = (data.Income || []).filter((income) => {
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
    } catch (error) {
      console.error("Error fetching ricecrop data:", error);
    }
  }

  async function onClickDeleteExpense(idExpense, expenseDate) {
    axios
      .delete(`/api/expense/deleteExpense/${idExpense}`)
      .then((res) => {
        const date = new Date(expenseDate);
        const month = date.getMonth() + 1;
        showDataDeleteExpense(month);
      })
      .catch((err) => console.log(err));
  }
  async function showDataDeleteExpense(monthInt) {
    try {
      const ricecropResponse = await axios.get(
        `/api/ricecrop/getRicecropIncomeExpense/${idRicecrop}`
      );
      const data = ricecropResponse.data[0];

      const monthE = (data.Expense || []).filter((expense) => {
        const date = new Date(expense.date);
        const month = date.getMonth() + 1;
        return month === monthInt;
      });
      setExpenseMonth(monthE);

      const totalExpense =
        monthE.reduce((accumulator, currentValue) => {
          return accumulator + parseInt(currentValue.amount);
        }, 0) || 0;
      setTotalExpense(totalExpense);
    } catch (error) {
      console.error("Error fetching ricecrop data:", error);
    }
  }

  function tableIncome() {
    return (
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
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => {
                    setSelectedIncome(income);
                    handleOpenIncome();
                  }}
                />
              </td>
              <td>
                <FiTrash2
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() =>
                    onClickDeleteIncome(income.id, income.incomeDate)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function tableExpense() {
    return (
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
                <FaPencilAlt
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => {
                    setSelectedExpense(expense);
                    handleOpenExpense();
                  }}
                />
              </td>
              <td>
                <FiTrash2
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => onClickDeleteExpense(expense.id, expense.date)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
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
                <option value="">เลือกเดือน</option>
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
              <div>{tableIncome()}</div>
              <IncomeModal
                open={openIncome}
                handleClose={handleCloseIncome}
                income={selectedIncome}
                sendDataToParentIncome={handleDataFromChildIncome}
              />
            </div>

            <div style={{ width: "50%", paddingLeft: "10px" }}>
              <span>รายจ่าย</span>
              <div>{tableExpense()}</div>
              <ExpenseModal
                open={openExpense}
                handleClose={handleCloseExpense}
                expense={selectedExpense}
                sendDataToParentExpense={handleDataFromChildExpense}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RicecropDetailMonth;
