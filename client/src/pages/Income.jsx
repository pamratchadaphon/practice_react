import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateRicecrop = () => {
  const { idFarmer, idRicecrop } = useParams();
  //   const idAsInt = Number(idRicecrop);
  const [values, setValues] = useState({
    incomeDate: "",
    incomeDetails: "",
    amount: "",
    farmerID: idFarmer,
    RicecropID: idRicecrop,
  });
  const navigate = useNavigate(); // แก้จาก navigator เป็น navigate

  function handleSubmit(e) {
    // แก้จาก handleSummit เป็น handleSubmit
    e.preventDefault();
    axios
      .post("/api/income/addIncome", values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    alert("บันทึกรายรับเสร็จสิ้น");
    navigate(`/RicecropDetail/${idFarmer}/${idRicecrop}`); // แก้จาก navigator(`/ricecrop/${id}`) เป็น navigate(`/ricecrop/${id}`)
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
                บันทึกรายรับ
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit}>
                {" "}
                {/* แก้จาก handleSummit เป็น handleSubmit */}
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
                      onChange={(e) =>
                        setValues({ ...values, incomeDate: e.target.value })
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
                        setValues({ ...values, incomeDetails: e.target.value })
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

export default CreateRicecrop;
