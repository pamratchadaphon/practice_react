import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateRicecrop = () => {
  const { idFarmer, idRicecrop } = useParams();
  const [values, setValues] = useState({
    incomeDate: new Date().toISOString().split('T')[0],
    incomeDetails: "",
    amount: "",
    farmerID: idFarmer,
    ricecropID: idRicecrop,
  });
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/income/addIncome", values)
      .then((res) => {
        const date = new Date(res.data.incomeDate);
        const month = date.getMonth() + 1;
        console.log(month); 
        // console.log(res.data.createdAt);
        // const createdAtDate = new Date(res.data.incomeDate);
        // const month = createdAtDate.getMonth() + 1;
        // const monthValue = month;
        // , { state: { monthValue ,amount: res.data.amount} }
        navigate(`/RicecropDetailMonth/${idFarmer}/${idRicecrop}`, { state: { month : {month}} });
      })
      .catch((err) => console.log(err));
    alert("บันทึกรายรับเสร็จสิ้น");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          window.location.href = '/';
          return;
        }
  
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        axios.post('http://localhost:8080/api/farmer/authen', null, config);
      } catch (error) {
        console.error("Error fetching ricecrop data:", error);
      }
    };
    fetchData();
  }, [idRicecrop]);

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
                บันทึกรายรับ
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
                      id="incomeDate"
                      name="incomeDate"
                      type="date"
                      required
                      value={values.incomeDate}
                      onChange={(e) =>
                        setValues((prevState) => ({ ...prevState, incomeDate: e.target.value }))
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
                    <input
                      id="incomeDetails"
                      name="incomeDetails"
                      type="text"
                      autoComplete="incomeDetails"
                      required
                      onChange={(e) =>
                        setValues((prevState) => ({ ...prevState, incomeDetails: e.target.value }))
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                        setValues((prevState) => ({ ...prevState, amount: e.target.value }))
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

export default CreateRicecrop;
