import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Expense = () => {
  const { idFarmer, idRicecrop } = useParams();
  const [values, setValues] = useState({
    amount: "",
    date: new Date().toISOString().split('T')[0], 
    detail: "",
    farmerID: idFarmer,
    ricecropID: idRicecrop,
  });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/expense/addExpense", values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    alert("บันทึกรายจ่ายเสร็จสิ้น");
    navigate(`/RicecropDetail/${idFarmer}/${idRicecrop}`);
  }
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
        axios.post("http://localhost:8080/api/farmer/authen", null, config);
      } catch (error) {
        console.error("Error fetching ricecrop data:", error);
      }
    };
    fetchData();
  });
  
  return (
    <div className="flex">
      <div className="basis-[16%] h-[100vh]">
        <Sidebar idFarmer={idFarmer} />
      </div>
      <div className="basis-[84%] border">
        <div className="px-[30px] py-[30px]">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                บันทึกรายจ่าย
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit}>
                {" "}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    วันที่
                  </label>
                  <div className="mt-2">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      value={values.date}
                      onChange={(e) =>
                        setValues({ ...values, date: e.target.value })
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      รายการ
                    </label>
                  </div>
                  <div className="mt-2">
                  <select
                      id="detail"
                      name="detail"
                      required
                      value={values.detail}
                      onChange={(e) =>
                        setValues({ ...values, detail: e.target.value })
                      }
                      className="block w-full mt-1 border-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 rounded-md shadow-sm"
                    >
                      <option value="">-- เลือกรายการ --</option>
                      {[
                        "ไถนา",
                        "เมล็ดพันธ์ุข้าว",
                        "ปั่นนา",
                        "จ้างคนย่ำนา",
                        "รถดำนา",
                        "ค่าจ้างคนหว่านเมล็ดพันธุ์ข้าว",
                        "ปุ๋ยเคมี",
                        "ค่าจ้างคนหว่านปุ๋ยเคมี",
                        "รถดำนา",
                        "ยาคุมหญ้า",
                        "ยาป้องกันแมลง",
                        "ยาฆ่าแมลง",
                        "น้ำมันเชื้อเพลิง",
                        "เช่านา",
                        "รถเข็นข้าว",
                        "รถเกี่ยว"
                      ].map((list, index) => (
                        <option key={index} value={list}>
                          {list}
                        </option>
                      ))}
                    </select>

                    {/* <input
                      id="detail"
                      name="detail"
                      type="text"
                      autoComplete="datail"
                      required
                      onChange={(e) =>
                        setValues({ ...values, datail: e.target.value })
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /> */}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      ราคา 
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      autoComplete="amount"
                      required
                      onChange={(e) =>
                        setValues({ ...values, amount: e.target.value })
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    เพิ่ม
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
